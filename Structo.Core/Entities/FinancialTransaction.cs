using System;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class FinancialTransaction : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    
    public TransactionType Type { get; set; }
    
    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public PaymentMethod? PaymentMethod { get; set; }
    public string? ReceiptPhotoUrl { get; set; }

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
}
