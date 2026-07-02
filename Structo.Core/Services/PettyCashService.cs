using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Exceptions;
using Structo.Core.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

public class PettyCashService(DbContext context, ICloudStorageService storageService, INotificationEngine notificationEngine) : IPettyCashService
{
    public async Task<(bool Success, string Message)> CreatePettyCashAsync(Guid projectId, PettyCashCreateDto dto, Guid? tenantId, string userRole)
    {
        if (tenantId == null)
            return (false, "Tenant ID claim missing or invalid.");

        var pettyCash = new PettyCash
        {
            ProjectId = projectId,
            TenantId = tenantId.Value,
            IssuedToUserId = dto.IssuedToUserId,
            Amount = dto.Amount,
            Reason = dto.Reason,
            Category = dto.Category ?? string.Empty,
            Status = "Pending",
            IssuedAt = DateTime.UtcNow,
            IsSettled = false,
            SourcePoolId = dto.SourcePoolId
        };

        if (userRole == "TenantOwner" && dto.SourcePoolId.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>().FirstOrDefaultAsync(p => p.Id == dto.SourcePoolId.Value && p.ProjectId == projectId);
            if (pool == null)
                return (false, "Selected cash pool not found.");

            if (pettyCash.Amount > pool.AvailableBalance)
                return (false, $"Insufficient funds in selected pool. Available is {pool.AvailableBalance} EGP.");

            pettyCash.Status = "Issued";
            pool.AvailableBalance -= pettyCash.Amount;
        }

        context.Set<PettyCash>().Add(pettyCash);
        await context.SaveChangesAsync();

        // Trigger Notification Engine (WORKFLOW A)
        await notificationEngine.RaiseFinancialRequestNotificationAsync(
            pettyCash.IssuedToUserId,
            pettyCash.Amount,
            pettyCash.Id,
            pettyCash.TenantId);

        return (true, "Petty cash request submitted successfully");
    }

    public async Task<(bool Success, string Message)> ApprovePettyCashAsync(Guid projectId, Guid id, PettyCashApproveDto dto)
    {
        var pettyCash = await context.Set<PettyCash>().FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
        if (pettyCash == null)
            return (false, "Petty cash record not found.");

        if (pettyCash.Status != "Pending")
            return (false, "Only pending petty cash requests can be approved.");

        var pool = await context.Set<ProjectCashPool>().FirstOrDefaultAsync(p => p.Id == dto.SourcePoolId && p.ProjectId == projectId);
        if (pool == null)
            return (false, "Selected cash pool not found.");

        if (pettyCash.Amount > pool.AvailableBalance)
            return (false, $"Insufficient funds. Available pool is {pool.AvailableBalance} EGP.");

        pettyCash.Status = "Issued";
        pettyCash.SourcePoolId = pool.Id;
        pool.AvailableBalance -= pettyCash.Amount;
        await context.SaveChangesAsync();

        return (true, "Petty cash approved and issued successfully.");
    }

    public async Task<(bool Success, string Message)> RejectPettyCashAsync(Guid projectId, Guid id, PettyCashRejectDto dto)
    {
        var pettyCash = await context.Set<PettyCash>().FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
        if (pettyCash == null)
            return (false, "Petty cash record not found.");

        if (pettyCash.Status != "Pending")
            return (false, "Only pending petty cash requests can be rejected.");

        pettyCash.Status = "Rejected";
        pettyCash.Comments = dto.Comments ?? string.Empty;
        await context.SaveChangesAsync();

        return (true, "Petty cash request rejected.");
    }

    public async Task<bool> SettlePettyCashAsync(Guid projectId, Guid pettyCashId, PettyCashSettleDto dto)
    {
        var pettyCash = await context.Set<PettyCash>()
            .FirstOrDefaultAsync(p => p.Id == pettyCashId && p.ProjectId == projectId);

        if (pettyCash == null)
            throw new BusinessRuleException("Petty cash record not found.");

        if (pettyCash.IsSettled)
            throw new BusinessRuleException("This petty cash has already been settled.");

        if (dto.SpentAmount > pettyCash.Amount)
            throw new BusinessRuleException("Spent amount cannot exceed the issued petty cash amount.");

        pettyCash.IsSettled = true;
        pettyCash.Status = "Settled";
        pettyCash.SpentAmount = dto.SpentAmount;
        pettyCash.ReturnAmount = pettyCash.Amount - dto.SpentAmount;
        pettyCash.ReceiptPhotoUrl = dto.ReceiptPhotoUrl ?? string.Empty;
        pettyCash.SettlementPaymentMethod = dto.SettlementPaymentMethod;
        pettyCash.ExpenseDate = dto.ExpenseDate;

        if (dto.SpentAmount > 0)
        {
            var expense = new FinancialTransaction
            {
                ProjectId = projectId,
                TenantId = pettyCash.TenantId,
                Type = TransactionType.Expense,
                Amount = dto.SpentAmount,
                Description = $"Petty Cash Settlement - {dto.ReceiptDescription}",
                PaymentMethod = dto.SettlementPaymentMethod,
                TransactionDate = dto.ExpenseDate,
                PaymentDate = dto.ExpenseDate,
                ReceiptPhotoUrl = dto.ReceiptPhotoUrl,
                IsSystemGenerated = true
            };
            
            context.Set<FinancialTransaction>().Add(expense);
        }

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<PaginatedList<PettyCashMobileDto>> GetMobilePettyCashAsync(Guid projectId, int pageNumber, int pageSize)
    {
        var query = context.Set<PettyCash>()
            .Include(p => p.Project)
            .Include(p => p.IssuedToUser)
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.IssuedAt);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new PettyCashMobileDto
            {
                Id = t.Id,
                ProjectId = t.ProjectId,
                ProjectName = t.Project != null ? t.Project.Name : string.Empty,
                Amount = t.Amount,
                Reason = t.Reason,
                IssuedAt = t.IssuedAt,
                IsSettled = t.IsSettled,
                IssuedTo = t.IssuedToUser != null ? t.IssuedToUser.FirstName + " " + t.IssuedToUser.LastName : string.Empty,
                Status = t.Status,
                Category = t.Category,
                Comments = t.Comments,
                ReceiptPhotoUrl = t.ReceiptPhotoUrl,
                SettlementPaymentMethod = t.SettlementPaymentMethod.HasValue ? t.SettlementPaymentMethod.Value.ToString() : string.Empty,
                ExpenseDate = t.ExpenseDate
            })
            .ToListAsync();

        return new PaginatedList<PettyCashMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<(bool Success, string Message)> UpdatePettyCashAsync(Guid projectId, Guid id, PettyCashUpdateDto dto)
    {
        var pettyCash = await context.Set<PettyCash>()
            .FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);

        if (pettyCash == null)
            return (false, "Petty cash record not found.");

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return (false, "This financial transaction is closed and audited. It cannot be modified or deleted.");

        pettyCash.Amount = dto.Amount;
        pettyCash.Reason = dto.Reason;
        pettyCash.Category = dto.Category;
        await context.SaveChangesAsync();

        return (true, "Petty cash updated successfully.");
    }

    public async Task<(bool Success, string Message)> DeletePettyCashAsync(Guid projectId, Guid id)
    {
        var pettyCash = await context.Set<PettyCash>()
            .FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);

        if (pettyCash == null)
            return (false, "Petty cash record not found.");

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return (false, "This financial transaction is closed and audited. It cannot be modified or deleted.");

        if (pettyCash.Status == "Issued" && pettyCash.SourcePoolId.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.Id == pettyCash.SourcePoolId.Value && p.ProjectId == projectId);

            if (pool != null)
            {
                pool.AvailableBalance += pettyCash.Amount;
            }
        }

        if (!string.IsNullOrEmpty(pettyCash.ReceiptPhotoUrl))
        {
            _ = storageService.DeleteFileAsync(pettyCash.ReceiptPhotoUrl);
        }

        context.Set<PettyCash>().Remove(pettyCash);
        await context.SaveChangesAsync();

        return (true, "Petty cash deleted and pool balance restored.");
    }
}
