namespace Structo.Core.DTOs.Subscription;

public class SubscriptionUpgradeResponseDto
{
    /// <summary>
    /// "PlanUpgrade" or "AddOnTopUp"
    /// </summary>
    public string TransactionType { get; set; } = string.Empty;

    public string NewPlan { get; set; } = string.Empty;
    public int NewMaxActiveProjects { get; set; }
    public int ExtraProjectsAdded { get; set; }

    public decimal Amount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }

    public string ReferenceNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Paid";
}
