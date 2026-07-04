using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Settlements;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,Accountant,SiteEngineer,DesignEngineer")]
public class SettlementsController(ISettlementService settlementService) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
    private Guid CurrentUserId
    {
        get
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                ?? User.FindFirstValue("sub") 
                ?? User.FindFirstValue("uid");
            return Guid.TryParse(idClaim, out var parsed) ? parsed : Guid.Empty;
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Guid>>> Create([FromRoute] Guid projectId, [FromBody] SettlementCreateDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<Guid> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var (success, message, settlementId) = await settlementService.CreateSettlementAsync(projectId, dto, tenantId);

        if (!success)
        {
            return BadRequest(new ApiResponse<Guid> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<Guid> { Data = settlementId, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Approve([FromRoute] Guid projectId, [FromRoute] Guid id)
    {
        var (success, message) = await settlementService.ApproveSettlementAsync(projectId, id, CurrentUserRole, CurrentUserId);

        if (!success)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/confirm-refund")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> ConfirmRefund([FromRoute] Guid projectId, [FromRoute] Guid id)
    {
        var (success, message) = await settlementService.ConfirmRefundAsync(projectId, id, CurrentUserRole);

        if (!success)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Reject([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] SettlementRejectDto dto)
    {
        var (success, message) = await settlementService.RejectSettlementAsync(projectId, id, dto, CurrentUserRole, CurrentUserId);

        if (!success)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<SettlementMobileDto>>>> GetSettlements([FromRoute] Guid projectId)
    {
        var data = await settlementService.GetSettlementsAsync(projectId);
        return Ok(new ApiResponse<IEnumerable<SettlementMobileDto>>
        {
            Data = data,
            CurrentUserRole = CurrentUserRole
        });
    }
}
