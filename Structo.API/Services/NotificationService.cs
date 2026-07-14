using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Structo.API.Hubs;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Exceptions;
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
    private readonly ILogger<NotificationService> _logger;
    private readonly string _oneSignalAppId;
    private readonly string _oneSignalRestApiKey;

    public NotificationService(
        StructoDbContext db,
        IHubContext<NotificationHub> hubContext,
        IHttpClientFactory httpClientFactory,
        ILogger<NotificationService> logger,
        IConfiguration configuration)
    {
        _db = db;
        _hubContext = hubContext;
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _oneSignalAppId = configuration["OneSignal:AppId"] ?? string.Empty;
        _oneSignalRestApiKey = configuration["OneSignal:RestApiKey"] ?? string.Empty;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────────────────

    public async Task SendAsync(SendNotificationDto dto)
    {
        // Recipient guard: never allow unscoped notifications.
        // A valid request must target at least one scope: Receiver, Tenant, or Role.
        if (!dto.ReceiverId.HasValue && !dto.TenantId.HasValue && !dto.TargetRole.HasValue)
        {
            throw new BusinessRuleException("Notification recipient scope is required. Provide ReceiverId, TenantId, or TargetRole.");
        }

        // 1. Persist to DB
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

        // 2. Resolve external IDs for OneSignal safely on request thread
        var externalIds = await ResolveOneSignalRecipientsAsync(dto);

        // 3. Trigger SignalR and OneSignal HTTP post concurrently.
        //    Wrapped in try/catch: delivery failures must never crash the API request pipeline.
        try
        {
            var signalRTask = BroadcastSignalRAsync(dto, notificationDto);
            var oneSignalTask = SendOneSignalHttpAsync(dto.Title, dto.Message, dto.DeepLink, externalIds);
            await Task.WhenAll(signalRTask, oneSignalTask);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Push delivery failed (SignalR or OneSignal) for notification {NotificationId}. DB record is safe.", notification.Id);
        }
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
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return;

        var notification = await _db.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId);

        if (notification is null) return;

        bool isAuthorized = false;

        if (notification.ReceiverId == userId)
        {
            isAuthorized = true;
        }
        else if (notification.ReceiverId == null)
        {
            bool tenantMatches = (notification.TenantId == null) || (notification.TenantId == user.TenantId);
            bool roleMatches = (!notification.TargetRole.HasValue) || (notification.TargetRole.Value == user.Role);

            if (tenantMatches && roleMatches)
            {
                isAuthorized = true;
            }
        }

        if (!isAuthorized) return;

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

    private async Task<List<string>> ResolveOneSignalRecipientsAsync(SendNotificationDto dto)
    {
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

        return externalIds;
    }

    // private async Task SendOneSignalHttpAsync(string title, string message, string deepLink, List<string> externalIds)
    // {
    //     if (string.IsNullOrEmpty(_oneSignalAppId) || string.IsNullOrEmpty(_oneSignalRestApiKey))
    //     {
    //         _logger.LogWarning("OneSignal configuration is incomplete. Push notification skipped.");
    //         return;
    //     }

    //     if (externalIds.Count == 0)
    //     {
    //         _logger.LogWarning("OneSignal push skipped because no resolved recipients were found for this notification.");
    //         return;
    //     }

    //     try
    //     {
    //         var client = _httpClientFactory.CreateClient("OneSignal");
    //         client.DefaultRequestHeaders.Authorization =
    //             new AuthenticationHeaderValue("Key", _oneSignalRestApiKey);

    //         // Build payload dictionary
    //         var merged = new Dictionary<string, object?>
    //         {
    //             ["app_id"]   = _oneSignalAppId,
    //             ["headings"] = new { en = title },
    //             ["contents"] = new { en = message },
    //             ["target_channel"] = "push"
    //         };

    //         if (!string.IsNullOrWhiteSpace(deepLink))
    //             merged["url"] = deepLink;

    //         merged["include_aliases"] = new { external_id = externalIds.ToArray() };

    //         var json = JsonSerializer.Serialize(merged);
    //         var content = new StringContent(json, Encoding.UTF8, "application/json");

    //         var response = await client.PostAsync("https://onesignal.com/api/v1/notifications", content);
    //         if (!response.IsSuccessStatusCode)
    //         {
    //             var body = await response.Content.ReadAsStringAsync();
    //             _logger.LogWarning("OneSignal push failed with status code {StatusCode}. Response: {ResponseBody}", response.StatusCode, body);
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log but never throw — push failures should never affect the caller
    //         _logger.LogError(ex, "OneSignal push failed due to an exception.");
    //     }
    // }
    private async Task SendOneSignalHttpAsync(string title, string message, string deepLink, List<string> externalIds)
{
    if (string.IsNullOrEmpty(_oneSignalAppId) || string.IsNullOrEmpty(_oneSignalRestApiKey))
    {
        _logger.LogWarning("OneSignal configuration is incomplete. Push notification skipped.");    
        return;
    }

    if (externalIds.Count == 0)
    {
        _logger.LogWarning("OneSignal push skipped because no resolved recipients were found for this notification.");
        return;
    }

    try
    {
        var client = _httpClientFactory.CreateClient("OneSignal");
        
        // 🚀 تأمين السيرفر من الـ Hang: لو مفيش Timeout مسبق على الـ Named Client، نضع حد أقصى 5 ثوانٍ للطلب
        client.Timeout = TimeSpan.FromSeconds(5); 

        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Key", _oneSignalRestApiKey);

        var merged = new Dictionary<string, object?>
        {
            ["app_id"]   = _oneSignalAppId,
            ["headings"] = new { en = title },
            ["contents"] = new { en = message },
            ["target_channel"] = "push"
        };

        if (!string.IsNullOrWhiteSpace(deepLink))
            merged["url"] = deepLink;

        merged["include_aliases"] = new { external_id = externalIds.ToArray() };

        var json = JsonSerializer.Serialize(merged);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // 🚀 استخدام CancellationToken مأمن بـ 5 ثوانٍ لضمان البتر الفوري لو السيرفر الخارجي علّق
        using var cts = new System.Threading.CancellationTokenSource(TimeSpan.FromSeconds(5));
        
        var response = await client.PostAsync("https://onesignal.com/api/v1/notifications", content, cts.Token);
        
        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync();
            _logger.LogWarning("OneSignal push failed with status code {StatusCode}. Response: {ResponseBody}", response.StatusCode, body);
        }
    }
    catch (OperationCanceledException)
    {
        _logger.LogWarning("OneSignal push HTTP request timed out (5s limit exceeded). Request was aborted to save server threads.");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "OneSignal push failed due to an exception.");
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

    public async Task ClearAllNotificationsAsync(Guid userId, Guid? tenantId)
    {
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return;

        var query = _db.Notifications.AsQueryable();

        var toDelete = await query
            .Where(n =>
                n.ReceiverId == userId ||
                (n.ReceiverId == null && n.TenantId == tenantId) ||
                (n.ReceiverId == null && n.TenantId == null))
            .ToListAsync();

        var filteredToDelete = toDelete
            .Where(n => !n.TargetRole.HasValue || n.TargetRole.Value == user.Role)
            .ToList();

        if (filteredToDelete.Count > 0)
        {
            _db.Notifications.RemoveRange(filteredToDelete);
            await _db.SaveChangesAsync();
        }
    }
}
