using System;

namespace Structo.Core.Entities;

/// <summary>
/// Records every subscription upgrade or add-on top-up transaction.
/// Designed for extensibility: replace MockGateway with Paymob/Stripe by
/// swapping the PaymentGateway field and updating status via webhook.
/// </summary>
public class SubscriptionTransaction
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;

    /// <summary>
    /// "PlanUpgrade" or "AddOnTopUp"
    /// </summary>
    public string TransactionType { get; set; } = "PlanUpgrade";

    /// <summary>
    /// The subscription plan name after the transaction (e.g., "Pro", "Enterprise").
    /// For AddOnTopUp this is the plan that was active at purchase time.
    /// </summary>
    public string PlanName { get; set; } = string.Empty;

    /// <summary>
    /// Number of extra projects added (0 for plan upgrade, 5 or 10 for top-up).
    /// </summary>
    public int ExtraProjectsAdded { get; set; } = 0;

    /// <summary>
    /// MaxActiveProjects value on the Tenant AFTER this transaction.
    /// </summary>
    public int ResultingMaxProjects { get; set; }

    public decimal Amount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }

    /// <summary>
    /// "MockGateway" | "Paymob" | "Stripe" — swappable in future.
    /// </summary>
    public string PaymentGateway { get; set; } = "MockGateway";
    public string PaymentMethod { get; set; } = "TestCard";

    /// <summary>
    /// Status: "Paid" | "Failed" | "Pending"
    /// </summary>
    public string Status { get; set; } = "Paid";

    /// <summary>
    /// Reference number: TXN-TEST-xxxxxx for MockGateway.
    /// For real gateways this will be the gateway transaction ID.
    /// </summary>
    public string ReferenceNumber { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
