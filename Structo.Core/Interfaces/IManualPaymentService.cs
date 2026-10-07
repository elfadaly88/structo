using Structo.Core.DTOs.Subscription;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public enum ManualPaymentOutcome
{
    Ok,
    NotFound,
    Invalid,
    Conflict,
    Disabled
}

public record ManualPaymentResult(ManualPaymentOutcome Outcome, string Message, ManualPaymentRequestDto? Data = null)
{
    public bool Success => Outcome == ManualPaymentOutcome.Ok;
}

public interface IManualPaymentService
{
    bool IsInstaPayEnabled { get; }

    Task<ManualPaymentResult> CreateAsync(Guid tenantId, Guid userId, string packageType);
    Task<IReadOnlyList<ManualPaymentRequestDto>> GetForTenantAsync(Guid tenantId);
    Task<ManualPaymentResult> AttachScreenshotAsync(Guid tenantId, Guid requestId, Stream content, string fileName, string contentType);

    Task<IReadOnlyList<ManualPaymentRequestDto>> GetAllForAdminAsync();
    Task<ManualPaymentResult> ApproveAsync(Guid requestId, Guid adminUserId);
    Task<ManualPaymentResult> RejectAsync(Guid requestId, Guid adminUserId, string reason, string? adminNote);
}
