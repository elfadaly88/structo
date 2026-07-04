using System;
using System.Collections.Generic;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class Settlement : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Guid PettyCashId { get; set; }
    
    public decimal TotalAmount { get; set; }
    public SettlementStatus Status { get; set; } = SettlementStatus.Draft;
    
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }
    public Guid? ResolvedByUserId { get; set; }
    
    public decimal NetDifference { get; set; } // positive = due back to treasury, negative = due to employee (DueToEmployee)
    public string Comments { get; set; } = string.Empty;

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
    public PettyCash? PettyCash { get; set; }
    public User? ResolvedByUser { get; set; }
    
    public ICollection<SettlementLine> Lines { get; set; } = new List<SettlementLine>();
}
