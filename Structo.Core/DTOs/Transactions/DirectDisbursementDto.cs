using Structo.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Transactions;

public class DirectDisbursementDto
{
    [Required]
    public Guid UserId { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public decimal Amount { get; set; }

    [Required]
    [MinLength(5)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public Guid SourcePoolId { get; set; }

    [Required]
    public PaymentMethod PaymentMethod { get; set; }
}
