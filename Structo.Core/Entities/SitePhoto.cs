using System;
using System.ComponentModel.DataAnnotations;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class SitePhoto : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Guid UploadedByUserId { get; set; }

    public string PhotoUrl { get; set; } = string.Empty;

    /// <summary>
    /// Optional caption / description for the gallery photo. Max 200 characters.
    /// NOTE: This field is exclusively for site gallery photos.
    /// Financial receipt URLs are stored separately in FinancialTransaction.ReceiptPhotoUrl.
    /// </summary>
    [MaxLength(200)]
    public string? Caption { get; set; }

    /// <summary>
    /// Category / classification for the photo (e.g. "SiteProgress", "SiteInspection").
    /// Financial receipts are never stored in SitePhotos.
    /// </summary>
    [MaxLength(50)]
    public string Category { get; set; } = "SiteProgress";

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
    public User? UploadedByUser { get; set; }
}
