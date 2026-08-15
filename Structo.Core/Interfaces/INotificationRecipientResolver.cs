using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface INotificationRecipientResolver
{
    /// <summary>
    /// Resolves recipients for financial actions (Petty cash, Settlement submissions):
    /// Returns assigned Accountants and ProjectManagers for the specific ProjectId,
    /// plus the TenantOwner (who receives notifications across all projects in their tenant).
    /// Strictly excludes SuperAdmin (privacy wall) and optionally excludes the actor.
    /// </summary>
    Task<List<Guid>> GetFinancialActionRecipientsAsync(Guid projectId, Guid tenantId, Guid? excludeUserId = null);

    /// <summary>
    /// Resolves all active members assigned to a project (for project status changes like freeze/closeout).
    /// Strictly excludes SuperAdmin and optionally excludes the actor.
    /// </summary>
    Task<List<Guid>> GetProjectMembersRecipientsAsync(Guid projectId, Guid tenantId, Guid? excludeUserId = null);

    /// <summary>
    /// Resolves the TenantOwner's UserId for a specific tenant.
    /// </summary>
    Task<Guid?> GetTenantOwnerIdAsync(Guid tenantId);
}
