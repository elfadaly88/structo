using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Reports;
using Structo.Core.Interfaces;

namespace Structo.API.Controllers;

[ApiController]
[Authorize]
public class FinancialReportsController(
    IFinancialReportService financialReportService,
    IProjectAccessService projectAccessService,
    ITenantContextAccessor tenantContextAccessor) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
    private Guid? CurrentTenantId => tenantContextAccessor.GetCurrentTenantId();
    private Guid CurrentUserId
    {
        get
        {
            var idClaim = User.FindFirstValue("sub") 
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier) 
                ?? User.FindFirstValue("uid");
            return Guid.TryParse(idClaim, out var parsed) ? parsed : Guid.Empty;
        }
    }

    [HttpGet("/api/projects/{projectId}/full-report")]
    [Authorize(Roles = "TenantOwner,Manager,Accountant")]
    public async Task<ActionResult<ApiResponse<ProjectFullReportDto>>> GetSingleProjectFullReport(
        [FromRoute] Guid projectId,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        // 1. SuperAdmin Financial Privacy Wall & Role Scoping
        if (CurrentUserRole == "SuperAdmin")
            return Forbid();

        // 2. Authorization via CanManageProjectFinancialsAsync (TenantOwner, assigned Accountant, assigned Manager)
        if (!await projectAccessService.CanManageProjectFinancialsAsync(User, projectId))
        {
            return Forbid();
        }

        // 3. Strict Tenant Context Enforcement
        var tenantId = CurrentTenantId;
        if (!tenantId.HasValue)
        {
            return Unauthorized(new ApiResponse<ProjectFullReportDto>
            {
                Success = false,
                Message = "Tenant context missing or invalid."
            });
        }

        try
        {
            var report = await financialReportService.GetSingleProjectFullReportAsync(
                projectId, 
                startDate, 
                endDate, 
                tenantId.Value);

            if (report == null)
            {
                return NotFound(new ApiResponse<ProjectFullReportDto>
                {
                    Success = false,
                    Message = "Project not found or not within your tenant."
                });
            }

            return Ok(new ApiResponse<ProjectFullReportDto>
            {
                Data = report,
                Success = true,
                CurrentUserRole = CurrentUserRole
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpGet("/api/tenant/full-report")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<CompanyWideReportDto>>> GetCompanyWideFullReport(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] Guid? projectId = null)
    {
        // 1. SuperAdmin Financial Privacy Wall
        if (CurrentUserRole == "SuperAdmin")
            return Forbid();

        // 2. Strict Role Wall: Only TenantOwner and Accountant permitted
        if (CurrentUserRole != "TenantOwner" && CurrentUserRole != "Accountant")
            return Forbid();

        // 3. Strict Tenant Context Enforcement
        var tenantId = CurrentTenantId;
        if (!tenantId.HasValue)
        {
            return Unauthorized(new ApiResponse<CompanyWideReportDto>
            {
                Success = false,
                Message = "Tenant context missing or invalid."
            });
        }

        // 4. If Accountant passes optional projectId, verify they are assigned to it
        if (projectId.HasValue && CurrentUserRole == "Accountant")
        {
            var isAssigned = await projectAccessService.IsUserAssignedToProjectAsync(CurrentUserId, projectId.Value);
            if (!isAssigned)
            {
                return Forbid();
            }
        }

        try
        {
            var report = await financialReportService.GetCompanyWideFullReportAsync(
                tenantId.Value,
                CurrentUserId,
                CurrentUserRole,
                startDate,
                endDate,
                projectId);

            return Ok(new ApiResponse<CompanyWideReportDto>
            {
                Data = report,
                Success = true,
                CurrentUserRole = CurrentUserRole
            });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }
}
