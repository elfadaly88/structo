using System;

namespace Structo.Core.DTOs.Photos;

public class SitePhotoMobileDto
{
    public Guid Id { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;

    /// <summary>
    /// Optional caption for the gallery photo (max 200 chars).
    /// </summary>
    public string? Caption { get; set; }

    public DateTime UploadedAt { get; set; }

    /// <summary>
    /// The name or role of the person who uploaded the photo.
    /// </summary>
    public string UploadedBy { get; set; } = string.Empty;
}
