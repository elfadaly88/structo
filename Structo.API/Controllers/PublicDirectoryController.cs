using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Projects;
using Structo.Core.DTOs.Tenants;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
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

        // Only show Active tenants in the public directory
        query = query.Where(t => t.Status == TenantStatus.Active);

        if (!string.IsNullOrEmpty(region))
        {
            query = query.Where(t => t.Region.ToLower().Contains(region.ToLower()));
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

                var hasMatchingProject = projects.Any(p => p.IsPublicPortfolio && string.Equals(p.Category, category, StringComparison.OrdinalIgnoreCase));

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
            PersonalPhone = t.PersonalPhone,
            WhatsAppPhone = t.WhatsAppPhone,
            ManualAddress = t.ManualAddress,
            MapLocationUrl = t.MapLocationUrl,
            Latitude = t.Latitude,
            Longitude = t.Longitude,
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
            // Only expose public portfolio projects to the public clients
            if (p.IsPublicPortfolio)
            {
                publicProjects.Add(new PublicProjectDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Category = p.Category ?? "Other",
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

// =====================================================================
// ANONYMOUS CLIENT REVIEW CONTROLLER
// =====================================================================

[ApiController]
[Route("api/public/projects")]
[AllowAnonymous]
public class PublicProjectReviewController(IProjectService projectService) : ControllerBase
{
    [HttpPost("review/{token}")]
    public async Task<ActionResult<ApiResponse<bool>>> SubmitReview(
        [FromRoute] string token,
        [FromBody] ClientReviewSubmitDto dto)
    {
        var (success, message) = await projectService.SubmitClientReviewAsync(token, dto);
        if (!success) return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        return Ok(new ApiResponse<bool> { Data = true, Message = message });
    }
}

