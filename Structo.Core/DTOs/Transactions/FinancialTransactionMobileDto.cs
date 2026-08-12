using System;

namespace Structo.Core.DTOs.Transactions;

public class FinancialTransactionMobileDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; } = string.Empty; 
    public string Description { get; set; } = string.Empty;
    public DateTime TransactionDate { get; set; }
    public DateTime? PaymentDate { get; set; }
    public string? PaymentMethod { get; set; }
    public string? ReceiptPhotoUrl { get; set; }
    public bool IsLocked { get; set; }
    public bool CanEdit { get; set; } = true;
    public bool CanDelete { get; set; } = true;
}
