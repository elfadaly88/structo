using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Projects;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Structo.Infrastructure.Data;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController(
    IProjectService projectService, 
    IProjectAccessService projectAccessService,
    ITenantContextAccessor tenantContextAccessor, 
    StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
    private Guid? CurrentTenantId => tenantContextAccessor.GetCurrentTenantId();
    private Guid CurrentUserId => Guid.Parse(
        User.FindFirstValue("sub") ??
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        User.FindFirstValue("uid") ??
        Guid.Empty.ToString());

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProjectDto>>>> GetAll([FromQuery] Guid? tenantId = null)
    {
        try
        {
            var projects = await projectService.GetAllProjectsAsync(tenantId, CurrentUserRole, CurrentUserId);
            return Ok(new ApiResponse<List<ProjectDto>> { Data = projects, CurrentUserRole = CurrentUserRole });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new ApiResponse<List<ProjectDto>> { Success = false, Message = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "TenantOwner")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Create([FromBody] ProjectCreateDto dto)
    {
        var (success, data, message) = await projectService.CreateProjectAsync(dto, CurrentUserRole, CurrentUserId);

        if (!success)
        {
            if (message.Contains("claim missing") || message.Contains("required"))
                return Unauthorized(new ApiResponse<ProjectDto> { Success = false, Message = message });
            return BadRequest(new ApiResponse<ProjectDto> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<ProjectDto> { Data = data, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> GetById([FromRoute] Guid id)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, id))
        {
            return Forbid();
        }

        var project = await projectService.GetProjectByIdAsync(id);

        if (project == null)
            return NotFound(new ApiResponse<ProjectDto> { Success = false, Message = "Project not found" });

        if (project.Status == "PendingActivation" && CurrentUserRole != "SuperAdmin")
        {
            return Forbid();
        }

        if (CurrentUserRole == "SuperAdmin")
            project.Description = string.Empty;

        return Ok(new ApiResponse<ProjectDto> { Data = project, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}/client-view")]
    public async Task<ActionResult<ApiResponse<ProjectClientViewDto>>> GetClientView([FromRoute] Guid id)
    {
        var project = await projectService.GetProjectClientViewAsync(id);

        if (project == null)
            return NotFound(new ApiResponse<ProjectClientViewDto> { Success = false, Message = "Project not found" });

        return Ok(new ApiResponse<ProjectClientViewDto> { Data = project, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/budget-revision")]
    public async Task<ActionResult<ApiResponse<bool>>> ReviseBudget([FromRoute] Guid id, [FromBody] ProjectBudgetRevisionDto dto)
    {
        if (!await projectAccessService.CanManageProjectFinancialsAsync(User, id))
        {
            return Forbid();
        }

        var (success, message) = await projectService.ReviseBudgetAsync(id, dto);

        if (!success)
            return NotFound(new ApiResponse<bool> { Success = false, Message = message });

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}/budget-history")]
    public async Task<ActionResult<ApiResponse<List<ProjectBudgetLog>>>> GetBudgetHistory([FromRoute] Guid id)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, id))
        {
            return Forbid();
        }

        var logs = await projectService.GetBudgetHistoryAsync(id);
        return Ok(new ApiResponse<List<ProjectBudgetLog>> { Data = logs, CurrentUserRole = CurrentUserRole });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Update([FromRoute] Guid id, [FromBody] ProjectCreateDto dto)
    {
        if (!await projectAccessService.CanManageProjectMembersAsync(User, id))
        {
            return Forbid();
        }

        var (success, data, message) = await projectService.UpdateProjectAsync(id, dto, CurrentUserRole, CurrentUserId);

        if (!success)
            return BadRequest(new ApiResponse<ProjectDto> { Success = false, Message = message });

        return Ok(new ApiResponse<ProjectDto> { Data = data, Message = message, CurrentUserRole = CurrentUserRole });
    }

    // =====================================================================
    // TEAM MEMBER MANAGEMENT ENDPOINTS
    // =====================================================================

    [HttpGet("{id}/members")]
    public async Task<ActionResult<ApiResponse<List<ProjectMemberDto>>>> GetMembers([FromRoute] Guid id)
    {
        if (!await projectAccessService.CanViewProjectMembersAsync(User, id))
        {
            return Forbid();
        }

        var members = await projectService.GetProjectMembersAsync(id);
        return Ok(new ApiResponse<List<ProjectMemberDto>> { Data = members, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/members")]
    public async Task<ActionResult<ApiResponse<List<ProjectMemberDto>>>> AddMembers([FromRoute] Guid id, [FromBody] ProjectMemberAssignDto dto)
    {
        if (!await projectAccessService.CanManageProjectMembersAsync(User, id))
        {
            return Forbid();
        }

        var tenantId = CurrentTenantId;
        if (!tenantId.HasValue)
        {
            return Unauthorized(new ApiResponse<List<ProjectMemberDto>> { Success = false, Message = "Tenant context missing." });
        }

        var (success, message, addedMembers) = await projectService.AddProjectMembersAsync(id, dto.UserIds, CurrentUserId, tenantId.Value);

        if (!success)
        {
            if (message.Contains("DUPLICATE_MEMBER"))
            {
                return Conflict(new ApiResponse<List<ProjectMemberDto>> { Success = false, Message = message });
            }
            return BadRequest(new ApiResponse<List<ProjectMemberDto>> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<List<ProjectMemberDto>> { Data = addedMembers ?? [], Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpDelete("{id}/members/{userId}")]
    public async Task<ActionResult<ApiResponse<bool>>> RemoveMember([FromRoute] Guid id, [FromRoute] Guid userId)
    {
        if (!await projectAccessService.CanManageProjectMembersAsync(User, id))
        {
            return Forbid();
        }

        var tenantId = CurrentTenantId;
        if (!tenantId.HasValue)
        {
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant context missing." });
        }

        var (success, message) = await projectService.RemoveProjectMemberAsync(id, userId, tenantId.Value);

        if (!success)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    // =====================================================================
    // CLOSEOUT ENDPOINTS
    // =====================================================================

    [HttpGet("{id}/reconciliation-report")]
    public async Task<ActionResult<ApiResponse<ProjectReconciliationReportDto>>> GetReconciliationReport([FromRoute] Guid id)
    {
        if (!await projectAccessService.CanManageProjectFinancialsAsync(User, id))
        {
            return Forbid();
        }

        var tenantId = CurrentTenantId;
        if (tenantId == null)
            return Unauthorized(new ApiResponse<ProjectReconciliationReportDto> { Success = false, Message = "Tenant context missing." });

        var report = await projectService.GetReconciliationReportAsync(id, tenantId.Value);
        if (report == null)
            return NotFound(new ApiResponse<ProjectReconciliationReportDto> { Success = false, Message = "Project not found." });

        return Ok(new ApiResponse<ProjectReconciliationReportDto> { Data = report, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/freeze")]
    public async Task<ActionResult<ApiResponse<bool>>> FreezeProject([FromRoute] Guid id)
    {
        if (!await projectAccessService.CanManageProjectFinancialsAsync(User, id))
        {
            return Forbid();
        }

        var tenantId = CurrentTenantId;
        if (tenantId == null)
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant context missing." });

        try
        {
            var (success, message) = await projectService.FreezeProjectAsync(id, tenantId.Value, CurrentUserRole, CurrentUserId);
            if (!success) return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [HttpPost("{id}/final-closeout")]
    public async Task<ActionResult<ApiResponse<bool>>> FinalCloseout([FromRoute] Guid id, [FromBody] FinalCloseoutRequestDto? dto = null)
    {
        if (!await projectAccessService.CanCloseoutProjectAsync(User, id))
        {
            return Forbid();
        }

        var tenantId = CurrentTenantId;
        if (tenantId == null)
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant context missing." });

        try
        {
            var (success, message) = await projectService.FinalCloseoutAsync(id, tenantId.Value, CurrentUserRole, CurrentUserId, dto);
            if (!success) return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [HttpPost("/api/superadmin/reviews/{reviewId}/toggle-visibility")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult<ApiResponse<bool>>> ToggleReviewVisibility([FromRoute] Guid reviewId)
    {
        var project = await context.Projects.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == reviewId);
        if (project == null)
        {
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Review/Project not found." });
        }

        project.IsReviewHidden = !project.IsReviewHidden;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool>
        {
            Data = project.IsReviewHidden,
            Success = true,
            Message = $"Review visibility has been toggled. Hidden status is now: {project.IsReviewHidden}."
        });
    }
}
