using Structo.Core.DTOs.SiteOperations;
using System;
using System.Text.Json.Serialization;

namespace Structo.Core.DTOs.Subscription;

public class CreateManualPaymentRequestDto
{
    /// <summary>Package type only (PLUS_1 / PLUS_5). Any price or quantity sent by the client is ignored.</summary>
    public string PackageType { get; set; } = string.Empty;
}

public class RejectManualPaymentRequestDto
{
    public string Reason { get; set; } = string.Empty;
    public string? AdminNote { get; set; }
}

public class ManualPaymentRequestDto
{
    public Guid Id { get; set; }
    public Guid TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public string PackageType { get; set; } = string.Empty;
    public int ProjectsQuantity { get; set; }
    public decimal AmountEgp { get; set; }
    public string ReferenceCode { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool HasScreenshot { get; set; }

    /// <summary>Short-lived signed URL; only filled for the tenant owner of the request and SuperAdmins.</summary>
    public string? ScreenshotUrl { get; set; }

    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime CreatedAt { get; set; }

    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime ExpiresAt { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? ReviewedAt { get; set; }

    public string? RejectReason { get; set; }
    public string? AdminNote { get; set; }

    /// <summary>Where to send the money / receipt (server configuration), for the owner's instructions.</summary>
    public string? InstaPayNumber { get; set; }
    public string? WhatsAppNumber { get; set; }
}
