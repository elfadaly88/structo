using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Structo.Core.DTOs.Notifications;

namespace Structo.Core.Interfaces;

public interface INotificationService
{
    /// <summary>
    /// Saves a notification to the database and broadcasts it in real-time to the
    /// appropriate SignalR group (tenant or user), then fires a OneSignal push.
    /// </summary>
    Task SendAsync(SendNotificationDto dto);

    /// <summary>Returns the latest notifications for the current authenticated user.</summary>
    Task<List<NotificationDto>> GetMyNotificationsAsync(Guid userId, Guid? tenantId);

    /// <summary>Marks a single notification as read and records the read timestamp.</summary>
    Task MarkAsReadAsync(Guid notificationId, Guid userId);
}
