using Microsoft.AspNetCore.Http;
using Structo.Core.Interfaces;
using System;
using System.Linq;

namespace Structo.API.Services;

public class TenantContextAccessor(IHttpContextAccessor httpContextAccessor) : ITenantContextAccessor
{
    public Guid? GetCurrentTenantId()
    {
        var isSuperAdmin = httpContextAccessor.HttpContext?.User?.IsInRole("SuperAdmin") ?? false;
        if (isSuperAdmin)
        {
            return null; // Global bypass for SuperAdmins
        }

        var tenantClaim = httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantClaim != null && Guid.TryParse(tenantClaim.Value, out var tenantId))
        {
            return tenantId;
        }
        return null;
    }
}
