namespace Structo.Core.DTOs.Subscription;

public class ManualUpgradeRequestDto
{
    public int ExtraProjectsCount { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = "Cash";
    public string? Notes { get; set; }
}
