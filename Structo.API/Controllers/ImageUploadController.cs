using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Structo.Core.DTOs.Common;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

public class UploadResultDto
{
    public string Url { get; set; } = string.Empty;
}

[ApiController]
[Route("api/ImageUpload")]
[Authorize]
public class ImageUploadController(
    StructoDbContext context, 
    ICloudStorageService storageService,
    ITenantContextAccessor tenantAccessor) : ControllerBase
{
    [HttpPost("tenant-logo")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantLogo(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/logo{extension}";
            
            using var stream = file.OpenReadStream();
            string dbUrl = await storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            if (!string.IsNullOrEmpty(tenant.LogoUrl) && tenant.LogoUrl != dbUrl)
            {
                _ = DeleteFileAsync(tenant.LogoUrl);
            }
            
            tenant.LogoUrl = dbUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant logo uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = $"Failed to upload logo: {ex.Message}" });
        }
    }

    [HttpPost("tenant-banner")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantBanner(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/banner{extension}";
            
            using var stream = file.OpenReadStream();
            string dbUrl = await storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            if (!string.IsNullOrEmpty(tenant.BannerUrl) && tenant.BannerUrl != dbUrl)
            {
                _ = DeleteFileAsync(tenant.BannerUrl);
            }
            
            tenant.BannerUrl = dbUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant banner uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = $"Failed to upload banner: {ex.Message}" });
        }
    }

    [HttpPost("project-gallery/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectGallery([FromRoute] Guid projectId, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });
            
        var tenantId = tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Project not found or access denied." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/projects/{projectId}/images/{Guid.NewGuid()}{extension}";
            
            using var stream = file.OpenReadStream();
            string dbUrl = await storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            var userIdString = User.FindFirstValue("sub") ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid.TryParse(userIdString, out var userId);

            var photo = new SitePhoto
            {
                ProjectId = projectId,
                TenantId = tenantId.Value,
                UploadedByUserId = userId,
                PhotoUrl = dbUrl,
                Description = "Gallery upload",
                UploadedAt = DateTime.UtcNow
            };

            context.SitePhotos.Add(photo);
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Project gallery image uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = $"Failed to upload image: {ex.Message}" });
        }
    }

    [HttpPost("project-document/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectDocument([FromRoute] Guid projectId, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Project not found or access denied." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/projects/{projectId}/files/{Guid.NewGuid()}{extension}";
            
            using var stream = file.OpenReadStream();
            string dbUrl = await storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Document uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = $"Failed to upload document: {ex.Message}" });
        }
    }

    public static async Task<bool> DeleteFileAsync(string fileUrl)
    {
        if (Structo.API.Program.AppServices == null) return false;

        using var scope = Structo.API.Program.AppServices.CreateScope();
        var storageService = scope.ServiceProvider.GetRequiredService<ICloudStorageService>();
        return await storageService.DeleteFileAsync(fileUrl);
    }
}