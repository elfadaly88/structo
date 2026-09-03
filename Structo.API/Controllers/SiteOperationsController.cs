using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.SiteOperations;
using Structo.Core.Interfaces;

namespace Structo.API.Controllers;

[ApiController]
public class SiteOperationsController(
    ISiteExecutionService siteExecutionService,
    IProjectAccessService projectAccessService) : ControllerBase
{
    private Guid CurrentTenantId
    {
        get
        {
            var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId" || c.Type == "TenantId");
            return (tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var tenantId)) 
                ? tenantId 
                : Guid.Empty;
        }
    }

    [HttpGet("api/projects/{projectId}/assigned-engineers")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer,Accountant")]
    public async Task<ActionResult<ApiResponse<List<AssignedEngineerDto>>>> GetAssignedEngineers([FromRoute] Guid projectId)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, projectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<List<AssignedEngineerDto>> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        var engineers = await siteExecutionService.GetAssignedEngineersAsync(projectId, CurrentTenantId);
        return Ok(new ApiResponse<List<AssignedEngineerDto>>
        {
            Success = true,
            Data = engineers
        });
    }

    [HttpGet("api/projects/{projectId}/site-tasks")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer,Accountant")]
    public async Task<ActionResult<ApiResponse<ProjectSiteTasksResponseDto>>> GetProjectSiteTasks([FromRoute] Guid projectId)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, projectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<ProjectSiteTasksResponseDto> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        try
        {
            var response = await siteExecutionService.GetProjectSiteTasksAsync(projectId, CurrentTenantId);
            return Ok(new ApiResponse<ProjectSiteTasksResponseDto>
            {
                Success = true,
                Data = response
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ApiResponse<ProjectSiteTasksResponseDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    [HttpGet("api/projects/{projectId}/available-settlement-items")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer,Accountant")]
    public async Task<ActionResult<ApiResponse<List<AvailableSettlementLineDto>>>> GetAvailableSettlementItems([FromRoute] Guid projectId)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, projectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<List<AvailableSettlementLineDto>> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        var items = await siteExecutionService.GetAvailableSettlementLinesAsync(projectId, CurrentTenantId);
        return Ok(new ApiResponse<List<AvailableSettlementLineDto>>
        {
            Success = true,
            Data = items
        });
    }

    [HttpPost("api/site-tasks")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer")]
    public async Task<ActionResult<ApiResponse<SiteTaskDto>>> CreateSiteTask([FromBody] SiteTaskCreateDto dto)
    {
        if (!await projectAccessService.CanManageProjectMembersAsync(User, dto.ProjectId) &&
            !await projectAccessService.CanViewProjectAsync(User, dto.ProjectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<SiteTaskDto> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        var (success, message, task) = await siteExecutionService.CreateSiteTaskAsync(dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<SiteTaskDto>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<SiteTaskDto>
        {
            Success = true,
            Message = message,
            Data = task
        });
    }

    [HttpPatch("api/site-tasks/{id}/progress")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer")]
    public async Task<ActionResult<ApiResponse<bool>>> UpdateProgress(
        [FromRoute] Guid id, 
        [FromBody] SiteTaskProgressUpdateDto dto)
    {
        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<bool> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        var (success, message) = await siteExecutionService.UpdateTaskProgressAsync(id, dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<bool>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<bool>
        {
            Success = true,
            Message = message,
            Data = true
        });
    }

    [HttpPost("api/site-tasks/{id}/link-settlement-items")]
    [Authorize(Roles = "TenantOwner,Manager,Accountant,SiteEngineer")]
    public async Task<ActionResult<ApiResponse<bool>>> LinkSettlementItems(
        [FromRoute] Guid id, 
        [FromBody] LinkSettlementItemsDto dto)
    {
        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<bool> 
            { 
                Success = false, 
                Message = "Tenant ID claim missing or invalid." 
            });
        }

        var (success, message) = await siteExecutionService.LinkSettlementItemsAsync(id, dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<bool>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<bool>
        {
            Success = true,
            Message = message,
            Data = true
        });
    }

    [HttpGet("api/public/project-tracker/{shareToken}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<PublicProjectTrackerDto>>> GetPublicProjectTracker([FromRoute] string shareToken)
    {
        var tracker = await siteExecutionService.GetPublicProjectTrackerAsync(shareToken);
        if (tracker == null)
        {
            return NotFound(new ApiResponse<PublicProjectTrackerDto>
            {
                Success = false,
                Message = "رابط متابعة المشروع غير صالح أو غير متاح."
            });
        }

        return Ok(new ApiResponse<PublicProjectTrackerDto>
        {
            Success = true,
            Data = tracker
        });
    }

    [HttpGet("api/projects/{projectId}/daily-logs")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer,Accountant")]
    public async Task<ActionResult<ApiResponse<List<SiteDailyLogDto>>>> GetDailyLogs([FromRoute] Guid projectId)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, projectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<List<SiteDailyLogDto>>
            {
                Success = false,
                Message = "Tenant ID claim missing or invalid."
            });
        }

        var logs = await siteExecutionService.GetDailyLogsAsync(projectId, CurrentTenantId);
        return Ok(new ApiResponse<List<SiteDailyLogDto>>
        {
            Success = true,
            Data = logs
        });
    }

    [HttpPost("api/projects/{projectId}/daily-logs")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer")]
    public async Task<ActionResult<ApiResponse<SiteDailyLogDto>>> UpsertDailyLog(
        [FromRoute] Guid projectId, 
        [FromBody] SiteDailyLogUpsertDto dto)
    {
        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<SiteDailyLogDto>
            {
                Success = false,
                Message = "Tenant ID claim missing or invalid."
            });
        }

        dto.ProjectId = projectId;

        var (success, message, log) = await siteExecutionService.UpsertDailyLogAsync(dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<SiteDailyLogDto>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<SiteDailyLogDto>
        {
            Success = true,
            Message = message,
            Data = log
        });
    }

    [HttpGet("api/projects/{projectId}/punch-list")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer,Accountant")]
    public async Task<ActionResult<ApiResponse<List<SitePunchItemDto>>>> GetPunchList(
        [FromRoute] Guid projectId, 
        [FromQuery] Structo.Core.Entities.PunchItemStatus? status = null)
    {
        if (!await projectAccessService.CanViewProjectAsync(User, projectId))
        {
            return Forbid();
        }

        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<List<SitePunchItemDto>>
            {
                Success = false,
                Message = "Tenant ID claim missing or invalid."
            });
        }

        var items = await siteExecutionService.GetPunchListAsync(projectId, status, CurrentTenantId);
        return Ok(new ApiResponse<List<SitePunchItemDto>>
        {
            Success = true,
            Data = items
        });
    }

    [HttpPost("api/projects/{projectId}/punch-list")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer")]
    public async Task<ActionResult<ApiResponse<SitePunchItemDto>>> CreatePunchItem(
        [FromRoute] Guid projectId, 
        [FromBody] SitePunchItemCreateDto dto)
    {
        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<SitePunchItemDto>
            {
                Success = false,
                Message = "Tenant ID claim missing or invalid."
            });
        }

        dto.ProjectId = projectId;

        var (success, message, item) = await siteExecutionService.CreatePunchItemAsync(dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<SitePunchItemDto>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<SitePunchItemDto>
        {
            Success = true,
            Message = message,
            Data = item
        });
    }

    [HttpPatch("api/punch-list/{id}/status")]
    [Authorize(Roles = "TenantOwner,Manager,SiteEngineer,DesignEngineer")]
    public async Task<ActionResult<ApiResponse<bool>>> UpdatePunchItemStatus(
        [FromRoute] Guid id, 
        [FromBody] SitePunchItemStatusUpdateDto dto)
    {
        if (CurrentTenantId == Guid.Empty)
        {
            return Unauthorized(new ApiResponse<bool>
            {
                Success = false,
                Message = "Tenant ID claim missing or invalid."
            });
        }

        var (success, message) = await siteExecutionService.UpdatePunchItemStatusAsync(id, dto, CurrentTenantId, User);
        if (!success)
        {
            return BadRequest(new ApiResponse<bool>
            {
                Success = false,
                Message = message
            });
        }

        return Ok(new ApiResponse<bool>
        {
            Success = true,
            Message = message,
            Data = true
        });
    }
}
