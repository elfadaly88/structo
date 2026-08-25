using System;

namespace Structo.Core.Entities;

/// <summary>
/// Tracks every checkout/payment attempt initiated by a user, allowing explicit tracking
/// of Paymob webhook callback delivery (Pending -> Confirmed / HmacFailed / NeverArrived).
/// </summary>
public class PaymentAttempt
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public Guid? UserId { get; set; }
    public User? User { get; set; }

    /// <summary>
    /// Total amount in EGP (e.g. 250.00, 950.00)
    /// </summary>
    public decimal Amount { get; set; }

    /// <summary>
    /// Requested package/plan name (e.g. "+1 Projects", "+5 Projects", "Pro")
    /// </summary>
    public string PlanRequested { get; set; } = string.Empty;

    /// <summary>
    /// Number of additive projects requested (1, 5, etc.)
    /// </summary>
    public int ExtraProjectsCount { get; set; } = 1;

    /// <summary>
    /// Paymob Order ID or Intention ID generated during checkout
    /// </summary>
    public string? PaymobOrderId { get; set; }

    /// <summary>
    /// Merchant Order ID / Special Reference sent to Paymob (e.g. SUB_{TenantId}_{ticks})
    /// </summary>
    public string SpecialReference { get; set; } = string.Empty;

    /// <summary>
    /// UTC timestamp when checkout was initiated
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// UTC timestamp when Paymob webhook callback was received
    /// </summary>
    public DateTime? WebhookReceivedAt { get; set; }

    /// <summary>
    /// Webhook delivery status: "Pending" | "Confirmed" | "HmacFailed" | "NeverArrived"
    /// </summary>
    public string WebhookStatus { get; set; } = "Pending";

    /// <summary>
    /// Foreign Key to SubscriptionTransactions once webhook confirms and processes payment
    /// </summary>
    public Guid? LinkedTransactionId { get; set; }
    public SubscriptionTransaction? LinkedTransaction { get; set; }

    /// <summary>
    /// Error message or diagnostic note if webhook validation fails or is dropped
    /// </summary>
    public string? ErrorMessage { get; set; }
}
