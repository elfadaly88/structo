using System;

namespace Structo.Core.DTOs.Tenants;

public class TenantQuotaDto
{
    public int UsedProjects { get; set; }
    public int AllowedProjects { get; set; }
}
