using System;

namespace Structo.Core.DTOs.Projects;

public class ProjectMemberDto
{
    public Guid ProjectId { get; set; }
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public Guid? AssignedByUserId { get; set; }
}
