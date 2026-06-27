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
using Amazon.Runtime;

namespace Structo.API.Controllers;

public class UploadResultDto
{
    public string Url { get; set; } = string.Empty;
}

[ApiController]
[Route("api/ImageUpload")]
[Authorize]
public class ImageUploadController(StructoDbContext context, IWebHostEnvironment env) : ControllerBase
{
    [HttpPost("tenant-logo")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantLogo(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        if (!ValidateFileSize(file, out var errorMsg))
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = errorMsg });
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
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/logo{extension}";
            string secureUrl = await UploadToCloudinaryOrLocal(file, customKey);

            // 🔥 التعديل هنا: فك الـ Split للفصل بين رابط الرفع ورابط الداتابيز
            var urls = secureUrl.Split('|');
            string dbUrl = urls.Length > 2 ? urls[2] : secureUrl;

            // Update tenant logo in database باستخدام الرابط النظيف الصافي
            if (!string.IsNullOrEmpty(tenant.LogoUrl) && tenant.LogoUrl != dbUrl)
            {
                _ = DeleteFileAsync(tenant.LogoUrl);
            }
            tenant.LogoUrl = dbUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant logo generated successfully.",
                Data = new UploadResultDto { Url = secureUrl } // بنرجع السلسلة كاملة للفرونت عشان يفكها ويرفع
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
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadTenantBanner(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        if (!ValidateFileSize(file, out var errorMsg))
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = errorMsg });
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
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/profile/banner{extension}";
            string secureUrl = await UploadToCloudinaryOrLocal(file, customKey);

            // 🔥 التعديل هنا: فك الـ Split للبانر
            var urls = secureUrl.Split('|');
            string dbUrl = urls.Length > 2 ? urls[2] : secureUrl;

            // Update tenant banner in database باستخدام الرابط النظيف الصافي
            if (!string.IsNullOrEmpty(tenant.BannerUrl) && tenant.BannerUrl != dbUrl)
            {
                _ = DeleteFileAsync(tenant.BannerUrl);
            }
            tenant.BannerUrl = dbUrl;
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Tenant banner generated successfully.",
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
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectGallery([FromRoute] Guid projectId, IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        if (!ValidateFileSize(file, out var errorMsg))
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = errorMsg });
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
            var extension = Path.GetExtension(file.FileName).ToLower();
            string customKey = $"{tenantId}/projects/{projectId}/images/{Guid.NewGuid()}{extension}";
            string secureUrl = await UploadToCloudinaryOrLocal(file, customKey);

            // 🔥 التعديل هنا لضمان عمل الـ Gallery بالـ Presigned لو أحببت
            var urls = secureUrl.Split('|');
            string dbUrl = urls.Length > 2 ? urls[2] : secureUrl;

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid.TryParse(userIdString, out var userId);

            var photo = new SitePhoto
            {
                ProjectId = projectId,
                TenantId = tenantId,
                UploadedByUserId = userId,
                PhotoUrl = dbUrl, // تخزين الرابط الصافي
                Description = "Gallery upload",
                UploadedAt = DateTime.UtcNow
            };

            context.SitePhotos.Add(photo);
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Project gallery image generated successfully.",
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

    [HttpPost("project-document/{projectId}")]
    public async Task<ActionResult<ApiResponse<UploadResultDto>>> UploadProjectDocument([FromRoute] Guid projectId, IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "No file was uploaded." });
        }

        if (!ValidateFileSize(file, out var errorMsg))
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = errorMsg });
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

        var extension = Path.GetExtension(file.FileName).ToLower();
        var allowed = new[] { ".png", ".jpg", ".jpeg", ".gif", ".webp", ".pdf", ".xlsx", ".xls" };
        if (!allowed.Contains(extension))
        {
            return BadRequest(new ApiResponse<UploadResultDto> { Success = false, Message = "File type not supported. Only images, PDF, and Excel files are allowed." });
        }

        try
        {
            string customKey = $"{tenantId}/projects/{projectId}/files/{Guid.NewGuid()}{extension}";
            string secureUrl = await UploadToCloudinaryOrLocal(file, customKey);

            return Ok(new ApiResponse<UploadResultDto>
            {
                Success = true,
                Message = "Document generated successfully.",
                Data = new UploadResultDto { Url = secureUrl }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<UploadResultDto>
            {
                Success = false,
                Message = $"Failed to upload document: {ex.Message}"
            });
        }
    }

    private async Task<string> UploadToCloudinaryOrLocal(IFormFile file, string? customKey = null)
    {
        var accessKeyId = "517b868184374750bced4ca6891f3a93";
        var secretAccessKey = "6177b6d6f744f480ee0d6beb59907f22f83b44294c1f7b7ce56d6dbc44c3c5d8";
        var bucketName = "structo-storage";
        var serviceUrl = "https://517b868184374750bced4ca6891f3a93.r2.cloudflarestorage.com";
        var publicBaseUrl = "https://pub-59ae95fd3b604f168162fea6b8d9e1eb.r2.dev";

        var extension = Path.GetExtension(file.FileName).ToLower();
        var key = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{extension}";

        try
        {
            using var client = CreateR2Client();
            using var stream = file.OpenReadStream();
            
            var request = new Amazon.S3.Model.PutObjectRequest
            {
                BucketName = bucketName,
                Key = key,
                InputStream = stream,
                ContentType = file.ContentType
            };

            Console.WriteLine($"[R2] Uploading Key: {key} to Bucket: {bucketName}");
            var response = await client.PutObjectAsync(request);
            Console.WriteLine($"[R2] Upload SUCCESS — Key: {key}, HttpStatus: {response.HttpStatusCode}");
            return $"{publicBaseUrl}/{key}";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[R2 Upload FAILED] Key: {key} — Error: {ex.Message}");
            throw;
        }
    }

    private static Amazon.S3.AmazonS3Client CreateR2Client()
    {
        // Global bypass for legacy SDKs
        System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12 | System.Net.SecurityProtocolType.Tls13;
        System.Net.ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

        var accessKeyId = "517b868184374750bced4ca6891f3a93";
        var secretAccessKey = "6177b6d6f744f480ee0d6beb59907f22f83b44294c1f7b7ce56d6dbc44c3c5d8";
        var serviceUrl = "https://517b868184374750bced4ca6891f3a93.r2.cloudflarestorage.com";

        // Explicit HttpClientHandler bypass for .NET Core / AWS SDK v3
        var handler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true,
            SslProtocols = System.Security.Authentication.SslProtocols.Tls12 | System.Security.Authentication.SslProtocols.Tls13
        };

        var config = new Amazon.S3.AmazonS3Config
        {
            ServiceURL = serviceUrl,
            ForcePathStyle = true,
            AuthenticationRegion = "auto",
            HttpClientFactory = new R2HttpClientFactory(handler)
        };

        var credentials = new Amazon.Runtime.BasicAWSCredentials(accessKeyId, secretAccessKey);
        return new Amazon.S3.AmazonS3Client(credentials, config);
    }

    public static async Task<bool> DeleteFileAsync(string fileUrl)
    {
        if (string.IsNullOrEmpty(fileUrl)) return false;

        var publicBaseUrl = "https://pub-59ae95fd3b604f168162fea6b8d9e1eb.r2.dev";
        if (!fileUrl.StartsWith(publicBaseUrl)) return false;

        try
        {
            var key = fileUrl.Replace(publicBaseUrl, "").TrimStart('/');
            if (string.IsNullOrEmpty(key)) return false;

            var bucketName = "structo-storage";
            using var client = CreateR2Client();

            Console.WriteLine($"[R2] Deleting cloud object: {key} from bucket: {bucketName}");
            await client.DeleteObjectAsync(bucketName, key);
            Console.WriteLine($"[R2] Delete SUCCESS — Key: {key}");
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[R2 Delete FAILED] {ex.Message}");
            return false;
        }
    }

    private bool ValidateFileSize(IFormFile file, out string errorMessage)
    {
        var extension = Path.GetExtension(file.FileName).ToLower();
        var isImage = new[] { ".png", ".jpg", ".jpeg", ".gif", ".webp" }.Contains(extension);

        long maxSize = isImage ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.Length > maxSize)
        {
            errorMessage = isImage
                ? "File size exceeds the allowed limit of 2MB for images."  
                : "File size exceeds the allowed limit of 5MB for documents.";
            return false;
        }

        errorMessage = string.Empty;
        return true;
    }
}

/// <summary>
/// Custom HttpClientFactory for AWS SDK that bypasses SSL certificate validation and forces TLS versions.
/// Required for Cloudflare R2 on dev machines with antivirus/proxy intercepting HTTPS.
/// </summary>
public class R2HttpClientFactory : Amazon.Runtime.HttpClientFactory
{
    private readonly HttpClientHandler _handler;

    public R2HttpClientFactory(HttpClientHandler handler)
    {
        _handler = handler;
    }

    public override HttpClient CreateHttpClient(IClientConfig clientConfig)
    {
        return new HttpClient(_handler, disposeHandler: false);
    }

    public override bool DisposeHttpClientsAfterUse(IClientConfig clientConfig)
    {
        return false;
    }

    public override bool UseSDKHttpClientCaching(IClientConfig clientConfig)
    {
        return false;
    }
}