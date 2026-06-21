using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Tenants;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "SuperAdmin")]
public class TenantsController(StructoDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<ApiResponse<Guid>>> Create([FromBody] TenantCreateDto dto)
    {
        var tenant = new Tenant
        {
            Name = dto.Name,
            SubscriptionPlan = dto.SubscriptionPlan,
            CreatedAt = DateTime.UtcNow
        };

        context.Tenants.Add(tenant);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<Guid> 
        { 
            Data = tenant.Id, 
            Message = "Tenant created successfully. Copy this GUID and use it as your CurrentTenantId to test other endpoints!", 
            Success = true 
        });
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<TenantDto>>>> GetAll()
    {
        var tenants = await context.Tenants
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TenantDto
            {
                Id = t.Id,
                Name = t.Name,
                SubscriptionPlan = t.SubscriptionPlan,
                MaxActiveProjects = t.MaxActiveProjects,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return Ok(new ApiResponse<List<TenantDto>>
        {
            Data = tenants,
            Success = true,
            Message = "Tenants retrieved successfully"
        });
    }
}
