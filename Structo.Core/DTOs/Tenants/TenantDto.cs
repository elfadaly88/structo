using Structo.Core.Enums;
using System;

namespace Structo.Core.DTOs.Tenants;

public class TenantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public SubscriptionPlan SubscriptionPlan { get; set; }
    public int MaxActiveProjects { get; set; }
    public DateTime CreatedAt { get; set; }
}
