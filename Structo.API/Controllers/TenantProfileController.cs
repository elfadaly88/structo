using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Tenants;
using Structo.Infrastructure.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/tenant-profile")]
[Authorize]
public class TenantProfileController(StructoDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<TenantDto>>> GetProfile()
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<TenantDto> { Success = false, Message = "Tenant ID missing from claims" });
        }

        var tenant = await context.Tenants
            .Where(t => t.Id == tenantId)
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
                PersonalPhone = t.PersonalPhone,
                WhatsAppPhone = t.WhatsAppPhone,
                Location = t.Location,
                CommercialRegister = t.CommercialRegister,
                TaxCard = t.TaxCard,
                NationalId = t.Users.Where(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner).Select(u => u.NationalId).FirstOrDefault(),
                SyndicateId = t.Users.Where(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner).Select(u => u.SyndicateId).FirstOrDefault(),
                ManualAddress = t.ManualAddress,
                MapLocationUrl = t.MapLocationUrl,
                AccountType = t.AccountType,
                Latitude = t.Latitude,
                Longitude = t.Longitude,
                Rating = t.Rating,
                CreatedAt = t.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (tenant == null)
            return NotFound(new ApiResponse<TenantDto> { Success = false, Message = "Tenant not found" });

        return Ok(new ApiResponse<TenantDto> { Data = tenant, Success = true });
    }

    [HttpPut("update")]
    [Authorize(Roles = "TenantOwner")]
    public async Task<ActionResult<ApiResponse<TenantDto>>> Update([FromBody] TenantProfileUpdateDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<TenantDto> { Success = false, Message = "Tenant ID missing from claims" });
        }

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<TenantDto> { Success = false, Message = "Tenant not found" });

        tenant.Name = dto.Name;
        tenant.LogoUrl = dto.LogoUrl ?? string.Empty;
        tenant.BannerUrl = dto.BannerUrl ?? string.Empty;
        tenant.Region = dto.Region ?? string.Empty;
        tenant.CompanyDescription = dto.CompanyDescription ?? string.Empty;
        tenant.PersonalPhone = dto.PersonalPhone;
        tenant.WhatsAppPhone = dto.WhatsAppPhone;
        tenant.ManualAddress = dto.ManualAddress;
        tenant.MapLocationUrl = dto.MapLocationUrl;
        tenant.Latitude = dto.Latitude;
        tenant.Longitude = dto.Longitude;

        await context.SaveChangesAsync();

        var result = new TenantDto
        {
            Id = tenant.Id,
            Name = tenant.Name,
            SubscriptionPlan = tenant.SubscriptionPlan.ToString(),
            MaxActiveProjects = tenant.MaxActiveProjects,
            LogoUrl = tenant.LogoUrl,
            BannerUrl = tenant.BannerUrl,
            Region = tenant.Region,
            CompanyDescription = tenant.CompanyDescription,
            PersonalPhone = tenant.PersonalPhone,
            WhatsAppPhone = tenant.WhatsAppPhone,
            Location = tenant.Location,
            CommercialRegister = tenant.CommercialRegister,
            TaxCard = tenant.TaxCard,
            NationalId = tenant.Users.Where(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner).Select(u => u.NationalId).FirstOrDefault(),
            SyndicateId = tenant.Users.Where(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner).Select(u => u.SyndicateId).FirstOrDefault(),
            ManualAddress = tenant.ManualAddress,
            MapLocationUrl = tenant.MapLocationUrl,
            AccountType = tenant.AccountType,
            Latitude = tenant.Latitude,
            Longitude = tenant.Longitude,
            Rating = tenant.Rating,
            CreatedAt = tenant.CreatedAt
        };

        return Ok(new ApiResponse<TenantDto> { Data = result, Message = "Profile updated successfully", Success = true });
    }
}
