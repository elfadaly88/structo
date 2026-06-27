using Structo.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Transactions;

public class CapitalInjectDto
{
    [Required]
    public CashPoolSourceType SourceType { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public decimal Amount { get; set; }

    [Required]
    [MinLength(5)]
    public string Description { get; set; } = string.Empty;

    public DateTime? PaymentDate { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }
    public string? ReceiptPhotoUrl { get; set; }
}
