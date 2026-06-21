using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
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
        var pettyCash = new PettyCash
        {
            ProjectId = projectId,
            IssuedToUserId = dto.IssuedToUserId,
            Amount = dto.Amount,
            Reason = dto.Reason,
            IssuedAt = DateTime.UtcNow,
            IsSettled = false
        };

        context.PettyCashes.Add(pettyCash);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Petty cash issued successfully", CurrentUserRole = CurrentUserRole });
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
                IssuedTo = t.IssuedToUser != null ? t.IssuedToUser.FirstName + " " + t.IssuedToUser.LastName : string.Empty
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
}
