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
            TransactionDate = dto.TransactionDate != default ? dto.TransactionDate : DateTime.UtcNow,
            PaymentDate = dto.TransactionDate != default ? dto.TransactionDate : DateTime.UtcNow,
            IsOverrun = dto.ForceOverrun
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        return (true, "Transaction added successfully");
    }

    private static DateTime ToEgyptLocalTime(DateTime utcTime)
    {
        if (utcTime == default || utcTime <= new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc))
            utcTime = DateTime.UtcNow;

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

        await EnsureSettlementExpensesMaterializedAsync(projectId);

        var query = context.Set<FinancialTransaction>()
            .AsNoTracking()
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.TransactionDate);

        var totalCount = await query.CountAsync();

        var dbItems = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var pools = await context.Set<ProjectCashPool>()
            .AsNoTracking()
            .Where(p => p.ProjectId == projectId)
            .ToListAsync();

        var pettyCashes = await context.Set<PettyCash>()
            .AsNoTracking()
            .Where(p => p.ProjectId == projectId && p.Status != "Rejected")
            .ToListAsync();

        var totalDisbursedMap = pettyCashes
            .Where(p => p.SourcePoolId.HasValue)
            .GroupBy(p => p.SourcePoolId!.Value)
            .ToDictionary(g => g.Key, g => g.Sum(p => p.Amount));

        var items = dbItems.Select(t =>
        {
            bool isLocked = t.IsAudited || t.IsClosed || t.SettlementId.HasValue ||
                (!string.IsNullOrEmpty(t.Description) && t.Description.StartsWith("petty cash settlement -", StringComparison.OrdinalIgnoreCase));

            if (!isLocked && t.Type == TransactionType.Income)
            {
                if (t.SourceType.HasValue)
                {
                    var pool = pools.FirstOrDefault(p => p.SourceType == t.SourceType.Value);
                    if (pool != null)
                    {
                        var disbursed = totalDisbursedMap.GetValueOrDefault(pool.Id, 0m);
                        if (disbursed > 0 || pool.AvailableBalance < pool.TotalInjected)
                        {
                            isLocked = true;
                        }
                    }
                }
                else
                {
                    if (totalDisbursedMap.Values.Any(v => v > 0) || pools.Any(p => p.AvailableBalance < p.TotalInjected))
                    {
                        isLocked = true;
                    }
                }
            }

            var rawTxDate = t.TransactionDate != default && t.TransactionDate > new DateTime(1970, 1, 1)
                ? t.TransactionDate
                : (t.PaymentDate != default && t.PaymentDate > new DateTime(1970, 1, 1) ? t.PaymentDate : DateTime.UtcNow);

            var rawPaymentDate = t.PaymentDate != default && t.PaymentDate > new DateTime(1970, 1, 1)
                ? t.PaymentDate
                : rawTxDate;

            return new FinancialTransactionMobileDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type.ToString(),
                Description = t.Description,
                TransactionDate = ToEgyptLocalTime(rawTxDate),
                PaymentDate = ToEgyptLocalTime(rawPaymentDate),
                PaymentMethod = t.PaymentMethod.HasValue ? t.PaymentMethod.ToString() : null,
                ReceiptPhotoUrl = t.ReceiptPhotoUrl,
                IsLocked = isLocked,
                CanEdit = !isLocked,
                CanDelete = !isLocked
            };
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

        if (dto.Amount <= 0)
            return (false, "INVALID_AMOUNT: يجب أن يكون مبلغ الحقن أصل من صفر.");

        if (!tenantId.HasValue)
            return (false, "TENANT_REQUIRED: المعرف الخاص بالشركة مطلوب.");

        // --- Financial Freeze Guard ---
        var projectCheck = await context.Set<Project>().FindAsync(projectId);
        if (projectCheck == null)
            return (false, "Project not found.");

        if (projectCheck.Status == ProjectStatus.FinancialFreeze || projectCheck.Status == ProjectStatus.Closed)
            return (false, $"PROJECT_FROZEN: لا يمكن حقن رأس مال جديد. المشروع في حالة {projectCheck.Status}.");

        var targetTenantId = projectCheck.TenantId;

        var pool = await context.Set<ProjectCashPool>()
            .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == dto.SourceType);

        if (pool == null)
        {
            pool = new ProjectCashPool
            {
                Id = Guid.NewGuid(),
                ProjectId = projectId,
                TenantId = targetTenantId,
                SourceType = dto.SourceType,
                TotalInjected = 0,
                AvailableBalance = 0,
                CreatedAt = DateTime.UtcNow
            };
            context.Set<ProjectCashPool>().Add(pool);
        }

        pool.TotalInjected += dto.Amount;
        pool.AvailableBalance += dto.Amount;

        var transaction = new FinancialTransaction
        {
            Id = Guid.NewGuid(),
            ProjectId = projectId,
            TenantId = targetTenantId,
            Amount = dto.Amount,
            Description = Structo.Core.Helpers.HtmlSanitizer.Sanitize($"Capital Injection ({dto.SourceType}) - {dto.Description}"),
            Type = TransactionType.Income,
            TransactionDate = dto.PaymentDate.HasValue
                ? (dto.PaymentDate.Value.Kind == DateTimeKind.Utc
                    ? dto.PaymentDate.Value
                    : DateTime.SpecifyKind(dto.PaymentDate.Value, DateTimeKind.Utc))
                : DateTime.UtcNow,
            PaymentDate = dto.PaymentDate.HasValue
                ? (dto.PaymentDate.Value.Kind == DateTimeKind.Utc
                    ? dto.PaymentDate.Value
                    : DateTime.SpecifyKind(dto.PaymentDate.Value, DateTimeKind.Utc))
                : DateTime.UtcNow,
            PaymentMethod = dto.PaymentMethod,
            ReceiptPhotoUrl = dto.ReceiptPhotoUrl,
            IsSystemGenerated = true,
            SourceType = dto.SourceType
        };

        context.Set<FinancialTransaction>().Add(transaction);
        await context.SaveChangesAsync();

        // Recalculate cash pool totals strictly from all income transactions and petty cash disbursements
        var totalInjected = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == projectId && t.Type == TransactionType.Income && t.SourceType == dto.SourceType)
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        var totalDisbursed = await context.Set<PettyCash>()
            .Where(p => p.ProjectId == projectId && p.SourcePoolId == pool.Id && p.Status != "Rejected")
            .SumAsync(p => (decimal?)p.Amount) ?? 0m;

        pool.TotalInjected = totalInjected;
        pool.AvailableBalance = totalInjected - totalDisbursed;

        await context.SaveChangesAsync();

        return (true, "Capital injected successfully.");
    }

    public async Task<IEnumerable<ProjectCashPool>> GetCashPoolsAsync(Guid projectId, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == projectId);
        if (project == null) return Enumerable.Empty<ProjectCashPool>();

        var existingPools = await context.Set<ProjectCashPool>()
            .Where(p => p.ProjectId == projectId)
            .ToListAsync();

        // Ensure all pool source types exist
        foreach (var sourceType in Enum.GetValues<CashPoolSourceType>())
        {
            var pool = existingPools.FirstOrDefault(p => p.SourceType == sourceType);
            if (pool == null)
            {
                pool = new ProjectCashPool
                {
                    Id = Guid.NewGuid(),
                    ProjectId = projectId,
                    TenantId = project.TenantId,
                    SourceType = sourceType,
                    TotalInjected = 0,
                    AvailableBalance = 0,
                    CreatedAt = DateTime.UtcNow
                };
                context.Set<ProjectCashPool>().Add(pool);
                existingPools.Add(pool);
            }
        }

        // Dynamically aggregate ALL income transactions for each pool (SUM(Amount) WHERE SourceType = sourceType AND ProjectId = id)
        foreach (var pool in existingPools)
        {
            var totalInjected = await context.Set<FinancialTransaction>()
                .Where(t => t.ProjectId == projectId && t.Type == TransactionType.Income && t.SourceType == pool.SourceType)
                .SumAsync(t => (decimal?)t.Amount) ?? 0m;

            var totalDisbursed = await context.Set<PettyCash>()
                .Where(p => p.ProjectId == projectId && p.SourcePoolId == pool.Id && p.Status != "Rejected")
                .SumAsync(p => (decimal?)p.Amount) ?? 0m;

            pool.TotalInjected = totalInjected;
            pool.AvailableBalance = totalInjected - totalDisbursed;
        }

        await context.SaveChangesAsync();
        return existingPools;
    }

    public async Task<(bool Success, string Message)> UpdateTransactionAsync(Guid projectId, Guid id, FinancialTransactionUpdateDto dto, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        var transaction = await context.Set<FinancialTransaction>()
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return (false, "Transaction not found.");

        if (transaction.IsAudited || transaction.IsClosed || transaction.SettlementId.HasValue ||
            (!string.IsNullOrEmpty(transaction.Description) && transaction.Description.StartsWith("petty cash settlement -", StringComparison.OrdinalIgnoreCase)))
        {
            return (false, "TRANSACTION_LOCKED: هذه المعاملة المالية مقفلة ولا يمكن تعديلها.");
        }

        if (transaction.Type == TransactionType.Income && transaction.SourceType.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == transaction.SourceType.Value);

            if (pool != null)
            {
                var totalDisbursed = await context.Set<PettyCash>()
                    .Where(p => p.ProjectId == projectId && p.SourcePoolId == pool.Id && p.Status != "Rejected")
                    .SumAsync(p => (decimal?)p.Amount) ?? 0m;

                if (totalDisbursed > 0 || pool.AvailableBalance < pool.TotalInjected)
                {
                    return (false, "TRANSACTION_LOCKED: المعاملة مقفلة نظراً لوجود تسويات أو عهد مسحوبة من هذا الوعاء التمويلي.");
                }
            }
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

        if (transaction.IsAudited || transaction.IsClosed || transaction.SettlementId.HasValue ||
            (!string.IsNullOrEmpty(transaction.Description) && transaction.Description.StartsWith("petty cash settlement -", StringComparison.OrdinalIgnoreCase)))
        {
            return (false, "TRANSACTION_LOCKED: هذه المعاملة المالية مقفلة ولا يمكن حذفها.");
        }

        if (transaction.Type == TransactionType.Income && transaction.SourceType.HasValue)
        {
            var pool = await context.Set<ProjectCashPool>()
                .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == transaction.SourceType.Value);

            if (pool != null)
            {
                var totalDisbursed = await context.Set<PettyCash>()
                    .Where(p => p.ProjectId == projectId && p.SourcePoolId == pool.Id && p.Status != "Rejected")
                    .SumAsync(p => (decimal?)p.Amount) ?? 0m;

                if (totalDisbursed > 0 || pool.AvailableBalance < pool.TotalInjected)
                {
                    return (false, "TRANSACTION_LOCKED: المعاملة مقفلة نظراً لوجود تسويات أو عهد مسحوبة من هذا الوعاء التمويلي.");
                }

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

        if (!Guid.TryParse(tenantIdClaim, out var tenantId) || !Guid.TryParse(userIdClaim, out var userId))
            return false;

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

    public async Task EnsureSettlementExpensesMaterializedAsync(Guid projectId)
    {
        var approvedSettlements = await context.Set<Settlement>()
            .Include(s => s.Lines)
            .Include(s => s.PettyCash)
            .Where(s => s.ProjectId == projectId &&
                (s.Status == SettlementStatus.Approved || s.Status == SettlementStatus.ApprovedPendingRefund || s.Status == SettlementStatus.Refunded))
            .ToListAsync();

        bool modified = false;

        foreach (var settlement in approvedSettlements)
        {
            var existingTxs = await context.Set<FinancialTransaction>()
                .Where(t => t.SettlementId == settlement.Id && t.Type == TransactionType.Expense)
                .ToListAsync();

            if (!existingTxs.Any())
            {
                if (settlement.Lines != null && settlement.Lines.Any())
                {
                    foreach (var line in settlement.Lines)
                    {
                        var expense = new FinancialTransaction
                        {
                            Id = Guid.NewGuid(),
                            ProjectId = projectId,
                            TenantId = settlement.TenantId,
                            Type = TransactionType.Expense,
                            Amount = line.Amount,
                            Description = string.IsNullOrWhiteSpace(line.Description)
                                ? $"Petty Cash Settlement Item ({line.Category})"
                                : line.Description,
                            PaymentMethod = settlement.PettyCash?.SettlementPaymentMethod ?? PaymentMethod.Cash,
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
                        Description = $"Petty Cash Settlement - Spent Amount: {settlement.PettyCash?.Reason ?? string.Empty}",
                        PaymentMethod = settlement.PettyCash?.SettlementPaymentMethod ?? PaymentMethod.Cash,
                        TransactionDate = settlement.SubmittedAt != default ? settlement.SubmittedAt : DateTime.UtcNow,
                        PaymentDate = DateTime.UtcNow,
                        IsSystemGenerated = true,
                        IsAudited = true,
                        SettlementId = settlement.Id
                    };
                    context.Set<FinancialTransaction>().Add(expense);
                }
                modified = true;
            }
            else
            {
                foreach (var tx in existingTxs)
                {
                    if (!tx.IsAudited)
                    {
                        tx.IsAudited = true;
                        modified = true;
                    }
                }
            }
        }

        // Also handle settled PettyCash items without a Settlement entity
        var settledPettyCashes = await context.Set<PettyCash>()
            .Where(p => p.ProjectId == projectId && p.IsSettled && p.SpentAmount > 0 && !p.IsReimbursement)
            .ToListAsync();

        foreach (var pc in settledPettyCashes)
        {
            var hasSettlement = approvedSettlements.Any(s => s.PettyCashId == pc.Id);
            if (!hasSettlement)
            {
                var hasTx = await context.Set<FinancialTransaction>()
                    .AnyAsync(t => t.ProjectId == projectId && t.Type == TransactionType.Expense && t.Amount == pc.SpentAmount);

                if (!hasTx)
                {
                    var expense = new FinancialTransaction
                    {
                        Id = Guid.NewGuid(),
                        ProjectId = projectId,
                        TenantId = pc.TenantId,
                        Type = TransactionType.Expense,
                        Amount = pc.SpentAmount,
                        Description = $"Petty Cash Settlement - {pc.Reason}",
                        PaymentMethod = pc.SettlementPaymentMethod ?? PaymentMethod.Cash,
                        ReceiptPhotoUrl = pc.ReceiptPhotoUrl,
                        TransactionDate = pc.ExpenseDate ?? DateTime.UtcNow,
                        PaymentDate = pc.ExpenseDate ?? DateTime.UtcNow,
                        IsSystemGenerated = true,
                        IsAudited = true
                    };
                    context.Set<FinancialTransaction>().Add(expense);
                    modified = true;
                }
            }
        }

        if (modified)
        {
            await context.SaveChangesAsync();
        }
    }

    public async Task<ProjectFinancialSummaryDto> GetProjectFinancialSummaryAsync(Guid projectId, string userRole)
    {
        if (userRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        await EnsureSettlementExpensesMaterializedAsync(projectId);

        var totalIncome = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == projectId && t.Type == TransactionType.Income)
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        var totalExpenses = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == projectId && (t.Type == TransactionType.Expense || t.Type == TransactionType.DirectProjectExpense))
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        var netBalance = totalIncome - totalExpenses;

        var pendingApprovalsCount = await context.Set<PettyCash>()
            .CountAsync(p => p.ProjectId == projectId && p.Status == "Pending");

        return new ProjectFinancialSummaryDto
        {
            ProjectId = projectId,
            TotalIncome = totalIncome,
            TotalExpenses = totalExpenses,
            NetBalance = netBalance,
            PendingApprovalsCount = pendingApprovalsCount
        };
    }
}

