using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "TenantOwner,Manager,Accountant,SiteEngineer,DesignEngineer")] // 🛡️ أضفنا باقي الـ Roles لضمان تجميع الـ Tokens
public class FinancialTransactionsController : ControllerBase
{
    private readonly IFinancialTransactionService _financialTransactionService;
    private readonly ILogger<FinancialTransactionsController> _logger; // 🚀 حقن الـ Logger

    // ✅ مشيد تقليدي يمنع خطأ الـ Compiler ويقهر ثغرة الـ Exception Exposure
    public FinancialTransactionsController(
        IFinancialTransactionService financialTransactionService,
        ILogger<FinancialTransactionsController> logger)
    {
        _financialTransactionService = financialTransactionService;
        _logger = logger;
    }
    private string CurrentUserRole => User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? User?.FindFirstValue("role") ?? User?.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
    private Guid CurrentUserId
    {
        get
        {
            var val = User?.Claims.FirstOrDefault(c => c.Type == "sub" || c.Type == ClaimTypes.NameIdentifier)?.Value;
            return Guid.TryParse(val, out var parsed) ? parsed : Guid.Empty;
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] FinancialTransactionCreateDto dto)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "User is not authenticated." });
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;

            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                _logger.LogWarning("🚨 Security Warning: Unauthorized attempt to CREATE transaction under Project {ProjectId} by User {UserId}", projectId, User.FindFirstValue(ClaimTypes.NameIdentifier));
                return Forbid();
            }
            var (success, message) = await _financialTransactionService.CreateTransactionAsync(projectId, dto, role);
            return Ok(new ApiResponse<bool> { Data = success, Message = message, CurrentUserRole = role });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database update error creating transaction for project {ProjectId}: {Details}", projectId, details);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating transaction for project {ProjectId}", projectId);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }

    [HttpGet("mobile")]
    [Authorize(Roles = "TenantOwner, Accountant, Manager, SiteEngineer, DesignEngineer")] // 🛡️ وسعنا الصلاحية لتشمل المهندسين في الموقع لرؤية عهدهم
    public async Task<ActionResult<ApiResponse<PaginatedList<FinancialTransactionMobileDto>>>> GetMobileTransactions(
        [FromRoute] Guid projectId,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>> { Success = false, Message = "User is not authenticated." });
            }

            // 🔒 حظر الاطلاع على المعاملات لغير المصرح لهم بالدخول للمشروع
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;
            var data = await _financialTransactionService.GetMobileTransactionsAsync(projectId, pageNumber, pageSize, role);
            return Ok(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>>
            {
                Data = data,
                Success = true,
                CurrentUserRole = role
            });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error fetching mobile transactions for project {ProjectId}: {Details}", projectId, details);
            return BadRequest(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching mobile transactions for project {ProjectId}", projectId);
            return BadRequest(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }

    [HttpPost("inject-capital")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> InjectCapital([FromRoute] Guid projectId, [FromBody] CapitalInjectDto dto)
    {
        try
        {
            // 🛡️ 1. Explicit Authentication Guard
            if (User?.Identity?.IsAuthenticated != true)
            {
                _logger.LogWarning("🚨 Security Warning: Unauthenticated call to InjectCapital for Project {ProjectId}", projectId);
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "User is not authenticated." });
            }

            // 🛡️ 2. Robust Claims Extraction & Validation
            var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? "TenantOwner";
            var tenantIdStr = User.Claims.FirstOrDefault(c => c.Type == "tenantId")?.Value;
            Guid? tenantId = Guid.TryParse(tenantIdStr, out var parsedTenantId) ? parsedTenantId : null;

            // 🔒 3. Project Access Verification
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            if (!tenantId.HasValue)
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant ID claim missing or invalid." });
            }

            var (success, message) = await _financialTransactionService.InjectCapitalAsync(projectId, dto, tenantId, userRole);

            if (!success)
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = userRole });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error injecting capital for project {ProjectId}: {Details}", projectId, details);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error injecting capital for project {ProjectId}", projectId);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }


    [HttpGet("cash-pools")]
    [Authorize(Roles = "TenantOwner, Accountant")]
    public async Task<ActionResult<ApiResponse<IEnumerable<ProjectCashPool>>>> GetCashPools([FromRoute] Guid projectId)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<IEnumerable<ProjectCashPool>> { Success = false, Message = "User is not authenticated." });
            }

            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;
            var pools = await _financialTransactionService.GetCashPoolsAsync(projectId, role);
            return Ok(new ApiResponse<IEnumerable<ProjectCashPool>> { Data = pools, Success = true, CurrentUserRole = role });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error fetching cash pools for project {ProjectId}: {Details}", projectId, details);
            return BadRequest(new ApiResponse<IEnumerable<ProjectCashPool>> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching cash pools for project {ProjectId}", projectId);
            return BadRequest(new ApiResponse<IEnumerable<ProjectCashPool>> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Update(
         [FromRoute] Guid projectId,
         [FromRoute] Guid id,
         [FromBody] FinancialTransactionUpdateDto dto)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "User is not authenticated." });
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;
            if (string.IsNullOrEmpty(role))
            {
                role = "TenantOwner";
            }

            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                _logger.LogWarning("🚨 Security Alert: Unauthorized attempt to UPDATE transaction {Id} under Project {ProjectId}", id, projectId);
                return Forbid();
            }

            var (success, message) = await _financialTransactionService.UpdateTransactionAsync(projectId, id, dto, role);

            if (!success)
            {
                if (message.Contains("not found"))
                    return NotFound(new ApiResponse<bool> { Success = false, Message = message });
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = role });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error updating transaction {Id} under project {ProjectId}: {Details}", id, projectId, details);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating transaction {Id} under project {ProjectId}", id, projectId);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "User is not authenticated." });
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;
            if (string.IsNullOrEmpty(role))
            {
                role = "TenantOwner";
            }

            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                _logger.LogWarning("🚨 Security Alert: Unauthorized attempt to DELETE transaction {Id} under Project {ProjectId}", id, projectId);
                return Forbid();
            }

            var (success, message) = await _financialTransactionService.DeleteTransactionAsync(projectId, id, role);

            if (!success)
            {
                if (message.Contains("not found"))
                    return NotFound(new ApiResponse<bool> { Success = false, Message = message });
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = role });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error deleting transaction {Id} under project {ProjectId}: {Details}", id, projectId, details);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting transaction {Id} under project {ProjectId}", id, projectId);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }

    [HttpPost("direct-disbursement")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> DirectDisbursement([FromRoute] Guid projectId, [FromBody] DirectDisbursementDto dto)
    {
        try
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "User is not authenticated." });
            }

            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role || c.Type == "role")?.Value ?? CurrentUserRole;
            var userId = CurrentUserId;

            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
            if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant ID claim missing or invalid." });
            }

            var (success, message) = await _financialTransactionService.DirectDisbursementAsync(projectId, dto, tenantId, role, userId);

            if (!success)
            {
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = role });
        }
        catch (DbUpdateException dbEx)
        {
            var details = dbEx.InnerException?.Message ?? dbEx.Message;
            _logger.LogError(dbEx, "Database error during direct disbursement under project {ProjectId}: {Details}", projectId, details);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Database Error: {details}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during performing direct disbursement under project {ProjectId}", projectId);
            return BadRequest(new ApiResponse<bool> { Success = false, Message = ex.InnerException?.Message ?? ex.Message });
        }
    }
}
