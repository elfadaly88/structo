using Structo.Core.DTOs.Projects;
using Structo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllProjectsAsync(Guid? tenantIdFilter, string userRole);
    Task<(bool Success, ProjectDto? Data, string Message)> CreateProjectAsync(ProjectCreateDto dto, string userRole);
    Task<(bool Success, ProjectDto? Data, string Message)> UpdateProjectAsync(Guid id, ProjectCreateDto dto, string userRole);
    Task<ProjectDto?> GetProjectByIdAsync(Guid id);
    Task<ProjectClientViewDto?> GetProjectClientViewAsync(Guid id);
    Task<(bool Success, string Message)> ReviseBudgetAsync(Guid id, ProjectBudgetRevisionDto dto);
    Task<List<ProjectBudgetLog>> GetBudgetHistoryAsync(Guid id);

    // --- Closeout workflow ---
    Task<ProjectReconciliationReportDto?> GetReconciliationReportAsync(Guid id, Guid tenantId);
    Task<(bool Success, string Message)> FreezeProjectAsync(Guid id, Guid tenantId, string userRole);
    Task<(bool Success, string Message)> FinalCloseoutAsync(Guid id, Guid tenantId, string userRole);
    Task<(bool Success, string Message)> SubmitClientReviewAsync(string token, ClientReviewSubmitDto dto);
}



