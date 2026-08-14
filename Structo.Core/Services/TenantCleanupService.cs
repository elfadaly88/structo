using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Tenants;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class TenantCleanupService : ITenantCleanupService
{
    private readonly DbContext _context;
    private readonly ICloudStorageService _cloudStorageService;
    private readonly ILogger<TenantCleanupService> _logger;

    public TenantCleanupService(
        DbContext context,
        ICloudStorageService cloudStorageService,
        ILogger<TenantCleanupService> logger)
    {
        _context = context;
        _cloudStorageService = cloudStorageService;
        _logger = logger;
    }

    public async Task<TenantLifecycleSummaryDto> GetLifecycleSummaryAsync(CancellationToken cancellationToken = default)
    {
        var tenants = await _context.Set<Tenant>().IgnoreQueryFilters()
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var totalProjects = await _context.Set<Project>().IgnoreQueryFilters()
            .CountAsync(cancellationToken);

        var now = DateTime.UtcNow;
        int activeCount = 0;
        int suspendedCount = 0;
        int pendingDeletionCount = 0;
        int freeCount = 0;
        int proCount = 0;
        int inactiveOver45DaysCount = 0;

        foreach (var t in tenants)
        {
            if (t.Status == TenantStatus.Active) activeCount++;
            else if (t.Status == TenantStatus.Suspended) suspendedCount++;
            else if (t.Status == TenantStatus.PendingDeletion || t.Status == TenantStatus.Deleted) pendingDeletionCount++;

            if (t.SubscriptionPlan == SubscriptionPlan.Free) freeCount++;
            else proCount++;

            var effectiveLastActive = t.LastActiveAt ?? t.CreatedAt;
            var daysInactive = Math.Max(0, (int)(now - effectiveLastActive).TotalDays);
            if (daysInactive >= 45)
            {
                inactiveOver45DaysCount++;
            }
        }

        var totalInvoices = await _context.Set<SettlementLine>().IgnoreQueryFilters()
            .CountAsync(sl => !string.IsNullOrEmpty(sl.InvoiceUrl), cancellationToken);
        var totalPhotos = await _context.Set<SitePhoto>().IgnoreQueryFilters()
            .CountAsync(cancellationToken);
        var totalReceipts = await _context.Set<FinancialTransaction>().IgnoreQueryFilters()
            .CountAsync(ft => !string.IsNullOrEmpty(ft.ReceiptPhotoUrl), cancellationToken);

        double totalStorageFootprintMb = Math.Round((totalInvoices * 1.5) + (totalPhotos * 2.0) + (totalReceipts * 1.0), 2);

        return new TenantLifecycleSummaryDto
        {
            TotalTenants = tenants.Count,
            ActiveCount = activeCount,
            SuspendedCount = suspendedCount,
            PendingDeletionCount = pendingDeletionCount,
            FreeTenantsCount = freeCount,
            ProTenantsCount = proCount,
            InactiveOver45DaysCount = inactiveOver45DaysCount,
            TotalProjectsCount = totalProjects,
            TotalStorageFootprintMb = totalStorageFootprintMb,
            EstimatedPurgedStorageMb = Math.Round(inactiveOver45DaysCount * 4.5, 2)
        };
    }

    public async Task<AdminTenantPagedResultDto> GetAdminTenantsAsync(AdminTenantQueryDto query, CancellationToken cancellationToken = default)
    {
        var tenantsQuery = _context.Set<Tenant>().IgnoreQueryFilters()
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var s = query.Search.Trim().ToLower();
            tenantsQuery = tenantsQuery.Where(t => t.Name.ToLower().Contains(s) ||
                                                   t.Region.ToLower().Contains(s) ||
                                                   t.Location.ToLower().Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(query.StatusFilter) && query.StatusFilter != "All")
        {
            if (Enum.TryParse<TenantStatus>(query.StatusFilter, true, out var status))
            {
                tenantsQuery = tenantsQuery.Where(t => t.Status == status);
            }
        }

        if (!string.IsNullOrWhiteSpace(query.PlanFilter) && query.PlanFilter != "All")
        {
            if (Enum.TryParse<SubscriptionPlan>(query.PlanFilter, true, out var plan))
            {
                tenantsQuery = tenantsQuery.Where(t => t.SubscriptionPlan == plan);
            }
        }

        var allMatchingTenants = await tenantsQuery
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);

        var tenantIds = allMatchingTenants.Select(t => t.Id).ToList();

        var owners = await _context.Set<User>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId.HasValue && tenantIds.Contains(u.TenantId.Value) && u.Role == UserRole.TenantOwner)
            .ToListAsync(cancellationToken);

        var ownerLookup = owners
            .GroupBy(u => u.TenantId!.Value)
            .ToDictionary(g => g.Key, g => g.First());

        var projectCounts = await _context.Set<Project>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => tenantIds.Contains(p.TenantId))
            .GroupBy(p => p.TenantId)
            .Select(g => new { TenantId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TenantId, x => x.Count, cancellationToken);

        var userCounts = await _context.Set<User>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId.HasValue && tenantIds.Contains(u.TenantId.Value))
            .GroupBy(u => u.TenantId!.Value)
            .Select(g => new { TenantId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TenantId, x => x.Count, cancellationToken);

        var photoCounts = await _context.Set<SitePhoto>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => tenantIds.Contains(p.TenantId))
            .GroupBy(p => p.TenantId)
            .Select(g => new { TenantId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TenantId, x => x.Count, cancellationToken);

        var invoiceCounts = await _context.Set<SettlementLine>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(sl => tenantIds.Contains(sl.TenantId) && !string.IsNullOrEmpty(sl.InvoiceUrl))
            .GroupBy(sl => sl.TenantId)
            .Select(g => new { TenantId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TenantId, x => x.Count, cancellationToken);

        var receiptCounts = await _context.Set<FinancialTransaction>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(ft => tenantIds.Contains(ft.TenantId) && !string.IsNullOrEmpty(ft.ReceiptPhotoUrl))
            .GroupBy(ft => ft.TenantId)
            .Select(g => new { TenantId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TenantId, x => x.Count, cancellationToken);

        var now = DateTime.UtcNow;
        var mappedList = new List<AdminTenantDto>();

        foreach (var t in allMatchingTenants)
        {
            var effectiveLastActive = t.LastActiveAt ?? t.CreatedAt;
            var daysInactive = Math.Max(0, (int)(now - effectiveLastActive).TotalDays);

            if (query.OnlyInactiveOver45Days == true && daysInactive < 45)
            {
                continue;
            }

            photoCounts.TryGetValue(t.Id, out var photos);
            invoiceCounts.TryGetValue(t.Id, out var invoices);
            receiptCounts.TryGetValue(t.Id, out var receipts);
            double storageFootprintMb = Math.Round((invoices * 1.5) + (photos * 2.0) + (receipts * 1.0), 2);

            ownerLookup.TryGetValue(t.Id, out var owner);
            projectCounts.TryGetValue(t.Id, out var pCount);
            userCounts.TryGetValue(t.Id, out var uCount);

            mappedList.Add(new AdminTenantDto
            {
                Id = t.Id,
                Name = t.Name,
                PlanType = t.SubscriptionPlan.ToString(),
                MaxActiveProjects = t.MaxActiveProjects,
                Status = t.Status.ToString(),
                CreatedAt = t.CreatedAt,
                LastActiveAt = t.LastActiveAt,
                DaysInactive = daysInactive,
                StorageFootprintMb = storageFootprintMb,
                IsCleanupExempt = t.IsCleanupExempt,
                TotalProjects = pCount,
                TotalUsers = uCount,
                AdminEmail = owner?.Email,
                AdminName = owner != null ? $"{owner.FirstName} {owner.LastName}".Trim() : null,
                Region = !string.IsNullOrWhiteSpace(t.Location) ? t.Location : t.Region,
                LogoUrl = t.LogoUrl
            });
        }

        var totalCount = mappedList.Count;
        var pageSize = query.PageSize > 0 ? query.PageSize : 10;
        var pageNumber = query.PageNumber > 0 ? query.PageNumber : 1;
        var pagedItems = mappedList
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return new AdminTenantPagedResultDto
        {
            Items = pagedItems,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<List<string>> CollectTenantFileUrlsAsync(Guid tenantId, CancellationToken cancellationToken = default)
    {
        var fileUrls = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // 1. Tenant entity
        var tenant = await _context.Set<Tenant>().IgnoreQueryFilters()
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant != null)
        {
            if (!string.IsNullOrWhiteSpace(tenant.LogoUrl)) fileUrls.Add(tenant.LogoUrl);
            if (!string.IsNullOrWhiteSpace(tenant.BannerUrl)) fileUrls.Add(tenant.BannerUrl);
        }

        // 2. Site Photos
        var sitePhotos = await _context.Set<SitePhoto>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(sp => sp.TenantId == tenantId && !string.IsNullOrWhiteSpace(sp.PhotoUrl))
            .Select(sp => sp.PhotoUrl)
            .ToListAsync(cancellationToken);
        foreach (var url in sitePhotos) fileUrls.Add(url);

        // 3. Financial Transactions Receipts
        var transactionReceipts = await _context.Set<FinancialTransaction>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(ft => ft.TenantId == tenantId && !string.IsNullOrWhiteSpace(ft.ReceiptPhotoUrl))
            .Select(ft => ft.ReceiptPhotoUrl!)
            .ToListAsync(cancellationToken);
        foreach (var url in transactionReceipts) fileUrls.Add(url);

        // 4. Petty Cash Receipts
        var pettyCashReceipts = await _context.Set<PettyCash>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(pc => pc.TenantId == tenantId && !string.IsNullOrWhiteSpace(pc.ReceiptPhotoUrl))
            .Select(pc => pc.ReceiptPhotoUrl)
            .ToListAsync(cancellationToken);
        foreach (var url in pettyCashReceipts) fileUrls.Add(url);

        // 5. Settlement Lines Invoices
        var invoices = await _context.Set<SettlementLine>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(sl => sl.TenantId == tenantId && !string.IsNullOrWhiteSpace(sl.InvoiceUrl))
            .Select(sl => sl.InvoiceUrl!)
            .ToListAsync(cancellationToken);
        foreach (var url in invoices) fileUrls.Add(url);

        // 6. Project Budget Logs BOQ files
        var projectIds = await _context.Set<Project>().IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => p.TenantId == tenantId)
            .Select(p => p.Id)
            .ToListAsync(cancellationToken);

        if (projectIds.Count > 0)
        {
            var boqFiles = await _context.Set<ProjectBudgetLog>().IgnoreQueryFilters()
                .AsNoTracking()
                .Where(bl => projectIds.Contains(bl.ProjectId) && !string.IsNullOrWhiteSpace(bl.BoqFileUrl))
                .Select(bl => bl.BoqFileUrl!)
                .ToListAsync(cancellationToken);
            foreach (var url in boqFiles) fileUrls.Add(url);
        }

        // Filter out empty or standard local placeholder assets
        return fileUrls
            .Where(u => !string.IsNullOrWhiteSpace(u) && !u.Contains("default-tenant-logo") && !u.Contains("assets/images"))
            .ToList();
    }

    public async Task<ForcePurgeResultDto> PurgeTenantAsync(Guid tenantId, bool isAutomatic = false, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("[TENANT PURGE] Initiating hard purge for Tenant: {TenantId}, IsAutomatic: {IsAuto}", tenantId, isAutomatic);

        var tenant = await _context.Set<Tenant>().IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant == null)
        {
            return new ForcePurgeResultDto
            {
                TenantId = tenantId,
                Success = false,
                Message = "Tenant not found."
            };
        }

        if (isAutomatic && tenant.IsCleanupExempt)
        {
            _logger.LogInformation("[TENANT PURGE] Skipped auto-purge for Tenant: {TenantId} ({Name}) because IsCleanupExempt is true.", tenantId, tenant.Name);
            return new ForcePurgeResultDto
            {
                TenantId = tenantId,
                TenantName = tenant.Name,
                Success = false,
                Message = "Tenant is exempt from automated cleanup routines."
            };
        }

        var tenantName = tenant.Name;

        // 1. Collect all storage blobs before wiping database records
        var fileUrls = await CollectTenantFileUrlsAsync(tenantId, cancellationToken);
        _logger.LogInformation("[TENANT PURGE] Collected {Count} storage blob URLs for Tenant: {TenantName} ({TenantId})", fileUrls.Count, tenantName, tenantId);

        // 2. Physical Storage Blobs Deletion (Graceful batch deletion)
        int deletedBlobsCount = 0;
        if (fileUrls.Count > 0)
        {
            try
            {
                deletedBlobsCount = await _cloudStorageService.DeleteFilesAsync(fileUrls);
                _logger.LogInformation("[TENANT PURGE] Successfully purged {Deleted}/{Total} blobs from Cloud Storage for Tenant {TenantId}", deletedBlobsCount, fileUrls.Count, tenantId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[TENANT PURGE] Cloud storage blob deletion encountered an error for Tenant: {TenantId}. Continuing with database entity purge.", tenantId);
            }
        }

        // 3. Database Entity Purging in strict FK order
        int deletedProjectsCount = 0;
        int deletedTxnsCount = 0;
        int deletedUsersCount = 0;

        try
        {
            // A. Settlement Lines
            var settlementLines = await _context.Set<SettlementLine>().IgnoreQueryFilters()
                .Where(sl => sl.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<SettlementLine>().RemoveRange(settlementLines);

            // B. Settlements
            var settlements = await _context.Set<Settlement>().IgnoreQueryFilters()
                .Where(s => s.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<Settlement>().RemoveRange(settlements);

            // C. Site Photos
            var photos = await _context.Set<SitePhoto>().IgnoreQueryFilters()
                .Where(sp => sp.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<SitePhoto>().RemoveRange(photos);

            // D. Petty Cash Vouchers
            var pettyCashes = await _context.Set<PettyCash>().IgnoreQueryFilters()
                .Where(pc => pc.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<PettyCash>().RemoveRange(pettyCashes);

            // E. Financial Transactions
            var transactions = await _context.Set<FinancialTransaction>().IgnoreQueryFilters()
                .Where(ft => ft.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            deletedTxnsCount = transactions.Count;
            _context.Set<FinancialTransaction>().RemoveRange(transactions);

            // F. Project Cash Pools
            var cashPools = await _context.Set<ProjectCashPool>().IgnoreQueryFilters()
                .Where(pcp => pcp.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<ProjectCashPool>().RemoveRange(cashPools);

            // G. Project Budget Logs
            var projects = await _context.Set<Project>().IgnoreQueryFilters()
                .Where(p => p.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            deletedProjectsCount = projects.Count;
            var projectIds = projects.Select(p => p.Id).ToList();

            if (projectIds.Count > 0)
            {
                var budgetLogs = await _context.Set<ProjectBudgetLog>().IgnoreQueryFilters()
                    .Where(bl => projectIds.Contains(bl.ProjectId))
                    .ToListAsync(cancellationToken);
                _context.Set<ProjectBudgetLog>().RemoveRange(budgetLogs);
            }

            // H. Projects
            _context.Set<Project>().RemoveRange(projects);

            // I. Notifications
            var notifications = await _context.Set<Notification>().IgnoreQueryFilters()
                .Where(n => n.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<Notification>().RemoveRange(notifications);

            // J. Subscription Transactions
            var subTxns = await _context.Set<SubscriptionTransaction>().IgnoreQueryFilters()
                .Where(st => st.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            _context.Set<SubscriptionTransaction>().RemoveRange(subTxns);

            // K. Users
            var users = await _context.Set<User>().IgnoreQueryFilters()
                .Where(u => u.TenantId == tenantId)
                .ToListAsync(cancellationToken);
            deletedUsersCount = users.Count;
            _context.Set<User>().RemoveRange(users);

            // L. Tenant entity
            _context.Set<Tenant>().Remove(tenant);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("[TENANT PURGE] Successfully purged tenant {TenantName} ({TenantId}). Deleted: {P} Projects, {T} Txns, {U} Users, {B} Blobs.",
                tenantName, tenantId, deletedProjectsCount, deletedTxnsCount, deletedUsersCount, deletedBlobsCount);

            return new ForcePurgeResultDto
            {
                TenantId = tenantId,
                TenantName = tenantName,
                DeletedFilesCount = deletedBlobsCount,
                DeletedProjectsCount = deletedProjectsCount,
                DeletedTransactionsCount = deletedTxnsCount,
                DeletedUsersCount = deletedUsersCount,
                Success = true,
                Message = $"تم حذف الشركة '{tenantName}' بالكامل وجميع مشاريعها ({deletedProjectsCount}) ومعاملاتها ({deletedTxnsCount}) ومستخدميها ({deletedUsersCount}) وحذف ({deletedBlobsCount}) ملف من التخزين السحابي.",
                PurgedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[TENANT PURGE] Critical failure during database purge for Tenant: {TenantId}", tenantId);
            return new ForcePurgeResultDto
            {
                TenantId = tenantId,
                TenantName = tenantName,
                Success = false,
                Message = $"حدث خطأ أثناء تنفيذ عملية الحذف الجذري: {ex.Message}"
            };
        }
    }

    public async Task<ExemptionToggleResponseDto> ToggleCleanupExemptionAsync(Guid tenantId, bool? isExempt = null, CancellationToken cancellationToken = default)
    {
        var tenant = await _context.Set<Tenant>().IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant == null)
        {
            throw new KeyNotFoundException($"Tenant with ID {tenantId} was not found.");
        }

        tenant.IsCleanupExempt = isExempt ?? !tenant.IsCleanupExempt;
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("[TENANT EXEMPTION] Tenant {TenantName} ({TenantId}) exemption updated to {IsExempt}",
            tenant.Name, tenantId, tenant.IsCleanupExempt);

        return new ExemptionToggleResponseDto
        {
            TenantId = tenant.Id,
            TenantName = tenant.Name,
            IsCleanupExempt = tenant.IsCleanupExempt,
            Message = tenant.IsCleanupExempt
                ? $"تم تفعيل الاستثناء للشركة '{tenant.Name}'. لن يشملها الحذف التلقائي."
                : $"تم إلغاء الاستثناء للشركة '{tenant.Name}'. أصبحت خاضعة للمسح التلقائي عند عدم النشاط."
        };
    }

    public async Task<int> RunAutomatedInactivityCleanupAsync(int inactiveDaysThreshold = 60, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;
        var thresholdDate = now.AddDays(-inactiveDaysThreshold);

        var candidateTenants = await _context.Set<Tenant>().IgnoreQueryFilters()
            .Where(t => t.SubscriptionPlan == SubscriptionPlan.Free &&
                        !t.IsCleanupExempt &&
                        (t.Status == TenantStatus.Suspended || t.Status == TenantStatus.PendingDeletion || (t.LastActiveAt ?? t.CreatedAt) < thresholdDate))
            .ToListAsync(cancellationToken);

        int purgedCount = 0;
        foreach (var tenant in candidateTenants)
        {
            try
            {
                var result = await PurgeTenantAsync(tenant.Id, isAutomatic: true, cancellationToken);
                if (result.Success)
                {
                    purgedCount++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[AUTO CLEANUP] Error auto-purging inactive Tenant: {TenantId}", tenant.Id);
            }
        }

        return purgedCount;
    }
}
