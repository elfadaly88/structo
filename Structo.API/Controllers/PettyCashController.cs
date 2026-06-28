using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.Exceptions;
using Structo.Core.Interfaces;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,Accountant,SiteEngineer,DesignEngineer")]
public class PettyCashController(IPettyCashService pettyCashService) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] PettyCashCreateDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        Guid? tenantId = tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var parsedId) ? parsedId : null;

        var (success, message) = await pettyCashService.CreatePettyCashAsync(projectId, dto, tenantId, CurrentUserRole);

        if (!success)
        {
            if (message.Contains("claim missing"))
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Approve([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashApproveDto dto)
    {
        var (success, message) = await pettyCashService.ApprovePettyCashAsync(projectId, id, dto);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Reject([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashRejectDto dto)
    {
        var (success, message) = await pettyCashService.RejectPettyCashAsync(projectId, id, dto);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/settle")]
    public async Task<ActionResult<ApiResponse<bool>>> Settle([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashSettleDto dto)
    {
        try
        {
            var result = await pettyCashService.SettlePettyCashAsync(projectId, id, dto);
            return Ok(new ApiResponse<bool>
            {
                Data = result,
                Message = "Petty cash successfully settled.",
                CurrentUserRole = CurrentUserRole
            });
        }
        catch (BusinessRuleException ex)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("mobile")]
    public async Task<ActionResult<ApiResponse<PaginatedList<PettyCashMobileDto>>>> GetMobilePettyCash(
        [FromRoute] Guid projectId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var data = await pettyCashService.GetMobilePettyCashAsync(projectId, pageNumber, pageSize);
        return Ok(new ApiResponse<PaginatedList<PettyCashMobileDto>>
        {
            Data = data,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Update(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id,
        [FromBody] PettyCashUpdateDto dto)
    {
        var (success, message) = await pettyCashService.UpdatePettyCashAsync(projectId, id, dto);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id)
    {
        var (success, message) = await pettyCashService.DeletePettyCashAsync(projectId, id);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }
}
