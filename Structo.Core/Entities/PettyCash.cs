using System;
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
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public bool IsSettled { get; set; }

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public Project? Project { get; set; }
    public User? IssuedToUser { get; set; }
}
