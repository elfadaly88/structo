using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class NotificationRecipientResolver(DbContext context) : INotificationRecipientResolver
{
    public async Task<List<Guid>> GetFinancialActionRecipientsAsync(Guid projectId, Guid tenantId, Guid? excludeUserId = null)
    {
        var recipients = new HashSet<Guid>();

        // 1. TenantOwner has implicit company-wide financial visibility across all projects
        var ownerIds = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId == tenantId && u.Role == UserRole.TenantOwner)
            .Select(u => u.Id)
            .ToListAsync();

        foreach (var id in ownerIds)
        {
            recipients.Add(id);
        }

        // 2. Assigned Accountants and ProjectManagers for this specific ProjectId
        var assignedFinancialStaffIds = await (
            from pm in context.Set<ProjectMember>().IgnoreQueryFilters().AsNoTracking()
            join u in context.Set<User>().IgnoreQueryFilters().AsNoTracking() on pm.UserId equals u.Id
            where pm.ProjectId == projectId 
                  && pm.TenantId == tenantId
                  && u.TenantId == tenantId
                  && (u.Role == UserRole.Accountant || u.Role == UserRole.Manager)
            select u.Id
        ).ToListAsync();

        foreach (var id in assignedFinancialStaffIds)
        {
            recipients.Add(id);
        }

        // 3. Exclude specified actor if any (e.g., submitter shouldn't receive action-required for their own submission)
        if (excludeUserId.HasValue)
        {
            recipients.Remove(excludeUserId.Value);
        }

        return recipients.ToList();
    }

    public async Task<List<Guid>> GetProjectMembersRecipientsAsync(Guid projectId, Guid tenantId, Guid? excludeUserId = null)
    {
        var recipients = new HashSet<Guid>();

        // 1. All explicitly assigned members of the project
        var memberIds = await context.Set<ProjectMember>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(pm => pm.ProjectId == projectId && pm.TenantId == tenantId)
            .Select(pm => pm.UserId)
            .ToListAsync();

        foreach (var id in memberIds)
        {
            recipients.Add(id);
        }

        // 2. TenantOwner is also included for project lifecycle events
        var ownerIds = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId == tenantId && u.Role == UserRole.TenantOwner)
            .Select(u => u.Id)
            .ToListAsync();

        foreach (var id in ownerIds)
        {
            recipients.Add(id);
        }

        // 3. Exclude actor if requested
        if (excludeUserId.HasValue)
        {
            recipients.Remove(excludeUserId.Value);
        }

        return recipients.ToList();
    }

    public async Task<Guid?> GetTenantOwnerIdAsync(Guid tenantId)
    {
        var owner = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId == tenantId && u.Role == UserRole.TenantOwner)
            .Select(u => (Guid?)u.Id)
            .FirstOrDefaultAsync();

        return owner;
    }
}
