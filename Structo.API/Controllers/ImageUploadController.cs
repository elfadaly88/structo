using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Structo.Core.DTOs.Common;
using Structo.Core.Entities;
using Structo.Core.Helpers;
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
public class ImageUploadController : ControllerBase
{
    private readonly StructoDbContext _context;
    private readonly ICloudStorageService _storageService;
    private readonly ITenantContextAccessor _tenantAccessor;
    private readonly ILogger<ImageUploadController> _logger; // 🚀 تعديل نوع الـ Logger المحقون صح
    private readonly IFinancialTransactionService _transactionService; // 🚀 حقن صمام أمان التحقق من المشروع
    public ImageUploadController(
        StructoDbContext context,
        ICloudStorageService storageService,
        ITenantContextAccessor tenantAccessor,
        ILogger<ImageUploadController> logger,
        IFinancialTransactionService transactionService)
    {
        _context = context;
        _storageService = storageService;
        _tenantAccessor = tenantAccessor;
        _logger = logger;
        _transactionService = transactionService;
    }
    [HttpPost("tenant-logo")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantLogo(IFormFile file)
    {
        var (isValid, errorMessage) = FileValidator.ValidateUploadedFile(file);
        if (!isValid)
        {
            // تسجيل محاولة الرفع المشبوهة في الـ Logs للأمان
            _logger.LogWarning("🚨 Security Warn: Refused file upload attempt. Reason: {Error}. File Name: {FileName}", errorMessage, file?.FileName);
            return BadRequest(new ApiResponse<string> { Success = false, Message = errorMessage });
        }
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = _tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var tenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/logo{extension}";

            using var stream = file.OpenReadStream();
            string dbUrl = await _storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            if (!string.IsNullOrEmpty(tenant.LogoUrl) && tenant.LogoUrl != dbUrl)
            {

                await DeleteFileAsync(tenant.LogoUrl);


                //await DeleteFileAsync(tenant.LogoUrl);
            }

            tenant.LogoUrl = dbUrl;
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant logo uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading tenant logo for tenant {TenantId}", tenantId);
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = "An internal server error occurred." });
        }
    }

    [HttpPost("tenant-banner")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantBanner(IFormFile file)
    {
        var (isValid, errorMessage) = FileValidator.ValidateUploadedFile(file);
        if (!isValid)
        {
            // تسجيل محاولة الرفع المشبوهة في الـ Logs للأمان
            _logger.LogWarning("🚨 Security Warn: Refused file upload attempt. Reason: {Error}. File Name: {FileName}", errorMessage, file?.FileName);

            return BadRequest(new ApiResponse<string> { Success = false, Message = errorMessage });
        }
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = _tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var tenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant not found." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/banner{extension}";

            using var stream = file.OpenReadStream();
            string dbUrl = await _storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            if (!string.IsNullOrEmpty(tenant.BannerUrl) && tenant.BannerUrl != dbUrl)
            {

                await DeleteFileAsync(tenant.BannerUrl);

                //await DeleteFileAsync(tenant.BannerUrl);
            }

            tenant.BannerUrl = dbUrl;
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant banner uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = "An unexpected error occurred while processing your request." });
        }
    }

    [HttpPost("project-gallery/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectGallery([FromRoute] Guid projectId, IFormFile file)
    {
        var (isValid, errorMessage) = FileValidator.ValidateUploadedFile(file);
        if (!isValid)
        {
            // تسجيل محاولة الرفع المشبوهة في الـ Logs للأمان
            _logger.LogWarning("🚨 Security Warn: Refused file upload attempt. Reason: {Error}. File Name: {FileName}", errorMessage, file?.FileName);
            return BadRequest(new ApiResponse<string> { Success = false, Message = errorMessage });
        }
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = _tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Project not found or access denied." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/projects/{projectId}/images/{Guid.NewGuid()}{extension}";

            using var stream = file.OpenReadStream();
            string dbUrl = await _storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

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

            _context.SitePhotos.Add(photo);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Project gallery image uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto> { Success = false, Message = "An unexpected error occurred. Please contact support." });
        }
    }

    [HttpPost("project-document/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectDocument([FromRoute] Guid projectId, IFormFile file)
    {
        var (isValid, errorMessage) = FileValidator.ValidateUploadedFile(file);
        if (!isValid)
        {
            // تسجيل محاولة الرفع المشبوهة في الـ Logs للأمان
            _logger.LogWarning("🚨 Security Warn: Refused file upload attempt. Reason: {Error}. File Name: {FileName}", errorMessage, file?.FileName);
            return BadRequest(new ApiResponse<string> { Success = false, Message = errorMessage });
        }
        if (file == null || file.Length == 0)
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file uploaded." });

        var tenantId = _tenantAccessor.GetCurrentTenantId();
        if (tenantId == null)
            return Unauthorized(new ApiResponse<UploadResultDto> { Success = false, Message = "Tenant ID claim missing or invalid." });

        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return NotFound(new ApiResponse<UploadResultDto> { Success = false, Message = "Project not found or access denied." });

        try
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/projects/{projectId}/files/{Guid.NewGuid()}{extension}";

            using var stream = file.OpenReadStream();
            string dbUrl = await _storageService.UploadFileDirectAsync(stream, file.FileName, file.ContentType, customKey);

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Document uploaded successfully.",
                Data = new UploadResultDto { Url = dbUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto>
            {
                Success = false,
                Message = "An internal error occurred while processing your file. Please try again later."
            }
        );
        }
    }

    private async Task<bool> DeleteFileAsync(string fileUrl)
    {
        if (string.IsNullOrEmpty(fileUrl)) return false;

        try
        {
            return await _storageService.DeleteFileAsync(fileUrl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete file from cloud storage. File URL: {FileUrl}", fileUrl);
            return false;
        }
    }
}