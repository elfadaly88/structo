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
    public async Task<(bool Success, string Message, Guid SettlementId)> CreateSettlementAsync(Guid projectId, SettlementCreateDto dto, Guid tenantId, string userRole, Guid userId)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var pettyCash = await context.Set<PettyCash>()
            .FirstOrDefaultAsync(p => p.Id == dto.PettyCashId && p.ProjectId == projectId);

        if (pettyCash == null)
            return (false, "Petty cash record not found.", Guid.Empty);

        if (userRole == "SiteEngineer" || userRole == "DesignEngineer" || userRole == "Manager")
        {
            if (pettyCash.IssuedToUserId != userId)
            {
                return (false, "ACCESS_DENIED: You are not authorized to settle custody issued to another user.", Guid.Empty);
            }
        }

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return (false, "This petty cash has already been settled.", Guid.Empty);

        if (pettyCash.Status != "Issued")
            return (false, "Only issued petty cash requests can be settled.", Guid.Empty);

        var totalAmount = dto.Lines.Sum(l => l.Amount);

        var settlement = await context.Set<Settlement>()
            .Include(s => s.Lines)
            .FirstOrDefaultAsync(s => s.PettyCashId == dto.PettyCashId && s.Status == SettlementStatus.Draft);

        if (settlement != null)
        {
            context.Set<Settlement>().Remove(settlement);
            // Save immediately to ensure deletion propagates and releases constraints before adding new one
            await context.SaveChangesAsync();
        }

        var newSettlement = new Settlement
        {
            ProjectId = projectId,
            TenantId = tenantId,
            PettyCashId = dto.PettyCashId,
            SubmittedAt = DateTime.UtcNow,
            TotalAmount = totalAmount,
            Status = dto.IsDraft ? SettlementStatus.Draft : SettlementStatus.Pending,
            NetDifference = pettyCash.Amount - totalAmount
        };

        foreach (var lineDto in dto.Lines)
        {
            newSettlement.Lines.Add(new SettlementLine
            {
                Category = Structo.Core.Helpers.HtmlSanitizer.Sanitize(lineDto.Category) ?? string.Empty,
                Amount = lineDto.Amount,
                Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize(lineDto.Description) ?? string.Empty,
                InvoiceUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(lineDto.InvoiceUrl) ?? string.Empty,
                IsBillableToClient = lineDto.IsBillableToClient
            });
        }

        context.Set<Settlement>().Add(newSettlement);
        await context.SaveChangesAsync();

        var statusMessage = dto.IsDraft ? "Settlement draft saved successfully." : "Settlement request submitted for review.";
        return (true, statusMessage, newSettlement.Id);
    }

    public async Task<(bool Success, string Message)> ApproveSettlementAsync(Guid projectId, Guid id, string userRole, Guid resolvedByUserId)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        if (userRole != "TenantOwner" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner and Accountants are allowed to approve settlements.");
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

        var netDifference = pettyCash.Amount - settlement.TotalAmount;
        settlement.NetDifference = netDifference;

        if (netDifference > 0)
        {
            // Spent less than custody: transitions to ApprovedPendingRefund so accountant can confirm receipt of returned cash
            settlement.Status = SettlementStatus.ApprovedPendingRefund;
            pettyCash.Status = "ApprovedPendingRefund";
            pettyCash.IsSettled = false;
        }
        else
        {
            // Spent equal to or greater than custody: mark custody as settled, register expense, and generate a new pending reimbursement request for the difference if spent more
            settlement.Status = SettlementStatus.Approved;
            pettyCash.IsSettled = true;
            pettyCash.Status = "Settled";
            pettyCash.SpentAmount = settlement.TotalAmount; // The actual spent amount
            pettyCash.ReturnAmount = 0;

            if (netDifference < 0)
            {
                // Generate a new pending reimbursement request for the difference which requires accountant/manager approval
                var liabilityAmount = Math.Abs(netDifference);
                var reimbursementRequest = new PettyCash
                {
                    ProjectId = projectId,
                    TenantId = settlement.TenantId,
                    IssuedToUserId = pettyCash.IssuedToUserId,
                    Amount = liabilityAmount,
                    Reason = $"تعويض مصاريف زائدة عن تسوية عهدة بيان: {pettyCash.Reason} (Reimbursement for Overspend)",
                    Status = "Pending",
                    Category = "Other",
                    IssuedAt = DateTime.UtcNow,
                    IsSettled = false,
                    IsReimbursement = true
                };
                context.Set<PettyCash>().Add(reimbursementRequest);
            }
        }

        // Remove any previous un-audited or single expense transactions for this settlement to avoid duplicates
        var existingTxs = await context.Set<FinancialTransaction>()
            .Where(t => t.SettlementId == settlement.Id)
            .ToListAsync();
        if (existingTxs.Any())
        {
            context.Set<FinancialTransaction>().RemoveRange(existingTxs);
        }

        // Automatically create corresponding Expense entries in FinancialTransactions for each item/invoice in the settlement
        if (settlement.Lines != null && settlement.Lines.Any())
        {
            foreach (var line in settlement.Lines)
            {
                var baseDescription = string.IsNullOrWhiteSpace(line.Description)
                    ? $"Petty Cash Settlement Item ({line.Category}) - {pettyCash.Reason}"
                    : line.Description;

                // Tag non-billable items so they are separated from billable client progress claims
                var finalDescription = line.IsBillableToClient
                    ? baseDescription
                    : $"{baseDescription} [مصاريف تحملها المكتب / خسارة غير محملة على العميل]";

                var expense = new FinancialTransaction
                {
                    Id = Guid.NewGuid(),
                    ProjectId = projectId,
                    TenantId = settlement.TenantId,
                    Type = TransactionType.Expense,
                    Amount = line.Amount,
                    Description = finalDescription,
                    PaymentMethod = pettyCash.SettlementPaymentMethod ?? PaymentMethod.Cash,
                    ReceiptPhotoUrl = line.InvoiceUrl,
                    TransactionDate = settlement.SubmittedAt != default ? settlement.SubmittedAt : DateTime.UtcNow,
                    PaymentDate = DateTime.UtcNow,
                    IsSystemGenerated = true,
                    IsAudited = true,
                    SettlementId = settlement.Id
                };
                context.Set<FinancialTransaction>().Add(expense);
            }
        }
        else
        {
            var expense = new FinancialTransaction
            {
                Id = Guid.NewGuid(),
                ProjectId = projectId,
                TenantId = settlement.TenantId,
                Type = TransactionType.Expense,
                Amount = settlement.TotalAmount,
                Description = $"Petty Cash Settlement - Spent Amount: {pettyCash.Reason}",
                PaymentMethod = pettyCash.SettlementPaymentMethod ?? PaymentMethod.Cash,
                TransactionDate = settlement.SubmittedAt != default ? settlement.SubmittedAt : DateTime.UtcNow,
                PaymentDate = DateTime.UtcNow,
                IsSystemGenerated = true,
                IsAudited = true,
                SettlementId = settlement.Id
            };
            context.Set<FinancialTransaction>().Add(expense);
        }

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return (false, "CONCURRENCY_ERROR: تمت معالجة أو تعديل هذه التسوية بواسطة مستخدم آخر في نفس الوقت.");
        }

        return (true, settlement.Status == SettlementStatus.ApprovedPendingRefund 
            ? "Settlement approved. Status set to ApprovedPendingRefund. Awaiting accountant refund confirmation."
            : "Settlement approved successfully.");
    }

    public async Task<(bool Success, string Message)> ConfirmRefundAsync(Guid projectId, Guid id, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        if (userRole != "TenantOwner" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner and Accountants are allowed to confirm refunds.");
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

        var returnedCash = pettyCash.Amount - settlement.TotalAmount;

        var project = await context.Set<Project>().FindAsync(projectId);
        if (project != null)
        {
            project.Budget += returnedCash;
        }

        if (pettyCash.SourcePoolId.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.Id == pettyCash.SourcePoolId.Value && p.ProjectId == projectId);

            if (pool != null)
            {
                // Restore treasury balance
                pool.AvailableBalance += returnedCash;
            }
        }

        settlement.Status = SettlementStatus.Refunded;
        
        pettyCash.IsSettled = true;
        pettyCash.Status = "Settled";
        pettyCash.SpentAmount = settlement.TotalAmount;
        pettyCash.ReturnAmount = returnedCash;

        // NOTE: The Expense transaction for settlement.TotalAmount was already registered
        // in ApproveSettlementAsync (when status transitioned to ApprovedPendingRefund).
        // We must NOT register it again here to avoid double-counting expenses.

        // Register the refunded amount back to the treasury pool
        var refundTx = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = settlement.TenantId,
            Type = TransactionType.RefundToTreasury,
            Amount = returnedCash,
            Description = $"Petty Cash Settlement Refund - Unused cash returned to project budget: {pettyCash.Reason}",
            PaymentMethod = PaymentMethod.Cash,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = DateTime.UtcNow,
            IsSystemGenerated = true,
            SettlementId = settlement.Id
        };
        context.Set<FinancialTransaction>().Add(refundTx);

        await context.SaveChangesAsync();
        return (true, "Refund confirmed. Cash pool balance and project budget restored, settlement fully closed.");
    }

    public async Task<(bool Success, string Message)> RejectSettlementAsync(Guid projectId, Guid id, SettlementRejectDto dto, string userRole, Guid resolvedByUserId)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        if (userRole != "TenantOwner" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner and Accountants are allowed to reject settlements.");
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
        settlement.Comments = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Comments);

        if (settlement.PettyCash != null)
        {
            settlement.PettyCash.Status = "Issued"; // Return back to Issued so engineer can edit and submit again
        }

        await context.SaveChangesAsync();
        return (true, "Settlement request rejected.");
    }

    public async Task<IEnumerable<SettlementMobileDto>> GetSettlementsAsync(Guid projectId, Guid userId, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var query = context.Set<Settlement>()
            .AsNoTracking()
            .Include(s => s.Lines)
            .Include(s => s.PettyCash)
            .ThenInclude(pc => pc!.IssuedToUser)
            .Include(s => s.ResolvedByUser)
            .Include(s => s.Project)
            .Where(s => s.ProjectId == projectId);

        if (userRole == "SiteEngineer" || userRole == "DesignEngineer" || userRole == "Manager")
        {
            query = query.Where(s => s.PettyCash != null && s.PettyCash.IssuedToUserId == userId);
        }

        var items = await query
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
                Category = l.Category ?? string.Empty,
                Amount = l.Amount,
                Description = l.Description ?? string.Empty,
                InvoiceUrl = l.InvoiceUrl ?? string.Empty,
                IsBillableToClient = l.IsBillableToClient
            }).ToList()
        });
    }
}
