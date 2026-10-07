using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

/// <summary>SuperAdmin review of manual (InstaPay) payment requests.</summary>
[ApiController]
[Route("api/superadmin/payment-requests")]
[Authorize(Roles = "SuperAdmin")]
public class AdminPaymentRequestsController(IManualPaymentService manualPayments) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ManualPaymentRequestDto>>>> List() =>
        Ok(new ApiResponse<IReadOnlyList<ManualPaymentRequestDto>> { Data = await manualPayments.GetAllForAdminAsync() });

    [HttpPost("{id:guid}/approve")]
    public async Task<ActionResult<ApiResponse<object>>> Approve(Guid id) =>
        ToResponse(await manualPayments.ApproveAsync(id, CurrentUserId));

    [HttpPost("{id:guid}/reject")]
    public async Task<ActionResult<ApiResponse<object>>> Reject(Guid id, [FromBody] RejectManualPaymentRequestDto dto) =>
        ToResponse(await manualPayments.RejectAsync(id, CurrentUserId, dto.Reason, dto.AdminNote));

    private Guid CurrentUserId =>
        Guid.TryParse(User.FindFirstValue("sub") ?? User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : Guid.Empty;

    private ActionResult<ApiResponse<object>> ToResponse(ManualPaymentResult result)
    {
        var body = new ApiResponse<object> { Success = result.Success, Message = result.Message };
        return result.Outcome switch
        {
            ManualPaymentOutcome.Ok => Ok(body),
            ManualPaymentOutcome.NotFound => NotFound(body),
            ManualPaymentOutcome.Conflict => Conflict(body),
            _ => BadRequest(body)
        };
    }
}
