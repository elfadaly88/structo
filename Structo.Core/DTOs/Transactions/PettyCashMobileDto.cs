using System;

namespace Structo.Core.DTOs.Transactions;

public class PettyCashMobileDto
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; }
    public bool IsSettled { get; set; }
    public string IssuedTo { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Comments { get; set; } = string.Empty;
    public string ReceiptPhotoUrl { get; set; } = string.Empty;
    public string SettlementPaymentMethod { get; set; } = string.Empty;
    public DateTime? ExpenseDate { get; set; }
}
