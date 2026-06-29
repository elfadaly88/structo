using System;
using Structo.Core.Enums;

namespace Structo.Core.DTOs.Notifications;

public class NotificationDto
{
    public Guid Id { get; set; }
    public Guid? TenantId { get; set; }
    public Guid? SenderId { get; set; }
    public Guid? ReceiverId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public NotificationType Type { get; set; }
    public string DeepLink { get; set; } = string.Empty;
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class SendNotificationDto
{
    public Guid? TenantId { get; set; }
    public Guid? ReceiverId { get; set; }
    public UserRole? TargetRole { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public NotificationType Type { get; set; } = NotificationType.System;
    public string DeepLink { get; set; } = string.Empty;
}
