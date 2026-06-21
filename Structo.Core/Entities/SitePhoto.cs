using System;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class SitePhoto : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Guid UploadedByUserId { get; set; }
    
    public string PhotoUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
    public User? UploadedByUser { get; set; }
}
