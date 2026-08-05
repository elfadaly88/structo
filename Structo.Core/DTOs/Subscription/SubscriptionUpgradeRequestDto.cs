namespace Structo.Core.DTOs.Subscription;

/// <summary>
/// Request DTO for POST /api/subscription/upgrade-mock.
/// Supports two modes:
///   1. PlanUpgrade:  set TargetPlanId   (e.g., "Pro" | "Enterprise")
///   2. AddOnTopUp:  set ExtraProjectsCount (5 or 10)
/// </summary>
public class SubscriptionUpgradeRequestDto
{
    /// <summary>
    /// Target plan name for a full plan upgrade. Null for AddOnTopUp mode.
    /// Accepted values: "Pro", "Enterprise"
    /// </summary>
    public string? TargetPlanId { get; set; }

    /// <summary>
    /// Number of extra projects to add on top of current MaxActiveProjects.
    /// Accepted values: 5, 10. Null or 0 means plan upgrade mode.
    /// </summary>
    public int? ExtraProjectsCount { get; set; }

    /// <summary>
    /// Payment method used. For mock: always "TestCard".
    /// </summary>
    public string PaymentMethod { get; set; } = "TestCard";
}
