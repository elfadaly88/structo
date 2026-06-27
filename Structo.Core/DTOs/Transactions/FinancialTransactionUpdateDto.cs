using System;
using Structo.Core.Enums;

namespace Structo.Core.DTOs.Transactions;

public class FinancialTransactionUpdateDto
{
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime? PaymentDate { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }
    public string? ReceiptPhotoUrl { get; set; }
}
