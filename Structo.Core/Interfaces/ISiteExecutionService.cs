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

    Task<List<SiteDailyLogDto>> GetDailyLogsAsync(Guid projectId, Guid tenantId);

    Task<(bool Success, string Message, SiteDailyLogDto? Log)> UpsertDailyLogAsync(
        SiteDailyLogUpsertDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);

    Task<List<SitePunchItemDto>> GetPunchListAsync(
        Guid projectId, 
        Structo.Core.Entities.PunchItemStatus? status, 
        Guid tenantId);

    Task<(bool Success, string Message, SitePunchItemDto? Item)> CreatePunchItemAsync(
        SitePunchItemCreateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);

    Task<(bool Success, string Message)> UpdatePunchItemStatusAsync(
        Guid punchItemId, 
        SitePunchItemStatusUpdateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user);
}
