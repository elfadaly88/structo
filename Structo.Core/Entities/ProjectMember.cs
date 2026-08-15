using System;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

/// <summary>
/// Pure scope/junction table that assigns a user to a project.
/// Multi-tenant entity tied to TenantId.
/// Authorization is derived from User.Role (fixed global role) + ProjectMember (assignment).
/// </summary>
public class ProjectMember : ITenantEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public Guid? AssignedByUserId { get; set; }

    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }
}
