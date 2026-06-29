using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController(IUserService userService, StructoDbContext context, INotificationEngine notificationEngine) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetAll()
    {
        var users = await userService.GetAllUsersAsync();

        return Ok(new ApiResponse<List<UserDto>> { Data = users, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost]
    [Authorize(Roles = "TenantOwner,SuperAdmin")]
    public async Task<ActionResult<ApiResponse<UserDto>>> Create([FromBody] UserCreateDto dto)
    {
        var (success, data, message) = await userService.CreateUserAsync(dto, CurrentUserRole);

        if (!success)
        {
            return BadRequest(new ApiResponse<UserDto> 
            { 
                Success = false, 
                Message = message 
            });
        }

        return Ok(new ApiResponse<UserDto> 
        { 
            Data = data, 
            Message = message, 
            CurrentUserRole = CurrentUserRole 
        });
    }

    [HttpPost("approve-tenant/{id}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult<ApiResponse<bool>>> ApproveTenant(Guid id)
    {
        var tenant = await context.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == id);
        if (tenant == null)
        {
            return NotFound(new ApiResponse<bool>
            {
                Success = false,
                Message = "Tenant not found.",
                CurrentUserRole = CurrentUserRole
            });
        }

        if (tenant.Status == TenantStatus.Active)
        {
            return BadRequest(new ApiResponse<bool>
            {
                Success = false,
                Message = "Tenant is already active.",
                CurrentUserRole = CurrentUserRole
            });
        }

        tenant.Status = TenantStatus.Active;
        
        switch (tenant.SubscriptionPlan)
        {
            case SubscriptionPlan.Free:
                tenant.MaxActiveProjects = 2;
                break;
            case SubscriptionPlan.Standard:
                tenant.MaxActiveProjects = 10;
                break;
            case SubscriptionPlan.Premium:
                tenant.MaxActiveProjects = 50;
                break;
            default:
                tenant.MaxActiveProjects = 2;
                break;
        }

        await context.SaveChangesAsync();

        // Trigger Notification Engine (WORKFLOW C)
        _ = Task.Run(() => notificationEngine.RaiseAccountActivationNotificationAsync(id));

        return Ok(new ApiResponse<bool>
        {
            Data = true,
            Success = true,
            Message = "Tenant approved and activated successfully.",
            CurrentUserRole = CurrentUserRole
        });
    }
}
