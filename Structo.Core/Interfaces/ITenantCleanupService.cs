using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Structo.Core.DTOs.Tenants;

namespace Structo.Core.Interfaces;

public interface ITenantCleanupService
{
    Task<TenantLifecycleSummaryDto> GetLifecycleSummaryAsync(CancellationToken cancellationToken = default);
    Task<AdminTenantPagedResultDto> GetAdminTenantsAsync(AdminTenantQueryDto query, CancellationToken cancellationToken = default);
    Task<ForcePurgeResultDto> PurgeTenantAsync(Guid tenantId, bool isAutomatic = false, CancellationToken cancellationToken = default);
    Task<List<string>> CollectTenantFileUrlsAsync(Guid tenantId, CancellationToken cancellationToken = default);
    Task<ExemptionToggleResponseDto> ToggleCleanupExemptionAsync(Guid tenantId, bool? isExempt = null, CancellationToken cancellationToken = default);
    Task<int> RunAutomatedInactivityCleanupAsync(int inactiveDaysThreshold = 60, CancellationToken cancellationToken = default);
}
