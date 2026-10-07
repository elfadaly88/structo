using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Enums;
using Structo.Core.Helpers;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

/// <summary>Tenant owner side of manual InstaPay payments for extra-project packages.</summary>
[ApiController]
[Route("api/subscription/instapay")]
[Authorize(Roles = "TenantOwner")]
public class InstaPayController(StructoDbContext context, IManualPaymentService manualPayments) : ControllerBase
{
    private const long MaxReceiptBytes = 5 * 1024 * 1024;
    private static readonly string[] ReceiptExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    [HttpPost("requests")]
    [EnableRateLimiting("publicWritePolicy")]
    public async Task<ActionResult<ApiResponse<ManualPaymentRequestDto>>> Create([FromBody] CreateManualPaymentRequestDto dto)
    {
        var owner = await ResolveOwnerAsync();
        if (owner == null)
            return StatusCode(StatusCodes.Status403Forbidden, Fail<ManualPaymentRequestDto>("Only the company owner can buy projects."));

        return ToResponse(await manualPayments.CreateAsync(owner.Value.TenantId, owner.Value.UserId, dto.PackageType));
    }

    [HttpGet("requests")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ManualPaymentRequestDto>>>> Mine()
    {
        var owner = await ResolveOwnerAsync();
        if (owner == null)
            return StatusCode(StatusCodes.Status403Forbidden, Fail<IReadOnlyList<ManualPaymentRequestDto>>("Only the company owner can view payment requests."));

        return Ok(new ApiResponse<IReadOnlyList<ManualPaymentRequestDto>>
        {
            Data = await manualPayments.GetForTenantAsync(owner.Value.TenantId),
            Message = manualPayments.IsInstaPayEnabled ? string.Empty : "INSTAPAY_DISABLED"
        });
    }

    [HttpPost("requests/{id:guid}/screenshot")]
    [EnableRateLimiting("publicWritePolicy")]
    [RequestSizeLimit(MaxReceiptBytes + 512 * 1024)]
    public async Task<ActionResult<ApiResponse<ManualPaymentRequestDto>>> UploadScreenshot(Guid id, IFormFile file)
    {
        var owner = await ResolveOwnerAsync();
        if (owner == null)
            return StatusCode(StatusCodes.Status403Forbidden, Fail<ManualPaymentRequestDto>("Only the company owner can upload a receipt."));

        // Shared validator checks extension, MIME type and magic bytes; receipts are further limited to images ≤ 5 MB
        var (isValid, error) = FileValidator.ValidateUploadedFile(file);
        if (!isValid)
            return BadRequest(Fail<ManualPaymentRequestDto>(error));
        if (!ReceiptExtensions.Contains(Path.GetExtension(file.FileName).ToLowerInvariant()))
            return BadRequest(Fail<ManualPaymentRequestDto>("The receipt must be an image (JPG, PNG or WEBP)."));
        if (file.Length > MaxReceiptBytes)
            return BadRequest(Fail<ManualPaymentRequestDto>("The receipt image must be 5 MB or smaller."));

        await using var stream = file.OpenReadStream();
        return ToResponse(await manualPayments.AttachScreenshotAsync(owner.Value.TenantId, id, stream, file.FileName, file.ContentType));
    }

    /// <summary>The JWT role is re-checked against the database: the caller must still be the active owner of their tenant.</summary>
    private async Task<(Guid UserId, Guid TenantId)?> ResolveOwnerAsync()
    {
        var sub = User.FindFirstValue("sub") ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(sub, out var userId))
            return null;

        var user = await context.Users.IgnoreQueryFilters().AsNoTracking()
            .Where(u => u.Id == userId)
            .Select(u => new { u.Role, u.IsActive, u.TenantId })
            .FirstOrDefaultAsync();

        if (user == null || !user.IsActive || user.Role != UserRole.TenantOwner || user.TenantId == null)
            return null;
        return (userId, user.TenantId.Value);
    }

    private ActionResult<ApiResponse<ManualPaymentRequestDto>> ToResponse(ManualPaymentResult result)
    {
        var body = new ApiResponse<ManualPaymentRequestDto> { Success = result.Success, Message = result.Message, Data = result.Data };
        return result.Outcome switch
        {
            ManualPaymentOutcome.Ok => Ok(body),
            ManualPaymentOutcome.NotFound => NotFound(body),
            ManualPaymentOutcome.Conflict => Conflict(body),
            _ => BadRequest(body)
        };
    }

    private static ApiResponse<T> Fail<T>(string message) => new() { Success = false, Message = message };
}
