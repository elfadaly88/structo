using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Infrastructure.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,Accountant")]
public class FinancialTransactionsController(StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> Create([FromRoute] Guid projectId, [FromBody] FinancialTransactionCreateDto dto)
    {
        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            Amount = dto.Amount,
            Description = dto.Description,
            Type = dto.Type,
            TransactionDate = dto.TransactionDate
        };

        context.FinancialTransactions.Add(transaction);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Transaction added successfully", CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("mobile")]
    public async Task<ActionResult<ApiResponse<PaginatedList<FinancialTransactionMobileDto>>>> GetMobileTransactions(
        [FromRoute] Guid projectId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var query = context.FinancialTransactions
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.TransactionDate);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new FinancialTransactionMobileDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type.ToString(),
                Description = t.Description,
                TransactionDate = t.TransactionDate,
                PaymentDate = t.PaymentDate,
                PaymentMethod = t.PaymentMethod.HasValue ? t.PaymentMethod.ToString() : null,
                ReceiptPhotoUrl = t.ReceiptPhotoUrl
            })
            .ToListAsync();

        var paginatedList = new PaginatedList<FinancialTransactionMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(new ApiResponse<PaginatedList<FinancialTransactionMobileDto>>
        {
            Data = paginatedList,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpPost("inject-capital")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> InjectCapital([FromRoute] Guid projectId, [FromBody] CapitalInjectDto dto)
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
        {
            return Unauthorized(new ApiResponse<bool> { Success = false, Message = "Tenant ID claim missing or invalid." });
        }

        var pool = await context.ProjectCashPools
            .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == dto.SourceType);

        if (pool == null)
        {
            pool = new ProjectCashPool
            {
                ProjectId = projectId,
                TenantId = tenantId,
                SourceType = dto.SourceType,
                TotalInjected = 0,
                AvailableBalance = 0
            };
            context.ProjectCashPools.Add(pool);
        }

        pool.TotalInjected += dto.Amount;
        pool.AvailableBalance += dto.Amount;

        var transaction = new FinancialTransaction
        {
            ProjectId = projectId,
            TenantId = tenantId,
            Amount = dto.Amount,
            Description = $"Capital Injection ({dto.SourceType}) - {dto.Description}",
            Type = TransactionType.Income,
            TransactionDate = DateTime.UtcNow,
            PaymentDate = dto.PaymentDate ?? DateTime.UtcNow,
            PaymentMethod = dto.PaymentMethod,
            ReceiptPhotoUrl = dto.ReceiptPhotoUrl
        };

        context.FinancialTransactions.Add(transaction);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Capital injected successfully.", CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("cash-pools")]
    public async Task<ActionResult<ApiResponse<IEnumerable<ProjectCashPool>>>> GetCashPools([FromRoute] Guid projectId)
    {
        var pools = await context.ProjectCashPools
            .Where(p => p.ProjectId == projectId)
            .ToListAsync();
        
        return Ok(new ApiResponse<IEnumerable<ProjectCashPool>> { Data = pools, CurrentUserRole = CurrentUserRole });
    }

    /// <summary>
    /// Update a financial transaction. Restricted to TenantOwner and Accountant.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Update(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id,
        [FromBody] FinancialTransactionUpdateDto dto)
    {
        var transaction = await context.FinancialTransactions
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Transaction not found." });

        // Anti-tampering check: legally locked check
        if (transaction.Description.StartsWith("Petty Cash Settlement -", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "This financial transaction is closed and audited. It cannot be modified or deleted." });
        }

        transaction.Amount = dto.Amount;
        transaction.Description = dto.Description;
        if (dto.PaymentDate.HasValue)
            transaction.PaymentDate = dto.PaymentDate.Value;
        if (dto.PaymentMethod.HasValue)
            transaction.PaymentMethod = dto.PaymentMethod;
        if (dto.ReceiptPhotoUrl != null && transaction.ReceiptPhotoUrl != dto.ReceiptPhotoUrl)
        {
            if (!string.IsNullOrEmpty(transaction.ReceiptPhotoUrl))
            {
                _ = ImageUploadController.DeleteFileAsync(transaction.ReceiptPhotoUrl);
            }
            transaction.ReceiptPhotoUrl = dto.ReceiptPhotoUrl;
        }

        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Transaction updated successfully.", CurrentUserRole = CurrentUserRole });
    }

    /// <summary>
    /// Delete a financial transaction with automatic pool rollback.
    /// - If the transaction is a Capital Injection, deducts the amount from the
    ///   matching ProjectCashPool's AvailableBalance and TotalInjected.
    /// Restricted to TenantOwner and Accountant.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "TenantOwner,Accountant")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(
        [FromRoute] Guid projectId,
        [FromRoute] Guid id)
    {
        var transaction = await context.FinancialTransactions
            .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

        if (transaction == null)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Transaction not found." });

        // Anti-tampering check: legally locked check
        if (transaction.Description.StartsWith("Petty Cash Settlement -", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "This financial transaction is closed and audited. It cannot be modified or deleted." });
        }

        // ── Capital Injection Rollback ────────────────────────────────────────
        // Description pattern: "Capital Injection (OwnerCapital) - <notes>"
        // Detect by type=Income AND description prefix.
        if (transaction.Type == TransactionType.Income
            && transaction.Description.StartsWith("Capital Injection (", StringComparison.OrdinalIgnoreCase))
        {
            // Parse the SourceType from the description e.g. "(OwnerCapital)"
            var start = transaction.Description.IndexOf('(') + 1;
            var end = transaction.Description.IndexOf(')');
            if (start > 0 && end > start)
            {
                var sourceTypeStr = transaction.Description[start..end];
                if (Enum.TryParse<CashPoolSourceType>(sourceTypeStr, out var sourceType))
                {
                    var pool = await context.ProjectCashPools
                        .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.SourceType == sourceType);

                    if (pool != null)
                    {
                        // Guard against going negative — clamp to zero as a safety floor
                        pool.AvailableBalance = Math.Max(0, pool.AvailableBalance - transaction.Amount);
                        pool.TotalInjected = Math.Max(0, pool.TotalInjected - transaction.Amount);
                    }
                }
            }
        }
        // ─────────────────────────────────────────────────────────────────────

        if (!string.IsNullOrEmpty(transaction.ReceiptPhotoUrl))
        {
            _ = ImageUploadController.DeleteFileAsync(transaction.ReceiptPhotoUrl);
        }

        context.FinancialTransactions.Remove(transaction);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Transaction deleted and pool balance corrected.", CurrentUserRole = CurrentUserRole });
    }
}
