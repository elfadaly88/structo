using System;

namespace Structo.Core.DTOs.Projects;

public class ProjectDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; }
    public Guid? ManagerId { get; set; }
    public string Status { get; set; } = "Active";
    public string? PublicReviewToken { get; set; }

    public string Governorate { get; set; } = string.Empty;
    public string CityOrZone { get; set; } = string.Empty;
    public string SiteAddress { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string ClientWhatsApp { get; set; } = string.Empty;
    public string PropertyType { get; set; } = "Residential";
}

