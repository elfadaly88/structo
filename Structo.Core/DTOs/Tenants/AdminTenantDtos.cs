using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Tenants;

public class TenantLifecycleSummaryDto
{
    public int TotalTenants { get; set; }
    public int ActiveCount { get; set; }
    public int SuspendedCount { get; set; }
    public int PendingDeletionCount { get; set; }
    public int FreeTenantsCount { get; set; }
    public int ProTenantsCount { get; set; }
    public int InactiveOver45DaysCount { get; set; }
    public int TotalProjectsCount { get; set; }
    public double TotalStorageFootprintMb { get; set; }
    public double EstimatedPurgedStorageMb { get; set; }
}

public class AdminTenantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string PlanType { get; set; } = string.Empty;
    public int MaxActiveProjects { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastActiveAt { get; set; }
    public int DaysInactive { get; set; }
    public double StorageFootprintMb { get; set; }
    public bool IsCleanupExempt { get; set; }
    public int TotalProjects { get; set; }
    public int TotalUsers { get; set; }
    public string? AdminEmail { get; set; }
    public string? AdminName { get; set; }
    public string? Region { get; set; }
    public string? LogoUrl { get; set; }
}

public class AdminTenantQueryDto
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? StatusFilter { get; set; }
    public string? PlanFilter { get; set; }
    public bool? OnlyInactiveOver45Days { get; set; }
}

public class AdminTenantPagedResultDto
{
    public List<AdminTenantDto> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => PageSize > 0 ? (int)Math.Ceiling((double)TotalCount / PageSize) : 0;
}

public class ForcePurgeResultDto
{
    public Guid TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public int DeletedFilesCount { get; set; }
    public int DeletedProjectsCount { get; set; }
    public int DeletedTransactionsCount { get; set; }
    public int DeletedUsersCount { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime PurgedAt { get; set; } = DateTime.UtcNow;
}

public class ExemptionToggleRequestDto
{
    public bool? IsExempt { get; set; }
}

public class ExemptionToggleResponseDto
{
    public Guid TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public bool IsCleanupExempt { get; set; }
    public string Message { get; set; } = string.Empty;
}
