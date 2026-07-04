using System;

namespace Structo.Core.Entities;

public class SettlementLine
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SettlementId { get; set; }
    
    public string Category { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string InvoiceUrl { get; set; } = string.Empty;

    // Navigation property
    public Settlement? Settlement { get; set; }
}
