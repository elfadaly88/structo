using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Structo.Core.DTOs.SiteOperations;

namespace Structo.Core.Interfaces;

public interface ISiteExecutionService
{
    Task<List<AssignedEngineerDto>> GetAssignedEngineersAsync(Guid projectId, Guid tenantId);
    
    Task<ProjectSiteTasksResponseDto> GetProjectSiteTasksAsync(Guid projectId, Guid tenantId);
    
    Task<List<AvailableSettlementLineDto>> GetAvailableSettlementLinesAsync(Guid projectId, Guid tenantId);
    
    Task<(bool Success, string Message, SiteTaskDto? Task)> CreateSiteTaskAsync(
        SiteTaskCreateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);
    
    Task<(bool Success, string Message)> UpdateTaskProgressAsync(
        Guid taskId, 
        SiteTaskProgressUpdateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);
    
    Task<(bool Success, string Message)> LinkSettlementItemsAsync(
        Guid taskId, 
        LinkSettlementItemsDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);
    
    Task<PublicProjectTrackerDto?> GetPublicProjectTrackerAsync(string shareToken);
}
