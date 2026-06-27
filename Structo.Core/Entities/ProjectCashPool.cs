using Structo.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class ProjectCashPool : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public CashPoolSourceType SourceType { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalInjected { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal AvailableBalance { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
