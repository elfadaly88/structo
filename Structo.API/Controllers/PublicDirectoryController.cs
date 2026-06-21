using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Tenants;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

public class PublicProjectDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Category { get; set; } = string.Empty;
    public List<string> SitePhotos { get; set; } = [];
}

public class PublicTenantPortfolioDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyDescription { get; set; } = string.Empty;
    public double Rating { get; set; }
    public List<PublicProjectDto> Projects { get; set; } = [];
}

[ApiController]
[Route("api/public")]
[AllowAnonymous]
public class PublicDirectoryController(StructoDbContext context) : ControllerBase
{
    [HttpGet("tenants")]
    public async Task<ActionResult<ApiResponse<List<TenantDto>>>> GetTenants(
        [FromQuery] string? region = null,
        [FromQuery] string? category = null,
        [FromQuery] double? minRating = null)
    {
        // Query tenants without default tenant filters
        var query = context.Tenants.IgnoreQueryFilters().AsQueryable();

        if (!string.IsNullOrEmpty(region))
        {
            query = query.Where(t => t.Region.ToLower() == region.ToLower());
        }

        if (minRating.HasValue)
        {
            query = query.Where(t => t.Rating >= minRating.Value);
        }

        var tenants = await query.ToListAsync();

        // Filter by project category tag if provided
        if (!string.IsNullOrEmpty(category))
        {
            var matchingTenants = new List<Tenant>();
            foreach (var t in tenants)
            {
                var projects = await context.Projects
                    .IgnoreQueryFilters()
                    .Where(p => p.TenantId == t.Id)
                    .ToListAsync();

                var hasMatchingProject = false;
                foreach (var p in projects)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(p.Description) && p.Description.StartsWith("{"))
                        {
                            var parsed = System.Text.Json.JsonDocument.Parse(p.Description);
                            var isPublic = parsed.RootElement.TryGetProperty("isPublicPortfolio", out var pubProp) && pubProp.GetBoolean();
                            var cat = parsed.RootElement.TryGetProperty("category", out var catProp) ? catProp.GetString() : string.Empty;

                            if (isPublic && string.Equals(cat, category, StringComparison.OrdinalIgnoreCase))
                            {
                                hasMatchingProject = true;
                                break;
                            }
                        }
                    }
                    catch { /* ignore invalid JSON */ }
                }

                if (hasMatchingProject)
                {
                    matchingTenants.Add(t);
                }
            }
            tenants = matchingTenants;
        }

        var dtos = tenants.Select(t => new TenantDto
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
            CreatedAt = t.CreatedAt
        }).ToList();

        return Ok(new ApiResponse<List<TenantDto>> { Data = dtos, Success = true });
    }

    [HttpGet("tenants/{id}/portfolio")]
    public async Task<ActionResult<ApiResponse<PublicTenantPortfolioDto>>> GetPortfolio([FromRoute] Guid id)
    {
        var tenant = await context.Tenants
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tenant == null)
            return NotFound(new ApiResponse<PublicTenantPortfolioDto> { Success = false, Message = "Company not found" });

        // Retrieve projects and include uploaded site photos
        var projects = await context.Projects
            .IgnoreQueryFilters()
            .Where(p => p.TenantId == tenant.Id)
            .Include(p => p.SitePhotos)
            .ToListAsync();

        var publicProjects = new List<PublicProjectDto>();

        foreach (var p in projects)
        {
            var isPublic = false;
            var category = "Other";
            var parsedDescription = p.Description;

            try
            {
                if (!string.IsNullOrEmpty(p.Description) && p.Description.StartsWith("{"))
                {
                    var parsed = System.Text.Json.JsonDocument.Parse(p.Description);
                    isPublic = parsed.RootElement.TryGetProperty("isPublicPortfolio", out var pubProp) && pubProp.GetBoolean();
                    category = parsed.RootElement.TryGetProperty("category", out var catProp) ? catProp.GetString() ?? "Other" : "Other";
                    parsedDescription = parsed.RootElement.TryGetProperty("description", out var descProp) ? descProp.GetString() ?? string.Empty : string.Empty;
                }
            }
            catch
            {
                // Fallback to defaults
            }

            // Only expose public portfolio projects to the public clients
            if (isPublic)
            {
                publicProjects.Add(new PublicProjectDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = parsedDescription,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Category = category,
                    SitePhotos = p.SitePhotos.Select(sp => sp.PhotoUrl).ToList()
                });
            }
        }

        var portfolio = new PublicTenantPortfolioDto
        {
            Id = tenant.Id,
            Name = tenant.Name,
            LogoUrl = tenant.LogoUrl,
            BannerUrl = tenant.BannerUrl,
            Region = tenant.Region,
            CompanyDescription = tenant.CompanyDescription,
            Rating = tenant.Rating,
            Projects = publicProjects
        };

        return Ok(new ApiResponse<PublicTenantPortfolioDto> { Data = portfolio, Success = true });
    }
}
