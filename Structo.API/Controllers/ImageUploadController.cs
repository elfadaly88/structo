using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Structo.Core.DTOs.Common;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

public class UploadResultDto
{
    public string Url { get; set; } = string.Empty;
}

[ApiController]
[Route("api/ImageUpload")]
[Authorize]
public class ImageUploadController(StructoDbContext context, IConfiguration configuration) : ControllerBase
{
    [HttpPost("tenant-logo")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantLogo([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });
        }

        try
        {
            string secureUrl = await UploadToCloudinaryOrLocal(file);

            // Update tenant logo in database
            tenant.LogoUrl = secureUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant logo uploaded successfully.",
                Data = new UploadResultDto { Url = secureUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto>
            {
                Success = false,
                Message = $"Failed to upload logo: {ex.Message}"
            });
        }
    }

    [HttpPost("tenant-banner")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantBanner([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });
        }

        try
        {
            string secureUrl = await UploadToCloudinaryOrLocal(file);

            // Update tenant banner in database
            tenant.BannerUrl = secureUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant banner uploaded successfully.",
                Data = new UploadResultDto { Url = secureUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto>
            {
                Success = false,
                Message = $"Failed to upload banner: {ex.Message}"
            });
        }
    }

    [HttpPost("project-gallery/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectGallery([FromRoute] Guid projectId, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
        {
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Project not found or access denied." });
        }

        try
        {
            string secureUrl = await UploadToCloudinaryOrLocal(file);

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid.TryParse(userIdString, out var userId);

            // Save to SitePhoto entity for public gallery
            var photo = new SitePhoto
            {
                ProjectId = projectId,
                TenantId = tenantId,
                UploadedByUserId = userId,
                PhotoUrl = secureUrl,
                Description = "Gallery upload",
                UploadedAt = DateTime.UtcNow
            };

            context.SitePhotos.Add(photo);
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Project gallery image uploaded successfully.",
                Data = new UploadResultDto { Url = secureUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto>
            {
                Success = false,
                Message = $"Failed to upload image: {ex.Message}"
            });
        }
    }

    private async Task<string> UploadToCloudinaryOrLocal(IFormFile file)
    {
        var cloudName = configuration["Cloudinary:CloudName"];
        var apiKey = configuration["Cloudinary:ApiKey"];
        var apiSecret = configuration["Cloudinary:ApiSecret"];

        // Check if Cloudinary configuration is active
        if (!string.IsNullOrEmpty(cloudName) && !string.IsNullOrEmpty(apiKey) && !string.IsNullOrEmpty(apiSecret))
        {
            using var client = new HttpClient();
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
            
            // Signature generation: stringToSign format is "timestamp={timestamp}{apiSecret}"
            var stringToSign = $"timestamp={timestamp}{apiSecret}";
            using var sha1 = System.Security.Cryptography.SHA1.Create();
            var hashBytes = sha1.ComputeHash(System.Text.Encoding.UTF8.GetBytes(stringToSign));
            var signature = Convert.ToHexString(hashBytes).ToLower();

            using var content = new MultipartFormDataContent();
            
            using var fileStream = file.OpenReadStream();
            var streamContent = new StreamContent(fileStream);
            streamContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
            content.Add(streamContent, "file", file.FileName);

            content.Add(new StringContent(timestamp), "timestamp");
            content.Add(new StringContent(apiKey), "api_key");
            content.Add(new StringContent(signature), "signature");

            var response = await client.PostAsync($"https://api.cloudinary.com/v1_1/{cloudName}/image/upload", content);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                using var jsonDoc = JsonDocument.Parse(responseString);
                var secureUrl = jsonDoc.RootElement.GetProperty("secure_url").GetString();
                if (!string.IsNullOrEmpty(secureUrl))
                {
                    return secureUrl;
                }
            }

            var errContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Cloudinary API responded with error: {response.StatusCode} - {errContent}");
        }

        // Local development fallback: save to wwwroot/uploads and return absolute URL
        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadFolder);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Return absolute URL (localhost backend) so it resolves correctly on the frontend port
        return $"http://localhost:5000/uploads/{fileName}";
    }
}
