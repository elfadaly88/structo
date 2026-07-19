using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static Structo.Core.Services.FinancialTransactionService;

namespace Structo.Core.Services;

public class FinancialTransactionService(DbContext context, ICloudStorageService storageService) : IFinancialTransactionService
{
    public async Task<(bool Success, string Message)> CreateTransactionAsync(Guid projectId, FinancialTransactionCreateDto dto, string userRole)
    {
        var project = await context.Set<Project>().FindAsync(projectId);
        if (project == null)
            return (false, "Project not found.");

        // --- Financial Freeze Guard ---
        if (project.Status == ProjectStatus.FinancialFreeze || project.Status == ProjectStatus.Closed)
            return (false, $"PROJECT_FROZEN: لا يمكن إضافة معاملات مالية جديدة. المشروع في وضع {project.Status}.");

        var isExpense = dto.Type == TransactionType.Expense || dto.Type == TransactionType.DirectProjectExpense;
        if (isExpense)
        {
            var totalExpenses = await context.Set<FinancialTransaction>()
                .Where(t => t.ProjectId == projectId && (t.Type == TransactionType.Expense || t.Type == TransactionType.DirectProjectExpense))
                .SumAsync(t => t.Amount);

            if (totalExpenses + dto.Amount > project.Budget)
            {
                if (dto.ForceOverrun)
                {
                    if (userRole != "TenantOwner")
                    {
                        throw new UnauthorizedAccessException("Unauthorized budget overrun override. Only TenantOwner can bypass project budget limits.");
                    }
                }
                else
                {
                    return (false, "BUDGET_EXCEEDED: This transaction exceeds the remaining project budget.");
                }
            }
        }

        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            Amount = dto.Amount,
            Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Description),
            Type = dto.Type,
            TransactionDate = dto.TransactionDate,
            IsOverrun = dto.ForceOverrun
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        return (true, "Transaction added successfully");
    }

    private static DateTime ToEgyptLocalTime(DateTime utcTime)
    {
        TimeZoneInfo egyptZone;
        try
        {
            egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time");
        }
        catch (TimeZoneNotFoundException)
        {
            egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Africa/Cairo");
        }
        
        var utc = utcTime.Kind == DateTimeKind.Unspecified 
            ? DateTime.SpecifyKind(utcTime, DateTimeKind.Utc) 
            : utcTime.ToUniversalTime();
            
        return TimeZoneInfo.ConvertTimeFromUtc(utc, egyptZone);
    }

    public async Task<PaginatedList<FinancialTransactionMobileDto>> GetMobileTransactionsAsync(Guid projectId, int pageNumber, int pageSize, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var query = context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.TransactionDate);

        var totalCount = await query.CountAsync();

        var dbItems = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var items = dbItems.Select(t => new FinancialTransactionMobileDto
        {
            Id = t.Id,
            Amount = t.Amount,
            Type = t.Type.ToString(),
            Description = t.Description,
            TransactionDate = ToEgyptLocalTime(t.TransactionDate),
            PaymentDate = ToEgyptLocalTime(t.PaymentDate),
            PaymentMethod = t.PaymentMethod.HasValue ? t.PaymentMethod.ToString() : null,
            ReceiptPhotoUrl = t.ReceiptPhotoUrl
        }).ToList();

        return new PaginatedList<FinancialTransactionMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<(bool Success, string Message)> InjectCapitalAsync(Guid projectId, CapitalInjectDto dto, Guid? tenantId, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        if (tenantId == null)
            return (false, "Tenant ID missing or invalid.");

        // --- Financial Freeze Guard ---
        var projectCheck = await context.Set<Project>().FindAsync(projectId);
        if (projectCheck != null && (projectCheck.Status == ProjectStatus.FinancialFreeze || projectCheck.Status == ProjectStatus.Closed))
            return (false, $"PROJECT_FROZEN: لا يمكن حقن رأس مال جديد. المشروع في وضع {projectCheck.Status}.");

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
            Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize($"Capital Injection ({dto.SourceType}) - {dto.Description}"),
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

    public async Task<IEnumerable<ProjectCashPool>> GetCashPoolsAsync(Guid projectId, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        return await context.Set<ProjectCashPool>()
            .Where(p => p.ProjectId == projectId)
            .ToListAsync();
    }

    public async Task<(bool Success, string Message)> UpdateTransactionAsync(Guid projectId, Guid id, FinancialTransactionUpdateDto dto, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var transaction = await context.Set<FinancialTransaction>()
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return (false, "Transaction not found.");

        if (transaction.IsSystemGenerated)
        {
            return (false, "This financial transaction is closed and audited. It cannot be modified or deleted.");
        }

        transaction.Amount = dto.Amount;
        transaction.Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Description);
        if (dto.PaymentDate.HasValue)
            transaction.PaymentDate = dto.PaymentDate.Value;
        if (dto.PaymentMethod.HasValue)
            transaction.PaymentMethod = dto.PaymentMethod;

        if (dto.ReceiptPhotoUrl != null && transaction.ReceiptPhotoUrl != dto.ReceiptPhotoUrl)
        {
            if (!string.IsNullOrEmpty(transaction.ReceiptPhotoUrl))
            {
                try { await storageService.DeleteFileAsync(transaction.ReceiptPhotoUrl); }
                catch (Exception) { /* Storage deletion is best-effort; never block the transaction update */ }
            }
            transaction.ReceiptPhotoUrl = dto.ReceiptPhotoUrl;
        }

        await context.SaveChangesAsync();
        return (true, "Transaction updated successfully.");
    }

    public async Task<(bool Success, string Message)> DeleteTransactionAsync(Guid projectId, Guid id, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

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
            try { await storageService.DeleteFileAsync(transaction.ReceiptPhotoUrl); }
            catch (Exception) { /* Storage deletion is best-effort; never block the financial transaction delete */ }
        }

        context.Set<FinancialTransaction>().Remove(transaction);
        await context.SaveChangesAsync();

        return (true, "Transaction deleted and pool balance corrected.");
    }

    public async Task<(bool Success, string Message)> DirectDisbursementAsync(Guid projectId, DirectDisbursementDto dto, Guid tenantId, string userRole, Guid currentUserId)
    {
        if (userRole != "TenantOwner" && userRole != "Accountant")
        {
            throw new UnauthorizedAccessException("Only TenantOwner and Accountants are allowed to perform direct disbursements.");
        }

        // Fallback: if no engineer selected, assign to the current logged-in user (TenantOwner/Accountant)
        var targetUserId = dto.UserId.HasValue && dto.UserId.Value != Guid.Empty
            ? dto.UserId.Value
            : currentUserId;

        var pool = await context.Set<ProjectCashPool>()
            .FirstOrDefaultAsync(p => p.Id == dto.SourcePoolId && p.ProjectId == projectId);
        if (pool == null)
            return (false, "Selected cash pool not found.");

        if (dto.Amount > pool.AvailableBalance)
            return (false, $"Insufficient funds in selected pool. Available balance is {pool.AvailableBalance} EGP.");

        // Deduct from pool
        pool.AvailableBalance -= dto.Amount;

        // Create PettyCash entity immediately in Issued status
        var pettyCash = new PettyCash
        {
            ProjectId = projectId,
            TenantId = tenantId,
            IssuedToUserId = targetUserId,
            Amount = dto.Amount,
            Reason = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Description) ?? string.Empty,
            Status = "Issued",
            Category = "Direct Disbursement",
            SourcePoolId = pool.Id,
            IssuedAt = DateTime.UtcNow,
            IsSettled = false
        };

        context.Set<PettyCash>().Add(pettyCash);

        // Create FinancialTransaction for accountability
        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = tenantId,
            Amount = dto.Amount,
            Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize($"Direct Disbursement - {dto.Description}"),
            Type = TransactionType.DirectDisbursement,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = DateTime.UtcNow,
            PaymentMethod = dto.PaymentMethod,
            IsSystemGenerated = true
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        return (true, "Direct disbursement credited successfully.");
    }


    public async Task<bool> UserHasAccessToProjectAsync(ClaimsPrincipal user, Guid projectId)
    {
        // 1. استخراج الـ TenantId والـ UserId من الـ Token Claims بأمان
        var tenantIdClaim = user.FindFirst("tenantId")?.Value;
        var userIdClaim = user.FindFirst("sub")?.Value ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var roleClaim = user.FindFirst("role")?.Value ?? user.FindFirst(ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(tenantIdClaim) || string.IsNullOrEmpty(userIdClaim) || string.IsNullOrEmpty(roleClaim))
            return false;

        var tenantId = Guid.Parse(tenantIdClaim);
        var userId = Guid.Parse(userIdClaim);

        // 2. 🧠 السحر البرمجي: تحويل النص القادم من الـ JWT إلى الـ UserRole Enum بالملي
        if (!Enum.TryParse<UserRole>(roleClaim, true, out var userRole))
        {
            return false; // لو الـ Role غريبة ومش متعرّفة في الـ enum، اقفل الباب فوراً
        }        
        // مسموح لهم بالاطلاع الكامل على أي مشروع مالي طالما ينتمي لنفس الشركة (Tenant)
        if (userRole == UserRole.TenantOwner || userRole == UserRole.Accountant)
        {
            return await context.Set<Project>()
                .AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }        
        // ممنوعين من تصفح أي مشروع مالي إلا لو كانوا هما اللي ماسكين المشروع ده ومسجلين كـ ManagerId
        if (userRole == UserRole.Manager || userRole == UserRole.SiteEngineer || userRole == UserRole.DesignEngineer)
        {
            return await context.Set<Project>()
                .AnyAsync(p => p.Id == projectId && p.TenantId == tenantId && p.ManagerId == userId);
        }

        // 5. الـ SuperAdmin أو أي رول تانية مش متوضحة فوق بتتحظر أوتوماتيكياً
        return false;
    }
}

