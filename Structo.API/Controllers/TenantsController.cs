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
            .ToListAsync();

        var tenantIds = tenants.Select(t => t.Id).ToList();
        var tenantOwners = await context.Users.IgnoreQueryFilters()
            .Where(u => u.TenantId.HasValue && tenantIds.Contains(u.TenantId.Value) && u.Role == UserRole.TenantOwner)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();

        var tenantOwnerLookup = tenantOwners
            .GroupBy(u => u.TenantId!.Value)
            .ToDictionary(g => g.Key, g => g.First());

        var mappedTenants = tenants.Select(t => new TenantDto
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
                CreatedAt = t.CreatedAt,
                AdminEmail = tenantOwnerLookup.TryGetValue(t.Id, out var owner) ? owner.Email : null,
                AdminFirstName = tenantOwnerLookup.TryGetValue(t.Id, out var ownerFirst) ? ownerFirst.FirstName : null,
                AdminLastName = tenantOwnerLookup.TryGetValue(t.Id, out var ownerLast) ? ownerLast.LastName : null,
                Location = t.Location,
                MobileNumber = t.MobileNumber,
                CommercialRegister = t.CommercialRegister,
                TaxCard = t.TaxCard,
                NationalId = t.AccountType == "Freelancer" ? t.Users.Where(u => u.Role == UserRole.TenantOwner).Select(u => u.NationalId).FirstOrDefault() : null,
                SyndicateId = t.AccountType == "Freelancer" ? t.Users.Where(u => u.Role == UserRole.TenantOwner).Select(u => u.SyndicateId).FirstOrDefault() : null,
                ManualAddress = t.ManualAddress,
                MapLocationUrl = t.MapLocationUrl,
                AccountType = t.AccountType,
                Latitude = t.Latitude,
                Longitude = t.Longitude
            })
            .ToList();

        return Ok(new ApiResponse<List<TenantDto>>
        {
            Data = mappedTenants,
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

    [HttpPost("{id}/toggle-status")]
    public async Task<ActionResult<ApiResponse<string>>> ToggleStatus(Guid id)
    {
        var tenant = await context.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == id);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<string> { Success = false, Message = "Tenant not found." });
        }

        tenant.Status = tenant.Status == TenantStatus.Suspended ? TenantStatus.Active : TenantStatus.Suspended;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<string>
        {
            Data = tenant.Status.ToString(),
            Success = true,
            Message = $"Tenant status toggled successfully to {tenant.Status}."
        });
    }

    [HttpGet("/api/superadmin/tenants/{id}/profile")]
    public async Task<ActionResult<ApiResponse<object>>> GetTenantProfile(Guid id)
    {
        var tenant = await context.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == id);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Tenant not found." });
        }

        var projectCount = await context.Projects.IgnoreQueryFilters().CountAsync(p => p.TenantId == id);
        var userCount = await context.Users.IgnoreQueryFilters().CountAsync(u => u.TenantId == id && u.IsActive);
        
        var invoiceCount = await context.Set<SettlementLine>().IgnoreQueryFilters()
            .CountAsync(sl => sl.Settlement != null && sl.Settlement.TenantId == id && !string.IsNullOrEmpty(sl.InvoiceUrl));
        var photoCount = await context.SitePhotos.IgnoreQueryFilters().CountAsync(sp => sp.TenantId == id);
        
        double storageUsedMb = Math.Round((invoiceCount * 1.5) + (photoCount * 2.0), 2);

        var result = new
        {
            TotalProjectsCount = projectCount,
            ActiveUserCount = userCount,
            StorageUsedMb = storageUsedMb,
            GlobalRatingScore = tenant.Rating
        };

        return Ok(new ApiResponse<object>
        {
            Data = result,
            Success = true,
            Message = "Tenant audit profile retrieved successfully."
        });
    }
}