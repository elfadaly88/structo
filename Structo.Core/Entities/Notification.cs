using System;
using Structo.Core.Enums;

namespace Structo.Core.Entities;

public class Notification
{
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>Crucial for multi-tenant isolation — null means global (SuperAdmin-only).</summary>
    public Guid? TenantId { get; set; }

    public Guid? SenderId { get; set; }
    public Guid? ReceiverId { get; set; }

    /// <summary>Broadcast to all users with a specific role within the tenant.</summary>
    public UserRole? TargetRole { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public NotificationType Type { get; set; } = NotificationType.System;

    /// <summary>Frontend route path to navigate to on click, e.g. /dashboard/tenants.</summary>
    public string DeepLink { get; set; } = string.Empty;

    public bool IsRead { get; set; } = false;
    public DateTime? ReadAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
