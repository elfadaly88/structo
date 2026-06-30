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

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController(IProjectService projectService) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProjectDto>>>> GetAll([FromQuery] Guid? tenantId = null)
    {
        try
        {
            var projects = await projectService.GetAllProjectsAsync(tenantId, CurrentUserRole);
            return Ok(new ApiResponse<List<ProjectDto>> { Data = projects, CurrentUserRole = CurrentUserRole });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new ApiResponse<List<ProjectDto>> { Success = false, Message = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin,TenantOwner,Manager")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Create([FromBody] ProjectCreateDto dto)
    {
        var (success, data, message) = await projectService.CreateProjectAsync(dto, CurrentUserRole);

        if (!success)
        {
            if (message.Contains("claim missing") || message.Contains("required"))
            {
                return Unauthorized(new ApiResponse<ProjectDto> { Success = false, Message = message });
            }
            return BadRequest(new ApiResponse<ProjectDto> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<ProjectDto> { Data = data, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> GetById([FromRoute] Guid id)
    {
        var project = await projectService.GetProjectByIdAsync(id);

        if (project == null)
            return NotFound(new ApiResponse<ProjectDto> { Success = false, Message = "Project not found" });

        return Ok(new ApiResponse<ProjectDto> { Data = project, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}/client-view")]
    public async Task<ActionResult<ApiResponse<ProjectClientViewDto>>> GetClientView([FromRoute] Guid id)
    {
        var project = await projectService.GetProjectClientViewAsync(id);

        if (project == null)
            return NotFound(new ApiResponse<ProjectClientViewDto> { Success = false, Message = "Project not found" });

        return Ok(new ApiResponse<ProjectClientViewDto>
        {
            Data = project,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpPost("{id}/budget-revision")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> ReviseBudget(
        [FromRoute] Guid id,
        [FromBody] ProjectBudgetRevisionDto dto)
    {
        var (success, message) = await projectService.ReviseBudgetAsync(id, dto);

        if (!success)
            return NotFound(new ApiResponse<bool> { Success = false, Message = message });

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}/budget-history")]
    public async Task<ActionResult<ApiResponse<List<ProjectBudgetLog>>>> GetBudgetHistory([FromRoute] Guid id)
    {
        var logs = await projectService.GetBudgetHistoryAsync(id);
        return Ok(new ApiResponse<List<ProjectBudgetLog>> { Data = logs, CurrentUserRole = CurrentUserRole });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "SuperAdmin,TenantOwner,Manager")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Update([FromRoute] Guid id, [FromBody] ProjectCreateDto dto)
    {
        var (success, data, message) = await projectService.UpdateProjectAsync(id, dto, CurrentUserRole);

        if (!success)
        {
            return BadRequest(new ApiResponse<ProjectDto> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<ProjectDto> { Data = data, Message = message, CurrentUserRole = CurrentUserRole });
    }
}

