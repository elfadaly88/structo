using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Hubs;

/// <summary>
/// SignalR hub for real-time notifications.
/// Each connecting user is added to TWO groups for strict isolation:
///   1. Group(TenantId) — broadcasts to all tenant members.
///   2. Group(UserId)   — broadcasts to a specific user only.
/// SuperAdmins (no TenantId) are added to a dedicated "SuperAdmin" group.
/// </summary>
[Authorize]
public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirstValue("sub")
                  ?? Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        var tenantId = Context.User?.FindFirstValue("tenantId");
        var role = Context.User?.FindFirstValue(ClaimTypes.Role)
                ?? Context.User?.FindFirstValue("role");

        if (string.Equals(role, "SuperAdmin", System.StringComparison.OrdinalIgnoreCase))
        {
            // SuperAdmin only joins the "SuperAdmin" global group
            await Groups.AddToGroupAsync(Context.ConnectionId, "SuperAdmin");
        }
        else
        {
            // Tenant users join their specific tenant group, role-scoped group, and personal group
            if (!string.IsNullOrEmpty(tenantId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, tenantId);
                if (!string.IsNullOrEmpty(role))
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, $"{tenantId}_{role}");
                }
            }
            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }
        }

        await base.OnConnectedAsync();
    }

    public async Task JoinTenantGroup(string requestedTenantId)
    {
        var tenantIdClaim = Context.User?.FindFirstValue("tenantId");
        var role = Context.User?.FindFirstValue(ClaimTypes.Role) ?? Context.User?.FindFirstValue("role");

        bool isSuperAdmin = string.Equals(role, "SuperAdmin", System.StringComparison.OrdinalIgnoreCase);

        if (!isSuperAdmin && !string.Equals(requestedTenantId, tenantIdClaim, System.StringComparison.OrdinalIgnoreCase))
        {
            throw new HubException("UNAUTHORIZED_TENANT_GROUP_JOIN: Cannot join real-time notification groups of another tenant.");
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, requestedTenantId);
    }

    public override async Task OnDisconnectedAsync(System.Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }
}
