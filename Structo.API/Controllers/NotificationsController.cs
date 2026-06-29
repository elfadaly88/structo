using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController(INotificationService notificationService) : ControllerBase
{
    private Guid CurrentUserId => Guid.Parse(
        User.FindFirstValue("sub") ??
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        Guid.Empty.ToString());

    private Guid? CurrentTenantId
    {
        get
        {
            var raw = User.FindFirstValue("tenantId");
            return Guid.TryParse(raw, out var id) ? id : null;
        }
    }

    /// <summary>Returns the latest 50 notifications for the current user.</summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<NotificationDto>>>> GetMyNotifications()
    {
        var notifications = await notificationService.GetMyNotificationsAsync(CurrentUserId, CurrentTenantId);
        return Ok(new ApiResponse<List<NotificationDto>> { Data = notifications, Success = true });
    }

    /// <summary>Marks a notification as read.</summary>
    [HttpPost("{id}/mark-read")]
    public async Task<ActionResult<ApiResponse<bool>>> MarkAsRead(Guid id)
    {
        await notificationService.MarkAsReadAsync(id, CurrentUserId);
        return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = "Marked as read." });
    }

    /// <summary>Send a notification — SuperAdmin only via Swagger/internal tooling.</summary>
    [HttpPost("send")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult<ApiResponse<bool>>> Send([FromBody] SendNotificationDto dto)
    {
        await notificationService.SendAsync(dto);
        return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = "Notification sent." });
    }
}
