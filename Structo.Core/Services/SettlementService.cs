using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Settlements;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Exceptions;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class SettlementService(DbContext context) : ISettlementService
{
    public async Task<(bool Success, string Message, Guid SettlementId)> CreateSettlementAsync(Guid projectId, SettlementCreateDto dto, Guid tenantId)
    {
        var pettyCash = await context.Set<PettyCash>()
            .FirstOrDefaultAsync(p => p.Id == dto.PettyCashId && p.ProjectId == projectId);

        if (pettyCash == null)
            return (false, "Petty cash record not found.", Guid.Empty);

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return (false, "This petty cash has already been settled.", Guid.Empty);

        if (pettyCash.Status != "Issued")
            return (false, "Only issued petty cash requests can be settled.", Guid.Empty);

        var totalAmount = dto.Lines.Sum(l => l.Amount);

        var settlement = new Settlement
        {
            ProjectId = projectId,
            TenantId = tenantId,
            PettyCashId = dto.PettyCashId,
            TotalAmount = totalAmount,
            Status = SettlementStatus.Pending,
            SubmittedAt = DateTime.UtcNow,
            NetDifference = pettyCash.Amount - totalAmount
        };

        foreach (var lineDto in dto.Lines)
        {
            settlement.Lines.Add(new SettlementLine
            {
                Category = lineDto.Category,
                Amount = lineDto.Amount,
                Description = lineDto.Description,
                InvoiceUrl = lineDto.InvoiceUrl ?? string.Empty
            });
        }

        context.Set<Settlement>().Add(settlement);
        await context.SaveChangesAsync();

        return (true, "Settlement request submitted successfully.", settlement.Id);
    }

    public async Task<(bool Success, string Message)> ApproveSettlementAsync(Guid projectId, Guid id, string userRole, Guid resolvedByUserId)
    {
        if (userRole != "TenantOwner" && userRole != "SuperAdmin" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner, SuperAdmin, and Accountants are allowed to approve settlements.");
        }

        var settlement = await context.Set<Settlement>()
            .Include(s => s.Lines)
            .Include(s => s.PettyCash)
            .FirstOrDefaultAsync(s => s.Id == id && s.ProjectId == projectId);

        if (settlement == null)
            return (false, "Settlement not found.");

        if (settlement.Status != SettlementStatus.Pending)
            return (false, "Only pending settlements can be approved.");

        settlement.ResolvedAt = DateTime.UtcNow;
        settlement.ResolvedByUserId = resolvedByUserId;

        var pettyCash = settlement.PettyCash;
        if (pettyCash == null)
            return (false, "Associated petty cash record is missing.");

        // positive = unused custody due back, negative = employee spent extra
        var netDifference = pettyCash.Amount - settlement.TotalAmount;
        settlement.NetDifference = netDifference;

        if (netDifference > 0)
        {
            // Case 2: TREASURY REFUND LOOP -> total lines < custody amount.
            // Do NOT auto-credit immediately. Wait for confirm-refund.
            settlement.Status = SettlementStatus.ApprovedPendingRefund;
            pettyCash.Status = "SettlePending"; // Settle pending refund confirmation
        }
        else
        {
            // Case 1: total lines >= custody amount
            settlement.Status = SettlementStatus.Approved;
            pettyCash.IsSettled = true;
            pettyCash.Status = "Settled";
            pettyCash.SpentAmount = pettyCash.Amount;
            pettyCash.ReturnAmount = 0;

            // Register line expenses in system ledger
            var expense = new FinancialTransaction
            {
                ProjectId = projectId,
                TenantId = settlement.TenantId,
                Type = TransactionType.Expense,
                Amount = pettyCash.Amount,
                Description = $"Petty Cash Settlement - {pettyCash.Reason}",
                PaymentMethod = pettyCash.SettlementPaymentMethod ?? PaymentMethod.Cash,
                TransactionDate = DateTime.UtcNow,
                PaymentDate = DateTime.UtcNow,
                IsSystemGenerated = true,
                SettlementId = settlement.Id
            };
            context.Set<FinancialTransaction>().Add(expense);

            if (netDifference < 0)
            {
                // Engineer spent more. Register difference as an operational liability (DueToEmployee)
                var liabilityAmount = Math.Abs(netDifference);
                
                var reimbursementLiability = new FinancialTransaction
                {
                    ProjectId = projectId,
                    TenantId = settlement.TenantId,
                    Type = TransactionType.Reimbursement,
                    Amount = liabilityAmount,
                    Description = $"Overrun Reimbursement Liability due to Employee - Settlement {settlement.Id}",
                    PaymentMethod = PaymentMethod.Cash,
                    TransactionDate = DateTime.UtcNow,
                    PaymentDate = DateTime.UtcNow,
                    IsSystemGenerated = true,
                    SettlementId = settlement.Id
                };
                context.Set<FinancialTransaction>().Add(reimbursementLiability);
            }
        }

        await context.SaveChangesAsync();
        return (true, settlement.Status == SettlementStatus.ApprovedPendingRefund 
            ? "Settlement approved. Status set to ApprovedPendingRefund. Awaiting accountant refund confirmation."
            : "Settlement approved and settled successfully.");
    }

    public async Task<(bool Success, string Message)> ConfirmRefundAsync(Guid projectId, Guid id, string userRole)
    {
        if (userRole != "TenantOwner" && userRole != "SuperAdmin" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner, SuperAdmin, and Accountants are allowed to confirm refunds.");
        }

        var settlement = await context.Set<Settlement>()
            .Include(s => s.PettyCash)
            .FirstOrDefaultAsync(s => s.Id == id && s.ProjectId == projectId);

        if (settlement == null)
            return (false, "Settlement record not found.");

        if (settlement.Status != SettlementStatus.ApprovedPendingRefund)
            return (false, "Settlement is not in ApprovedPendingRefund state.");

        var pettyCash = settlement.PettyCash;
        if (pettyCash == null)
            return (false, "Associated petty cash record is missing.");

        if (pettyCash.SourcePoolId.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.Id == pettyCash.SourcePoolId.Value && p.ProjectId == projectId);

            if (pool != null)
            {
                // Restore treasury balance
                pool.AvailableBalance += settlement.NetDifference;
            }
        }

        settlement.Status = SettlementStatus.Refunded;
        
        pettyCash.IsSettled = true;
        pettyCash.Status = "Settled";
        pettyCash.SpentAmount = settlement.TotalAmount;
        pettyCash.ReturnAmount = settlement.NetDifference;

        // Register the actual spent amount as project expense
        var expense = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = settlement.TenantId,
            Type = TransactionType.Expense,
            Amount = settlement.TotalAmount,
            Description = $"Petty Cash Settlement - Spent Amount: {pettyCash.Reason}",
            PaymentMethod = pettyCash.SettlementPaymentMethod ?? PaymentMethod.Cash,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = DateTime.UtcNow,
            IsSystemGenerated = true,
            SettlementId = settlement.Id
        };
        context.Set<FinancialTransaction>().Add(expense);

        // Register the refunded amount back to the treasury pool
        var refundTx = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = settlement.TenantId,
            Type = TransactionType.Refund,
            Amount = settlement.NetDifference,
            Description = $"Petty Cash Settlement Refund - Unused cash returned to pool: {pettyCash.Reason}",
            PaymentMethod = PaymentMethod.Cash,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = DateTime.UtcNow,
            IsSystemGenerated = true,
            SettlementId = settlement.Id
        };
        context.Set<FinancialTransaction>().Add(refundTx);

        await context.SaveChangesAsync();
        return (true, "Refund confirmed. Cash pool balance restored and settlement fully closed.");
    }

    public async Task<(bool Success, string Message)> RejectSettlementAsync(Guid projectId, Guid id, SettlementRejectDto dto, string userRole, Guid resolvedByUserId)
    {
        if (userRole != "TenantOwner" && userRole != "SuperAdmin" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner, SuperAdmin, and Accountants are allowed to reject settlements.");
        }

        var settlement = await context.Set<Settlement>()
            .Include(s => s.PettyCash)
            .FirstOrDefaultAsync(s => s.Id == id && s.ProjectId == projectId);

        if (settlement == null)
            return (false, "Settlement not found.");

        if (settlement.Status != SettlementStatus.Pending)
            return (false, "Only pending settlements can be rejected.");

        settlement.Status = SettlementStatus.Rejected;
        settlement.ResolvedAt = DateTime.UtcNow;
        settlement.ResolvedByUserId = resolvedByUserId;
        settlement.Comments = dto.Comments;

        if (settlement.PettyCash != null)
        {
            settlement.PettyCash.Status = "Issued"; // Return back to Issued so engineer can edit and submit again
        }

        await context.SaveChangesAsync();
        return (true, "Settlement request rejected.");
    }

    public async Task<IEnumerable<SettlementMobileDto>> GetSettlementsAsync(Guid projectId)
    {
        var items = await context.Set<Settlement>()
            .Include(s => s.Lines)
            .Include(s => s.PettyCash)
            .ThenInclude(pc => pc!.IssuedToUser)
            .Include(s => s.ResolvedByUser)
            .Include(s => s.Project)
            .Where(s => s.ProjectId == projectId)
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync();

        return items.Select(s => new SettlementMobileDto
        {
            Id = s.Id,
            ProjectId = s.ProjectId,
            ProjectName = s.Project?.Name ?? string.Empty,
            PettyCashId = s.PettyCashId,
            CustodyAmount = s.PettyCash?.Amount ?? 0,
            CustodyReason = s.PettyCash?.Reason ?? string.Empty,
            IssuedTo = s.PettyCash?.IssuedToUser != null 
                ? $"{s.PettyCash.IssuedToUser.FirstName} {s.PettyCash.IssuedToUser.LastName}" 
                : string.Empty,
            TotalAmount = s.TotalAmount,
            Status = s.Status.ToString(),
            SubmittedAt = s.SubmittedAt,
            ResolvedAt = s.ResolvedAt,
            ResolvedBy = s.ResolvedByUser != null 
                ? $"{s.ResolvedByUser.FirstName} {s.ResolvedByUser.LastName}" 
                : string.Empty,
            NetDifference = s.NetDifference,
            Comments = s.Comments,
            Lines = s.Lines.Select(l => new SettlementLineMobileDto
            {
                Id = l.Id,
                Category = l.Category,
                Amount = l.Amount,
                Description = l.Description,
                InvoiceUrl = l.InvoiceUrl
            }).ToList()
        });
    }
}
