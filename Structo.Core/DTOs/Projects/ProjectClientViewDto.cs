using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Projects;

public class ProjectClientViewDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string PublicDescription { get; set; } = string.Empty;
    
    /// <summary>
    /// Calculated overall progress percentage.
    /// </summary>
    public int ProgressPercentage { get; set; }
    
    public List<string> RecentPhotoUrls { get; set; } = [];
}
