using System;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class PettyCash : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Guid IssuedToUserId { get; set; }
    
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Issued, Rejected, SettlePending, Settled
    public string Category { get; set; } = string.Empty; // Cement, Plumbing, Scaffolding, etc.
    public string Urgency { get; set; } = "Medium"; // Low, Medium, High
    public string Comments { get; set; } = string.Empty; // Rejection/auditing notes
    public decimal SpentAmount { get; set; }
    public decimal ReturnAmount { get; set; }
    public string ReceiptPhotoUrl { get; set; } = string.Empty;

    public Guid? SourcePoolId { get; set; }
    public ProjectCashPool? SourcePool { get; set; }
    
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public bool IsSettled { get; set; }
    public PaymentMethod? SettlementPaymentMethod { get; set; }
    public DateTime? ExpenseDate { get; set; }

    public bool IsReimbursement { get; set; }

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
    public User? IssuedToUser { get; set; }
}
