using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Subscription;

public class PaymentAttemptDto
{
    public Guid Id { get; set; }
    public Guid TenantId { get; set; }
    public string? TenantName { get; set; }
    public Guid? UserId { get; set; }
    public string? UserEmail { get; set; }
    public string? UserName { get; set; }
    public decimal Amount { get; set; }
    public string PlanRequested { get; set; } = string.Empty;
    public int ExtraProjectsCount { get; set; }
    public string? PaymobOrderId { get; set; }
    public string SpecialReference { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? WebhookReceivedAt { get; set; }
    public string WebhookStatus { get; set; } = string.Empty;
    public Guid? LinkedTransactionId { get; set; }
    public string? ReferenceNumber { get; set; }
    public string? PaymentMethod { get; set; }
    public string? ErrorMessage { get; set; }
    public bool IsStaleUnconfirmed { get; set; }
}

public class MyPaymentsResponseDto
{
    public int CurrentMaxProjects { get; set; }
    public string CurrentPlan { get; set; } = string.Empty;
    public List<PaymentAttemptDto> Attempts { get; set; } = new();
    public int TotalConfirmedCount { get; set; }
    public int TotalNeverArrivedCount { get; set; }
    public decimal TotalSpentEgp { get; set; }
}

public class AdminPaymentsResponseDto
{
    public AdminPaymentsSummaryDto Summary { get; set; } = new();
    public List<TenantPaymentSummaryDto> TenantsSummary { get; set; } = new();
    public List<PaymentAttemptDto> Attempts { get; set; } = new();
}

public class AdminPaymentsSummaryDto
{
    public int TotalAttemptsCount { get; set; }
    public int ConfirmedCount { get; set; }
    public int NeverArrivedCount { get; set; }
    public int HmacFailedCount { get; set; }
    public int PendingCount { get; set; }
    public decimal TotalRevenueEgp { get; set; }
    public decimal NeverArrivedTotalAmountEgp { get; set; }
}

public class TenantPaymentSummaryDto
{
    public Guid TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public string SubscriptionPlan { get; set; } = string.Empty;
    public int MaxActiveProjects { get; set; }
    public int ConfirmedPurchasesCount { get; set; }
    public decimal TotalAmountSpentEgp { get; set; }
    public int NeverArrivedAttemptsCount { get; set; }
    public DateTime? LastAttemptAt { get; set; }
    public bool HasNeverArrivedAlert { get; set; }
}
