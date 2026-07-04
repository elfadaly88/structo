using System;

namespace Structo.Core.DTOs.Settlements;

public class SettlementLineMobileDto
{
    public Guid Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string InvoiceUrl { get; set; } = string.Empty;
}
