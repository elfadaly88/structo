using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

public class FinancialTransactionService(DbContext context, ICloudStorageService storageService) : IFinancialTransactionService
{
    public async Task<(bool Success, string Message)> CreateTransactionAsync(Guid projectId, FinancialTransactionCreateDto dto)
    {
        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            Amount = dto.Amount,
            Description = dto.Description,
            Type = dto.Type,
            TransactionDate = dto.TransactionDate
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        return (true, "Transaction added successfully");
    }

    public async Task<PaginatedList<FinancialTransactionMobileDto>> GetMobileTransactionsAsync(Guid projectId, int pageNumber, int pageSize)
    {
        var query = context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.TransactionDate);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new FinancialTransactionMobileDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type.ToString(),
                Description = t.Description,
                TransactionDate = t.TransactionDate,
                PaymentDate = t.PaymentDate,
                PaymentMethod = t.PaymentMethod.HasValue ? t.PaymentMethod.ToString() : null,
                ReceiptPhotoUrl = t.ReceiptPhotoUrl
            })
            .ToListAsync();

        return new PaginatedList<FinancialTransactionMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<(bool Success, string Message)> InjectCapitalAsync(Guid projectId, CapitalInjectDto dto, Guid? tenantId)
    {
        if (tenantId == null)
            return (false, "Tenant ID missing or invalid.");

        var pool = await context.Set<ProjectCashPool>()
            .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == dto.SourceType);

        if (pool == null)
            {
                pool = new ProjectCashPool
                {
                    ProjectId = projectId,
                    TenantId = tenantId.Value,
                    SourceType = dto.SourceType,
                    TotalInjected = 0,
                    AvailableBalance = 0
                };
                context.Set<ProjectCashPool>().Add(pool);
            }

        pool.TotalInjected += dto.Amount;
        pool.AvailableBalance += dto.Amount;

        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = tenantId.Value,
            Amount = dto.Amount,
            Description = $"Capital Injection ({dto.SourceType}) - {dto.Description}",
            Type = TransactionType.Income,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = dto.PaymentDate ?? DateTime.UtcNow,
            PaymentMethod = dto.PaymentMethod,
            ReceiptPhotoUrl = dto.ReceiptPhotoUrl,
            IsSystemGenerated = true,
            SourceType = dto.SourceType
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        return (true, "Capital injected successfully.");
    }

    public async Task<IEnumerable<ProjectCashPool>> GetCashPoolsAsync(Guid projectId)
    {
        return await context.Set<ProjectCashPool>()
            .Where(p => p.ProjectId == projectId)
            .ToListAsync();
    }

    public async Task<(bool Success, string Message)> UpdateTransactionAsync(Guid projectId, Guid id, FinancialTransactionUpdateDto dto)
    {
        var transaction = await context.Set<FinancialTransaction>()
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return (false, "Transaction not found.");

        if (transaction.IsSystemGenerated)
        {
            return (false, "This financial transaction is closed and audited. It cannot be modified or deleted.");
        }

        transaction.Amount = dto.Amount;
        transaction.Description = dto.Description;
        if (dto.PaymentDate.HasValue)
            transaction.PaymentDate = dto.PaymentDate.Value;
        if (dto.PaymentMethod.HasValue)
            transaction.PaymentMethod = dto.PaymentMethod;
            
        if (dto.ReceiptPhotoUrl != null && transaction.ReceiptPhotoUrl != dto.ReceiptPhotoUrl)
        {
            if (!string.IsNullOrEmpty(transaction.ReceiptPhotoUrl))
            {
                _ = storageService.DeleteFileAsync(transaction.ReceiptPhotoUrl);
            }
            transaction.ReceiptPhotoUrl = dto.ReceiptPhotoUrl;
        }

        await context.SaveChangesAsync();
        return (true, "Transaction updated successfully.");
    }

    public async Task<(bool Success, string Message)> DeleteTransactionAsync(Guid projectId, Guid id)
    {
        var transaction = await context.Set<FinancialTransaction>()
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return (false, "Transaction not found.");

        if (transaction.IsSystemGenerated && transaction.SourceType == null)
        {
            return (false, "This financial transaction is closed and audited. It cannot be modified or deleted.");
        }

        if (transaction.Type == TransactionType.Income && transaction.IsSystemGenerated && transaction.SourceType.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == transaction.SourceType.Value);

            if (pool != null)
            {
                pool.AvailableBalance = Math.Max(0, pool.AvailableBalance - transaction.Amount);
                pool.TotalInjected = Math.Max(0, pool.TotalInjected - transaction.Amount);
            }
        }

        if (!string.IsNullOrEmpty(transaction.ReceiptPhotoUrl))
        {
            _ = storageService.DeleteFileAsync(transaction.ReceiptPhotoUrl);
        }

        context.Set<FinancialTransaction>().Remove(transaction);
        await context.SaveChangesAsync();

        return (true, "Transaction deleted and pool balance corrected.");
    }
}
