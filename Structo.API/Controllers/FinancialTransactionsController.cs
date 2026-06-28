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
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,Accountant")]
public class FinancialTransactionsController(IFinancialTransactionService financialTransactionService) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] FinancialTransactionCreateDto dto)
    {
        var (success, message) = await financialTransactionService.CreateTransactionAsync(projectId, dto);
        return Ok(new ApiResponse<bool> { Data = success, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("mobile")]
    public async Task<ActionResult<ApiResponse<PaginatedList<FinancialTransactionMobileDto>>>> GetMobileTransactions(
        [FromRoute] Guid projectId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var data = await financialTransactionService.GetMobileTransactionsAsync(projectId, pageNumber, pageSize);
        return Ok(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>>
        {
            Data = data,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpPost("inject-capital")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> InjectCapital([FromRoute] Guid projectId, [FromBody] CapitalInjectDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        Guid? tenantId = tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var parsedId) ? parsedId : null;

        var (success, message) = await financialTransactionService.InjectCapitalAsync(projectId, dto, tenantId);

        if (!success)
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = message });

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("cash-pools")]
    public async Task<ActionResult<ApiResponse<IEnumerable<ProjectCashPool>>>> GetCashPools([FromRoute] Guid projectId)
    {
        var pools = await financialTransactionService.GetCashPoolsAsync(projectId);
        return Ok(new ApiResponse<IEnumerable<ProjectCashPool>> { Data = pools, CurrentUserRole = CurrentUserRole });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Update(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id,
        [FromBody] FinancialTransactionUpdateDto dto)
    {
        var (success, message) = await financialTransactionService.UpdateTransactionAsync(projectId, id, dto);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id)
    {
        var (success, message) = await financialTransactionService.DeleteTransactionAsync(projectId, id);

        if (!success)
        {
            if (message.Contains("not found"))
                return NotFound(new ApiResponse<bool> { Success = false, Message = message });
            return BadRequest(new ApiResponse<bool> { Success = false, Message = message });
        }

        return Ok(new ApiResponse<bool> { Data = true, Message = message, CurrentUserRole = CurrentUserRole });
    }
}
