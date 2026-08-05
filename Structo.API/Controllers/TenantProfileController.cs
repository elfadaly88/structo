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
using Structo.Core.Enums;

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
            .Include(t => t.Users)
            .Where(t => t.Id == tenantId)
            .FirstOrDefaultAsync();

        if (tenant == null)
            return NotFound(new ApiResponse<TenantDto> { Success = false, Message = "Tenant not found" });

        var owner = tenant.Users.FirstOrDefault(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner);

        var dto = new TenantDto
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
            GovernorateId = !string.IsNullOrWhiteSpace(tenant.Location) ? tenant.Location : tenant.Region,
            GovernorateName = !string.IsNullOrWhiteSpace(tenant.Location) ? tenant.Location : tenant.Region,
            CommercialRegister = tenant.CommercialRegister,
            TaxCard = tenant.TaxCard,
            NationalId = owner?.NationalId,
            SyndicateId = owner?.SyndicateId,
            AdminEmail = owner?.Email,
            AdminFirstName = owner?.FirstName,
            AdminLastName = owner?.LastName,
            ManualAddress = tenant.ManualAddress,
            Address = tenant.ManualAddress,
            MapLocationUrl = tenant.MapLocationUrl,
            AccountType = tenant.AccountType,
            Latitude = tenant.Latitude,
            Longitude = tenant.Longitude,
            Lat = tenant.Latitude,
            Lng = tenant.Longitude,
            Rating = tenant.Rating,
            CreatedAt = tenant.CreatedAt
        };

        return Ok(new ApiResponse<TenantDto> { Data = dto, Success = true });
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

        var tenant = await context.Tenants
            .Include(t => t.Users)
            .FirstOrDefaultAsync(t => t.Id == tenantId);

        if (tenant == null)
            return NotFound(new ApiResponse<TenantDto> { Success = false, Message = "Tenant not found" });

        if (!string.IsNullOrWhiteSpace(dto.Name)) tenant.Name = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Name) ?? string.Empty;
        if (dto.LogoUrl != null) tenant.LogoUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.LogoUrl) ?? string.Empty;
        if (dto.BannerUrl != null) tenant.BannerUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.BannerUrl) ?? string.Empty;
        
        var locationVal = dto.GovernorateId ?? dto.Location ?? dto.Region;
        if (!string.IsNullOrWhiteSpace(locationVal))
        {
            var sanitizedLocation = Structo.Core.Helpers.HtmlSanitizer.Sanitize(locationVal) ?? string.Empty;
            tenant.Location = sanitizedLocation;
            tenant.Region = sanitizedLocation;
        }

        if (dto.CompanyDescription != null) tenant.CompanyDescription = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CompanyDescription) ?? string.Empty;
        if (dto.PersonalPhone != null) tenant.PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone);
        if (dto.WhatsAppPhone != null) tenant.WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone);

        if (dto.CommercialRegister != null) tenant.CommercialRegister = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CommercialRegister);
        if (dto.TaxCard != null) tenant.TaxCard = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.TaxCard);

        var addressVal = dto.Address ?? dto.ManualAddress;
        if (addressVal != null)
        {
            tenant.ManualAddress = Structo.Core.Helpers.HtmlSanitizer.Sanitize(addressVal);
        }

        if (dto.MapLocationUrl != null)
        {
            tenant.MapLocationUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.MapLocationUrl);
        }

        // Geographic Data Integrity Rule: retain/update high precision Lat/Lng
        if (dto.Latitude.HasValue) tenant.Latitude = dto.Latitude.Value;
        else if (dto.Lat.HasValue) tenant.Latitude = dto.Lat.Value;

        if (dto.Longitude.HasValue) tenant.Longitude = dto.Longitude.Value;
        else if (dto.Lng.HasValue) tenant.Longitude = dto.Lng.Value;

        // Update linked TenantOwner user properties
        var ownerUser = tenant.Users.FirstOrDefault(u => u.Role == Structo.Core.Enums.UserRole.TenantOwner);
        if (ownerUser != null)
        {
            if (dto.NationalId != null) ownerUser.NationalId = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.NationalId);
            if (dto.SyndicateId != null) ownerUser.SyndicateId = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.SyndicateId);
        }

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
            GovernorateId = !string.IsNullOrWhiteSpace(tenant.Location) ? tenant.Location : tenant.Region,
            GovernorateName = !string.IsNullOrWhiteSpace(tenant.Location) ? tenant.Location : tenant.Region,
            CommercialRegister = tenant.CommercialRegister,
            TaxCard = tenant.TaxCard,
            NationalId = ownerUser?.NationalId,
            SyndicateId = ownerUser?.SyndicateId,
            AdminEmail = ownerUser?.Email,
            AdminFirstName = ownerUser?.FirstName,
            AdminLastName = ownerUser?.LastName,
            ManualAddress = tenant.ManualAddress,
            Address = tenant.ManualAddress,
            MapLocationUrl = tenant.MapLocationUrl,
            AccountType = tenant.AccountType,
            Latitude = tenant.Latitude,
            Longitude = tenant.Longitude,
            Lat = tenant.Latitude,
            Lng = tenant.Longitude,
            Rating = tenant.Rating,
            CreatedAt = tenant.CreatedAt
        };

        return Ok(new ApiResponse<TenantDto> { Data = result, Message = "Profile updated successfully", Success = true });
    }

    [HttpGet("quota")]
    public async Task<ActionResult<ApiResponse<TenantQuotaDto>>> GetQuota()
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<TenantQuotaDto> { Success = false, Message = "Tenant ID missing from claims" });
        }

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<TenantQuotaDto> { Success = false, Message = "Tenant not found" });

        var allowedProjects = tenant.MaxActiveProjects;

        // ─── Total Lifetime Slot Logic ─────────────────────────────────────────────
        // Count ALL projects ever created — closed projects do NOT free up slots.
        var usedProjects = await context.Projects
            .CountAsync(p => p.TenantId == tenantId);

        var data = new TenantQuotaDto
        {
            UsedProjects  = usedProjects,
            AllowedProjects = allowedProjects
        };

        return Ok(new ApiResponse<TenantQuotaDto> { Data = data, Success = true });
    }
}
