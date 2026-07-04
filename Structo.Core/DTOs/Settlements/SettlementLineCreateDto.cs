using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Settlements;

public class SettlementLineCreateDto
{
    [Required]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public decimal Amount { get; set; }

    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string InvoiceUrl { get; set; } = string.Empty;
}
