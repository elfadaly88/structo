using Structo.Core.Enums;

namespace Structo.Core.DTOs.Tenants;

public class TenantCreateDto
{
    public string Name { get; set; } = string.Empty;
    public SubscriptionPlan SubscriptionPlan { get; set; } = SubscriptionPlan.Free;
}
