using System;

namespace Structo.Core.DTOs.Projects;

public class ProjectCreateDto
{
    public Guid? TenantId { get; set; } // Fallback for testing
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public Guid? ManagerId { get; set; }
}
