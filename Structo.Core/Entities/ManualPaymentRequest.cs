using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Structo.Core.Entities;

/// <summary>
/// A tenant owner's manual (InstaPay) payment for an extra-project package, verified by a SuperAdmin.
/// </summary>
public class ManualPaymentRequest : ITenantEntity
{
    public static readonly TimeSpan Lifetime = TimeSpan.FromHours(48);

    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public Guid RequestedByUserId { get; set; }

    /// <summary>ProjectPackages type, e.g. PLUS_1 / PLUS_5. Quantity and amount are copied from the server price list.</summary>
    public string PackageType { get; set; } = string.Empty;
    public int ProjectsQuantity { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal AmountEgp { get; set; }

    /// <summary>Short code the customer writes in the transfer note, e.g. OS-4821. Unique.</summary>
    public string ReferenceCode { get; set; } = string.Empty;

    /// <summary>Stored status: Pending, Approved or Rejected. Use <see cref="EffectiveStatus"/> for display.</summary>
    public ManualPaymentStatus Status { get; set; } = ManualPaymentStatus.Pending;

    /// <summary>
    /// Private storage key of the receipt screenshot (not a public URL). Viewers get a short-lived signed URL.
    /// </summary>
    public string? ScreenshotUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }

    public Guid? ReviewedByUserId { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public string? RejectReason { get; set; }
    public string? AdminNote { get; set; }

    public ManualPaymentStatus EffectiveStatus(DateTime utcNow) =>
        Status == ManualPaymentStatus.Pending && utcNow >= ExpiresAt ? ManualPaymentStatus.Expired : Status;
}
