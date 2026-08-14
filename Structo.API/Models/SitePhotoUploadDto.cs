using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Structo.API.Models;

public class SitePhotoUploadDto
{
    public IFormFile? File { get; set; }

    /// <summary>
    /// Optional caption for the photo (displayed in gallery). Max 200 characters.
    /// </summary>
    [MaxLength(200)]
    public string? Caption { get; set; }
}
