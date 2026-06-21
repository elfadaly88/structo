using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
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
                TransactionDate = t.TransactionDate
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
}
