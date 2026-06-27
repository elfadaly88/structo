using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,Accountant,SiteEngineer,DesignEngineer")]
public class PettyCashController(StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] PettyCashCreateDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var pettyCash = new PettyCash
        {
            ProjectId = projectId,
            TenantId = tenantId,
            IssuedToUserId = dto.IssuedToUserId,
            Amount = dto.Amount,
            Reason = dto.Reason,
            Category = dto.Category ?? string.Empty,
            Status = "Pending",
            IssuedAt = DateTime.UtcNow,
            IsSettled = false,
            SourcePoolId = dto.SourcePoolId
        };

        if (User.IsInRole("TenantOwner") && dto.SourcePoolId.HasValue)
        {
            var pool = await context.ProjectCashPools.FirstOrDefaultAsync(p => p.Id == dto.SourcePoolId.Value && p.ProjectId == projectId);
            if (pool == null)
                return BadRequest(new ApiResponse<bool> { Success = false, Message = "Selected cash pool not found." });

            if (pettyCash.Amount > pool.AvailableBalance)
            {
                return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Insufficient funds in selected pool. Available is {pool.AvailableBalance} EGP." });
            }
            pettyCash.Status = "Issued";
            pool.AvailableBalance -= pettyCash.Amount;
        }

        context.PettyCashes.Add(pettyCash);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash request submitted successfully", CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Approve([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashApproveDto dto)
    {
        var pettyCash = await context.PettyCashes.FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
        if (pettyCash == null)
        {
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Petty cash record not found." });
        }

        if (pettyCash.Status != "Pending")
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Only pending petty cash requests can be approved." });
        }

        var pool = await context.ProjectCashPools.FirstOrDefaultAsync(p => p.Id == dto.SourcePoolId && p.ProjectId == projectId);
        if (pool == null)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Selected cash pool not found." });
        }

        if (pettyCash.Amount > pool.AvailableBalance)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = $"Insufficient funds. Available pool is {pool.AvailableBalance} EGP." });
        }

        pettyCash.Status = "Issued";
        pettyCash.SourcePoolId = pool.Id;
        pool.AvailableBalance -= pettyCash.Amount;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash approved and issued successfully.", CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Reject([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashRejectDto dto)
    {
        var pettyCash = await context.PettyCashes.FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
        if (pettyCash == null)
        {
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Petty cash record not found." });
        }

        if (pettyCash.Status != "Pending")
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Only pending petty cash requests can be rejected." });
        }

        pettyCash.Status = "Rejected";
        pettyCash.Comments = dto.Comments ?? string.Empty;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash request rejected.", CurrentUserRole = CurrentUserRole });
    }

    [HttpPost("{id}/settle")]
    public async Task<ActionResult<ApiResponse<bool>>> Settle([FromRoute] Guid projectId, [FromRoute] Guid id, [FromBody] PettyCashSettleDto dto, [FromServices] IPettyCashService pettyCashService)
    {
        var result = await pettyCashService.SettlePettyCashAsync(projectId, id, dto);

        return Ok(new ApiResponse<bool>
        {
            Data = result,
            Message = "Petty cash successfully settled.",
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpGet("mobile")]
    public async Task<ActionResult<ApiResponse<PaginatedList<PettyCashMobileDto>>>> GetMobilePettyCash(
        [FromRoute] Guid projectId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var query = context.PettyCashes
            .Include(p => p.IssuedToUser)
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.IssuedAt);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new PettyCashMobileDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Reason = t.Reason,
                IssuedAt = t.IssuedAt,
                IsSettled = t.IsSettled,
                IssuedTo = t.IssuedToUser != null ? t.IssuedToUser.FirstName + " " + t.IssuedToUser.LastName : string.Empty,
                Status = t.Status,
                Category = t.Category,
                Comments = t.Comments,
                ReceiptPhotoUrl = t.ReceiptPhotoUrl,
                SettlementPaymentMethod = t.SettlementPaymentMethod.HasValue ? t.SettlementPaymentMethod.Value.ToString() : string.Empty,
                ExpenseDate = t.ExpenseDate
            })
            .ToListAsync();

        var paginatedList = new PaginatedList<PettyCashMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(new ApiResponse<PaginatedList<PettyCashMobileDto>>
        {
            Data = paginatedList,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Update(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id,
        [FromBody] PettyCashUpdateDto dto)
    {
        var pettyCash = await context.PettyCashes
            .FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);

        if (pettyCash == null)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Petty cash record not found." });

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "This financial transaction is closed and audited. It cannot be modified or deleted." });

        pettyCash.Amount = dto.Amount;
        pettyCash.Reason = dto.Reason;
        pettyCash.Category = dto.Category;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash updated successfully.", CurrentUserRole = CurrentUserRole });
    }

    /// <summary>
    /// Delete a petty cash record with automatic pool refund.
    /// - If the record is Issued and has a SourcePoolId, the amount is refunded
    ///   back to the pool's AvailableBalance to maintain ledger equilibrium.
    /// Restricted to TenantOwner and Accountant.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id)
    {
        var pettyCash = await context.PettyCashes
            .FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);

        if (pettyCash == null)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Petty cash record not found." });

        if (pettyCash.IsSettled || pettyCash.Status == "Settled")
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "This financial transaction is closed and audited. It cannot be modified or deleted." });

        // ── Cash Advance Pool Refund ──────────────────────────────────────────
        // If the voucher was already Issued (funds already deducted from pool),
        // refund the full issued amount back to the originating pool.
        if (pettyCash.Status == "Issued" && pettyCash.SourcePoolId.HasValue)
        {
            var pool = await context.ProjectCashPools
                .FirstOrDefaultAsync(p => p.Id == pettyCash.SourcePoolId.Value && p.ProjectId == projectId);

            if (pool != null)
            {
                pool.AvailableBalance += pettyCash.Amount;
            }
        }
        // ─────────────────────────────────────────────────────────────────────

        if (!string.IsNullOrEmpty(pettyCash.ReceiptPhotoUrl))
        {
            _ = ImageUploadController.DeleteFileAsync(pettyCash.ReceiptPhotoUrl);
        }

        context.PettyCashes.Remove(pettyCash);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash deleted and pool balance restored.", CurrentUserRole = CurrentUserRole });
    }

    private async Task<decimal> GetAvailablePoolAsync(Guid tenantId)
    {
        var income = await context.FinancialTransactions
            .IgnoreQueryFilters()
            .Where(t => t.TenantId == tenantId && t.Type == TransactionType.Income)
            .SumAsync(t => t.Amount);

        var expense = await context.FinancialTransactions
            .IgnoreQueryFilters()
            .Where(t => t.TenantId == tenantId && t.Type == TransactionType.Expense)
            .SumAsync(t => t.Amount);

        var lockedPettyCash = await context.PettyCashes
            .IgnoreQueryFilters()
            .Where(p => p.TenantId == tenantId && p.Status == "Issued" && !p.IsSettled)
            .SumAsync(p => p.Amount);

        return income - expense - lockedPettyCash;
    }
}
