using System;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class SiteTaskSettlementItem : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid SiteTaskId { get; set; }
    public SiteTask? SiteTask { get; set; }

    public Guid SettlementItemId { get; set; } // معرّف بند التسوية الفعلي (SettlementLine)
    public decimal AllocatedAmount { get; set; } // المبلغ المحمل على هذا البند
    public string? ExpenseDescription { get; set; }

    // Navigation property
    public SettlementLine? SettlementItem { get; set; }
}
