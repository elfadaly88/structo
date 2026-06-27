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
using Structo.Core.Enums;

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
                SubscriptionPlan = t.SubscriptionPlan.ToString(),
                MaxActiveProjects = t.MaxActiveProjects,
                LogoUrl = t.LogoUrl,
                BannerUrl = t.BannerUrl,
                Region = t.Region,
                CompanyDescription = t.CompanyDescription,
                Rating = t.Rating,
                Status = t.Status.ToString(),
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

    [HttpPost("{id}/provision")]
    public async Task<ActionResult<ApiResponse<bool>>> Provision(Guid id)
    {
        var tenant = await context.Tenants.FindAsync(id);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Tenant not found" });
        }

        if (tenant.Status == TenantStatus.Active)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Tenant is already provisioned and active." });
        }

        tenant.Status = TenantStatus.Active;
        
        switch (tenant.SubscriptionPlan)
        {
            case SubscriptionPlan.Free:
                tenant.MaxActiveProjects = 2;
                break;
            case SubscriptionPlan.Standard:
                tenant.MaxActiveProjects = 10;
                break;
            case SubscriptionPlan.Premium:
                tenant.MaxActiveProjects = 50;
                break;
            default:
                tenant.MaxActiveProjects = 2;
                break;
        }

        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool>
        {
            Data = true,
            Success = true,
            Message = "Tenant has been provisioned and is now Active."
        });
    }
}
