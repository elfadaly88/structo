using Microsoft.AspNetCore.Http;

namespace Structo.API.Models;

public class SitePhotoUploadDto
{
    public IFormFile? File { get; set; }
    public string Description { get; set; } = string.Empty;
}
