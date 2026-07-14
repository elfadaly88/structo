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
    private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] FinancialTransactionCreateDto dto)
    {
        if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
        {
            _logger.LogWarning("🚨 Security Warning: Unauthorized attempt to CREATE transaction under Project {ProjectId} by User {UserId}", projectId, User.FindFirstValue(ClaimTypes.NameIdentifier));
            return Forbid();
        }
        var (success, message) = await _financialTransactionService.CreateTransactionAsync(projectId, dto, CurrentUserRole);
        return Ok(new ApiResponse<bool> { Data = success, Message = message, CurrentUserRole = CurrentUserRole });
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
            // 🔒 حظر الاطلاع على المعاملات لغير المصرح لهم بالدخول للمشروع
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var data = await _financialTransactionService.GetMobileTransactionsAsync(projectId, pageNumber, pageSize, CurrentUserRole);
            return Ok(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>>
            {
                Data = data,
                Success = true,
                CurrentUserRole = CurrentUserRole
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching mobile transactions for project {ProjectId}", projectId);
            return StatusCode(500, new ApiResponse<PaginatedList<FinancialTransactionMobileDto>> { Success = false, Message = "An internal error occurred." });
        }
    }

    [HttpPost("inject-capital")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> InjectCapital([FromRoute] Guid projectId, [FromBody] CapitalInjectDto dto)
    {
        try
        {
            // 🔒 حظر حقن أموال في مشروع لا ينتمي لنفس الـ Tenant
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
            Guid? tenantId = tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var parsedId) ? parsedId : null;

            var (success, message) = await _financialTransactionService.InjectCapitalAsync(projectId, dto, tenantId, CurrentUserRole);

            if (!success)
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error injecting capital for project {ProjectId}", projectId);
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = "An internal error occurred." });
        }
    }


    [HttpGet("cash-pools")]
    [Authorize(Roles = "TenantOwner, Accountant")]
    public async Task<ActionResult<ApiResponse<IEnumerable<ProjectCashPool>>>> GetCashPools([FromRoute] Guid projectId)
    {
        try
        {
            // 🔒 فحص الصلاحية الأمنية قبل عرض أرصدة الخزائن
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var pools = await _financialTransactionService.GetCashPoolsAsync(projectId, CurrentUserRole);
            return Ok(new ApiResponse<IEnumerable<ProjectCashPool>> { Data = pools, Success = true, CurrentUserRole = CurrentUserRole });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching cash pools for project {ProjectId}", projectId);
            return StatusCode(500, new ApiResponse<IEnumerable<ProjectCashPool>> { Success = false, Message = "An internal error occurred." });
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
            // 🔒 صمام الأمان لمنع اختراق الـ BOLA والتلاعب بالحركات المالية الخارجية
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                _logger.LogWarning("🚨 Security Alert: Unauthorized attempt to UPDATE transaction {Id} under Project {ProjectId}", id, projectId);
                return Forbid();
            }

            var (success, message) = await _financialTransactionService.UpdateTransactionAsync(projectId, id, dto, CurrentUserRole);

            if (!success)
            {
                if (message.Contains("not found"))
                    return NotFound(new ApiResponse<bool> { Success = false, Message = message });
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating transaction {Id} under project {ProjectId}", id, projectId);
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = "An internal error occurred." });
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
            // 🔒 حظر حذف الحركات المالية خارج النطاق القانوني للمستخدم
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                _logger.LogWarning("🚨 Security Alert: Unauthorized attempt to DELETE transaction {Id} under Project {ProjectId}", id, projectId);
                return Forbid();
            }

            var (success, message) = await _financialTransactionService.DeleteTransactionAsync(projectId, id, CurrentUserRole);

            if (!success)
            {
                if (message.Contains("not found"))
                    return NotFound(new ApiResponse<bool> { Success = false, Message = message });
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting transaction {Id} under project {ProjectId}", id, projectId);
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = "An internal error occurred." });
        }
    }

    [HttpPost("direct-disbursement")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> DirectDisbursement([FromRoute] Guid projectId, [FromBody] DirectDisbursementDto dto)
    {
        try
        {
            // 🔒 حظر تمويل أو شحن صندوق مباشر لمشروع لا يملكه الـ Tenant
            if (!await _financialTransactionService.UserHasAccessToProjectAsync(User, projectId))
            {
                return Forbid();
            }

            var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
            if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
            {
                return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant ID claim missing or invalid." });
            }

            var (success, message) = await _financialTransactionService.DirectDisbursementAsync(projectId, dto, tenantId, CurrentUserRole);

            if (!success)
            {
                return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<bool> { Data = true, Success = true, Message = message, CurrentUserRole = CurrentUserRole });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during performing direct disbursement under project {ProjectId}", projectId);
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = "An internal error occurred." });
        }
    }
}
