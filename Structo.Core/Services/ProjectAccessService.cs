using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class ProjectAccessService(DbContext context) : IProjectAccessService
{
    private static (bool IsValid, Guid UserId, Guid TenantId, UserRole Role) ExtractUserContext(ClaimsPrincipal user)
    {
        if (user?.Identity?.IsAuthenticated != true)
            return (false, Guid.Empty, Guid.Empty, default);

        var userIdClaim = user.FindFirst("sub")?.Value 
            ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value 
            ?? user.FindFirst("uid")?.Value;
            
        var tenantIdClaim = user.FindFirst("tenantId")?.Value 
            ?? user.FindFirst("TenantId")?.Value;
        var roleClaim = user.FindFirst("role")?.Value 
            ?? user.FindFirst(ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return (false, Guid.Empty, Guid.Empty, default);

        if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<UserRole>(roleClaim, true, out var role))
            return (false, Guid.Empty, Guid.Empty, default);

        // SuperAdmin has no tenant
        if (role == UserRole.SuperAdmin)
            return (true, userId, Guid.Empty, role);

        if (string.IsNullOrEmpty(tenantIdClaim) || !Guid.TryParse(tenantIdClaim, out var tenantId))
            return (false, Guid.Empty, Guid.Empty, default);

        return (true, userId, tenantId, role);
    }

    public async Task<bool> IsUserAssignedToProjectAsync(Guid userId, Guid projectId)
    {
        return await context.Set<ProjectMember>()
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);
    }

    public async Task<List<Guid>> GetAssignedProjectIdsForUserAsync(Guid userId)
    {
        return await context.Set<ProjectMember>()
            .Where(pm => pm.UserId == userId)
            .Select(pm => pm.ProjectId)
            .ToListAsync();
    }

    public async Task<bool> CanViewProjectAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, userId, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        if (role == UserRole.SuperAdmin)
        {
            return await context.Set<Project>().IgnoreQueryFilters().AnyAsync(p => p.Id == projectId);
        }

        if (role == UserRole.TenantOwner)
        {
            return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }

        // ProjectManager (Manager), Accountant, SiteEngineer, DesignEngineer: must be assigned
        var projectExists = await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (!projectExists) return false;

        return await IsUserAssignedToProjectAsync(userId, projectId);
    }

    public async Task<bool> CanViewProjectMembersAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, userId, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        // Privacy wall: SuperAdmin is strictly blocked from viewing tenant employee roster
        if (role == UserRole.SuperAdmin)
            return false;

        if (role == UserRole.TenantOwner)
        {
            return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }

        // Assigned members can view their own project team
        var projectExists = await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (!projectExists) return false;

        return await IsUserAssignedToProjectAsync(userId, projectId);
    }

    public async Task<bool> CanManageProjectMembersAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, userId, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        // Only TenantOwner or assigned ProjectManager
        if (role == UserRole.TenantOwner)
        {
            return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }

        if (role == UserRole.Manager)
        {
            var projectExists = await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
            if (!projectExists) return false;

            return await IsUserAssignedToProjectAsync(userId, projectId);
        }

        return false;
    }

    public async Task<bool> CanManageProjectFinancialsAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, userId, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        // SuperAdmin is strictly blocked by privacy wall
        if (role == UserRole.SuperAdmin)
            return false;

        if (role == UserRole.TenantOwner)
        {
            return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }

        if (role == UserRole.Manager || role == UserRole.Accountant)
        {
            var projectExists = await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
            if (!projectExists) return false;

            return await IsUserAssignedToProjectAsync(userId, projectId);
        }

        return false;
    }

    public async Task<bool> CanRequestCustodyOrSettleAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, userId, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        if (role == UserRole.SuperAdmin)
            return false;

        if (role == UserRole.TenantOwner)
        {
            return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
        }

        // All assigned tenant roles can request/spend/settle custody & upload site photos
        if (role == UserRole.Manager || role == UserRole.Accountant || role == UserRole.SiteEngineer || role == UserRole.DesignEngineer)
        {
            var projectExists = await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
            if (!projectExists) return false;

            return await IsUserAssignedToProjectAsync(userId, projectId);
        }

        return false;
    }

    public async Task<bool> CanCloseoutProjectAsync(ClaimsPrincipal user, Guid projectId)
    {
        var (isValid, _, tenantId, role) = ExtractUserContext(user);
        if (!isValid) return false;

        // Final closeout is strictly TenantOwner only
        if (role != UserRole.TenantOwner)
            return false;

        return await context.Set<Project>().AnyAsync(p => p.Id == projectId && p.TenantId == tenantId);
    }

    public Task<bool> UserHasAccessToProjectAsync(ClaimsPrincipal user, Guid projectId)
    {
        return CanViewProjectAsync(user, projectId);
    }
}
