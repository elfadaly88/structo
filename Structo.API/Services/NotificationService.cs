using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Structo.API.Hubs;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Structo.API.Services;

/// <summary>
/// Orchestrates: 1) DB persistence → 2) SignalR real-time push → 3) OneSignal push notification.
/// All three happen on every SendAsync call so no notifications are ever silently dropped.
/// </summary>
public class NotificationService : INotificationService
{
    private readonly StructoDbContext _db;
    private readonly IHubContext<NotificationHub> _hubContext;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _oneSignalAppId;
    private readonly string _oneSignalRestApiKey;

    public NotificationService(
        StructoDbContext db,
        IHubContext<NotificationHub> hubContext,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _db = db;
        _hubContext = hubContext;
        _httpClientFactory = httpClientFactory;
        _oneSignalAppId = configuration["OneSignal:AppId"] ?? string.Empty;
        _oneSignalRestApiKey = configuration["OneSignal:RestApiKey"] ?? string.Empty;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────────────────

    public async Task SendAsync(SendNotificationDto dto)
    {
        // 1. Persist to DB (bypass global query filter — IgnoreQueryFilters not needed here
        //    because we directly use StructoDbContext and Notification has no query filter yet)
        var notification = new Notification
        {
            TenantId   = dto.TenantId,
            ReceiverId = dto.ReceiverId,
            TargetRole = dto.TargetRole,
            Title      = dto.Title,
            Message    = dto.Message,
            Type       = dto.Type,
            DeepLink   = dto.DeepLink,
            CreatedAt  = DateTime.UtcNow
        };
        _db.Notifications.Add(notification);
        await _db.SaveChangesAsync();

        var notificationDto = MapToDto(notification);

        // 2. SignalR real-time broadcast
        await BroadcastSignalRAsync(dto, notificationDto);

        // 3. OneSignal push (fire-and-forget, never block the caller on failures)
        _ = Task.Run(() => SendOneSignalAsync(dto));
    }

    public async Task<List<NotificationDto>> GetMyNotificationsAsync(Guid userId, Guid? tenantId)
    {
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return [];

        var query = _db.Notifications.AsNoTracking();

        // Return notifications addressed personally to this user
        // OR broadcast to the whole tenant (ReceiverId == null, TenantId matches)
        // OR broadcast by role — role filtering is done in memory for simplicity
        var notifications = await query
            .Where(n =>
                n.ReceiverId == userId ||                          // direct
                (n.ReceiverId == null && n.TenantId == tenantId) ||// tenant broadcast
                (n.ReceiverId == null && n.TenantId == null))      // global (SuperAdmin)
            .OrderByDescending(n => n.CreatedAt)
            .Take(50)
            .ToListAsync();

        // Apply role filter in memory: n.TargetRole must match user.Role if it is set.
        var filtered = notifications
            .Where(n => !n.TargetRole.HasValue || n.TargetRole.Value == user.Role)
            .Select(MapToDto)
            .ToList();

        return filtered;
    }

    public async Task MarkAsReadAsync(Guid notificationId, Guid userId)
    {
        var notification = await _db.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId && n.ReceiverId == userId);

        if (notification is null) return;

        notification.IsRead = true;
        notification.ReadAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    private async Task BroadcastSignalRAsync(SendNotificationDto dto, NotificationDto payload)
    {
        const string method = "ReceiveNotification";

        if (dto.TargetRole == UserRole.SuperAdmin)
        {
            // TargetRole is SuperAdmin -> ONLY broadcast to the "SuperAdmin" global group
            await _hubContext.Clients
                .Group("SuperAdmin")
                .SendAsync(method, payload);
            return;
        }

        if (dto.ReceiverId.HasValue)
        {
            // Target a specific user's personal group
            await _hubContext.Clients
                .Group(dto.ReceiverId.Value.ToString())
                .SendAsync(method, payload);
        }
        else if (dto.TenantId.HasValue && dto.TargetRole.HasValue)
        {
            // Target a specific role group within a tenant
            await _hubContext.Clients
                .Group($"{dto.TenantId.Value}_{dto.TargetRole.Value}")
                .SendAsync(method, payload);
        }
        else if (dto.TenantId.HasValue)
        {
            // Target all users of a tenant
            await _hubContext.Clients
                .Group(dto.TenantId.Value.ToString())
                .SendAsync(method, payload);
        }
        else
        {
            // Global — SuperAdmin only
            await _hubContext.Clients
                .Group("SuperAdmin")
                .SendAsync(method, payload);
        }
    }

    private async Task SendOneSignalAsync(SendNotificationDto dto)
    {
        if (string.IsNullOrEmpty(_oneSignalAppId) || string.IsNullOrEmpty(_oneSignalRestApiKey))
            return;

        try
        {
            var client = _httpClientFactory.CreateClient("OneSignal");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Key", _oneSignalRestApiKey);

            // Dynamically resolve target external IDs (user IDs) based on recipient type
            var externalIds = new List<string>();

            if (dto.ReceiverId.HasValue)
            {
                externalIds.Add(dto.ReceiverId.Value.ToString());
            }
            else if (dto.TargetRole.HasValue)
            {
                var query = _db.Users.IgnoreQueryFilters().AsNoTracking();
                if (dto.TenantId.HasValue)
                {
                    query = query.Where(u => u.TenantId == dto.TenantId.Value);
                }
                else
                {
                    query = query.Where(u => u.TenantId == null);
                }

                query = query.Where(u => u.Role == dto.TargetRole.Value);
                var matched = await query.Select(u => u.Id.ToString()).ToListAsync();
                externalIds.AddRange(matched);
            }
            else if (dto.TenantId.HasValue)
            {
                var matched = await _db.Users.IgnoreQueryFilters().AsNoTracking()
                    .Where(u => u.TenantId == dto.TenantId.Value)
                    .Select(u => u.Id.ToString())
                    .ToListAsync();
                externalIds.AddRange(matched);
            }

            // Build payload dictionary
            var merged = new Dictionary<string, object?>
            {
                ["app_id"]   = _oneSignalAppId,
                ["headings"] = new { en = dto.Title },
                ["contents"] = new { en = dto.Message },
                ["target_channel"] = "push"
            };

            if (!string.IsNullOrWhiteSpace(dto.DeepLink))
                merged["url"] = dto.DeepLink;

            if (externalIds.Count > 0)
            {
                merged["include_aliases"] = new { external_id = externalIds.ToArray() };
            }
            else
            {
                merged["included_segments"] = new[] { "All" };
            }

            var json = JsonSerializer.Serialize(merged);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            await client.PostAsync("https://onesignal.com/api/v1/notifications", content);
        }
        catch (Exception ex)
        {
            // Log but never throw — push failures should never affect the caller
            Console.WriteLine($"[OneSignal] Push failed: {ex.Message}");
        }
    }

    private static NotificationDto MapToDto(Notification n) => new()
    {
        Id         = n.Id,
        TenantId   = n.TenantId,
        SenderId   = n.SenderId,
        ReceiverId = n.ReceiverId,
        Title      = n.Title,
        Message    = n.Message,
        Type       = n.Type,
        DeepLink   = n.DeepLink,
        IsRead     = n.IsRead,
        TargetRole = n.TargetRole,
        ReadAt     = n.ReadAt,
        CreatedAt  = n.CreatedAt
    };
}
