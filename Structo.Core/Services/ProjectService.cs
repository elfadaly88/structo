using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Projects;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Structo.Core.Services;

public class ProjectService(DbContext context, ITenantContextAccessor tenantContextAccessor) : IProjectService
{
    private string BuildLegacyDescription(Project p)
    {
        var obj = new JsonObject();
        obj["client"] = p.ClientName ?? string.Empty;
        obj["budget"] = p.Budget;
        obj["description"] = p.Description ?? string.Empty;
        obj["category"] = p.Category ?? string.Empty;
        obj["isPublic"] = p.IsPublicPortfolio;
        return obj.ToJsonString();
    }

    public async Task<List<ProjectDto>> GetAllProjectsAsync(Guid? tenantIdFilter, string userRole)
    {
        var query = context.Set<Project>().AsQueryable();

        if (userRole != "SuperAdmin")
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null)
            {
                throw new UnauthorizedAccessException("Tenant ID claim missing or invalid.");
            }
            query = query.Where(p => p.TenantId == currentTenantId.Value);
        }
        else if (tenantIdFilter.HasValue)
        {
            query = query.Where(p => p.TenantId == tenantIdFilter.Value);
        }

        var projects = await query
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = BuildLegacyDescription(p),
            StartDate = p.StartDate,
            EndDate = p.EndDate,
            IsActive = p.IsActive,
            ManagerId = p.ManagerId
        }).ToList();
    }

    public async Task<(bool Success, ProjectDto? Data, string Message)> CreateProjectAsync(ProjectCreateDto dto, string userRole)
    {
        Guid tenantId;

        if (userRole == "SuperAdmin")
        {
            if (!dto.TenantId.HasValue || dto.TenantId.Value == Guid.Empty)
            {
                return (false, null, "Tenant ID is required for SuperAdmin.");
            }
            tenantId = dto.TenantId.Value;
        }
        else
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null)
            {
                return (false, null, "Tenant ID claim missing or invalid.");
            }
            tenantId = currentTenantId.Value;
        }

        // Handle parsing legacy JSON description if frontend still sends it
        string innerDesc = dto.Description;
        decimal budget = 0;
        string client = string.Empty;

        if (!string.IsNullOrEmpty(dto.Description) && dto.Description.StartsWith('{'))
        {
            try
            {
                var json = JsonSerializer.Deserialize<JsonObject>(dto.Description);
                if (json != null)
                {
                    if (json.TryGetPropertyValue("client", out var cNode) && cNode != null) client = cNode.ToString();
                    if (json.TryGetPropertyValue("description", out var dNode) && dNode != null) innerDesc = dNode.ToString();
                    if (json.TryGetPropertyValue("budget", out var bNode) && bNode != null) decimal.TryParse(bNode.ToString(), out budget);
                }
            }
            catch { }
        }

        var project = new Project
        {
            TenantId = tenantId,
            Name = dto.Name,
            Description = innerDesc,
            Budget = budget,
            ClientName = client,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            ManagerId = dto.ManagerId
        };

        context.Set<Project>().Add(project);
        await context.SaveChangesAsync();

        var resultDto = new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = BuildLegacyDescription(project),
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            IsActive = project.IsActive,
            ManagerId = project.ManagerId
        };

        return (true, resultDto, "Project created successfully");
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return null;

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = BuildLegacyDescription(project),
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            IsActive = project.IsActive,
            ManagerId = project.ManagerId
        };
    }

    public async Task<ProjectClientViewDto?> GetProjectClientViewAsync(Guid id)
    {
        var project = await context.Set<Project>()
            .Include(p => p.SitePhotos)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null) return null;

        return new ProjectClientViewDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            PublicDescription = BuildLegacyDescription(project),
            ProgressPercentage = 45, // Mocked progress calculation
            RecentPhotoUrls = project.SitePhotos
                .OrderByDescending(sp => sp.UploadedAt)
                .Take(5)
                .Select(sp => sp.PhotoUrl)
                .ToList()
        };
    }

    public async Task<(bool Success, string Message)> ReviseBudgetAsync(Guid id, ProjectBudgetRevisionDto dto)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null)
            return (false, "Project not found.");

        decimal oldBudget = project.Budget;
        project.Budget = dto.NewBudget;

        var log = new ProjectBudgetLog
        {
            ProjectId = id,
            OldBudget = oldBudget,
            NewBudget = dto.NewBudget,
            ReasonForChange = dto.ReasonForChange,
            BoqFileUrl = dto.BoqFileUrl
        };

        context.Set<ProjectBudgetLog>().Add(log);
        await context.SaveChangesAsync();

        return (true, "Project budget revised and logged successfully.");
    }

    public async Task<List<ProjectBudgetLog>> GetBudgetHistoryAsync(Guid id)
    {
        return await context.Set<ProjectBudgetLog>()
            .Where(l => l.ProjectId == id)
            .OrderByDescending(l => l.ChangedAt)
            .ToListAsync();
    }
}
