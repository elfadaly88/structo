using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IProjectAccessService
{
    Task<bool> CanViewProjectAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> CanViewProjectMembersAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> CanManageProjectMembersAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> CanManageProjectFinancialsAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> CanRequestCustodyOrSettleAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> CanCloseoutProjectAsync(ClaimsPrincipal user, Guid projectId);
    Task<bool> IsUserAssignedToProjectAsync(Guid userId, Guid projectId);
    Task<List<Guid>> GetAssignedProjectIdsForUserAsync(Guid userId);
    Task<bool> UserHasAccessToProjectAsync(ClaimsPrincipal user, Guid projectId);
}
