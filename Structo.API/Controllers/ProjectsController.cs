using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Projects;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController(StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;


    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProjectDto>>>> GetAll([FromQuery] Guid? tenantId = null)
    {
        var query = context.Projects.AsQueryable();
        var userRole = User.FindFirstValue(ClaimTypes.Role);
        var userTenantClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId")?.Value;

        if (userRole != "SuperAdmin")
        {
            if (string.IsNullOrEmpty(userTenantClaim) || !Guid.TryParse(userTenantClaim, out var userTenantId))
            {
                return Unauthorized(new ApiResponse<List<ProjectDto>> { Success = false, Message = "Tenant ID claim missing or invalid." });
            }
            query = query.Where(p => p.TenantId == userTenantId);
        }
        else if (tenantId.HasValue)
        {
            query = query.Where(p => p.TenantId == tenantId.Value);
        }

        var projects = await query
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                IsActive = p.IsActive,
                ManagerId = p.ManagerId
            })
            .ToListAsync();

        return Ok(new ApiResponse<List<ProjectDto>> { Data = projects, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin,TenantOwner,Manager")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Create([FromBody] ProjectCreateDto dto)
    {
        var userRole = User.FindFirstValue(ClaimTypes.Role);
        var userTenantClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId")?.Value;
        Guid tenantId;

        if (userRole == "SuperAdmin")
        {
            if (!dto.TenantId.HasValue || dto.TenantId.Value == Guid.Empty)
            {
                return BadRequest(new ApiResponse<ProjectDto> { Success = false, Message = "Tenant ID is required for SuperAdmin." });
            }
            tenantId = dto.TenantId.Value;
        }
        else
        {
            if (string.IsNullOrEmpty(userTenantClaim) || !Guid.TryParse(userTenantClaim, out tenantId))
            {
                return Unauthorized(new ApiResponse<ProjectDto> { Success = false, Message = "Tenant ID claim missing or invalid." });
            }
        }

        var project = new Project
        {
            TenantId = tenantId,
            Name = dto.Name,
            Description = dto.Description,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            ManagerId = dto.ManagerId
        };

        context.Projects.Add(project);
        await context.SaveChangesAsync();

        var resultDto = new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            IsActive = project.IsActive,
            ManagerId = project.ManagerId
        };

        return Ok(new ApiResponse<ProjectDto> { Data = resultDto, Message = "Project created successfully", CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> GetById([FromRoute] Guid id)
    {
        var project = await context.Projects
            .Where(p => p.Id == id)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                IsActive = p.IsActive,
                ManagerId = p.ManagerId
            })
            .FirstOrDefaultAsync();

        if (project == null)
            return NotFound(new ApiResponse<ProjectDto> { Success = false, Message = "Project not found" });

        return Ok(new ApiResponse<ProjectDto> { Data = project, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("{id}/client-view")]
    public async Task<ActionResult<ApiResponse<ProjectClientViewDto>>> GetClientView([FromRoute] Guid id)
    {
        var project = await context.Projects
            .Include(p => p.SitePhotos)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(new ApiResponse<ProjectClientViewDto> { Success = false, Message = "Project not found" });

        var dto = new ProjectClientViewDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            PublicDescription = project.Description,
            ProgressPercentage = 45, // Mocked progress calculation
            RecentPhotoUrls = project.SitePhotos
                .OrderByDescending(sp => sp.UploadedAt)
                .Take(5)
                .Select(sp => sp.PhotoUrl)
                .ToList()
        };

        return Ok(new ApiResponse<ProjectClientViewDto>
        {
            Data = dto,
            CurrentUserRole = CurrentUserRole
        });
    }
}
