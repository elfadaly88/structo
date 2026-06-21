using System;
using Structo.Core.Enums;

namespace Structo.Core.DTOs.Transactions;

public class FinancialTransactionCreateDto
{
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public TransactionType Type { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
}
