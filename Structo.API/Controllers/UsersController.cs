using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "TenantOwner,SuperAdmin")]
public class UsersController(StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetAll()
    {
        var users = await context.Users
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();

        return Ok(new ApiResponse<List<UserDto>> { Data = users, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<UserDto>>> Create([FromBody] UserCreateDto dto)
    {
        // Check if email already exists (ignoring tenant filter to be globally unique)
        var exists = await context.Users.IgnoreQueryFilters().AnyAsync(u => u.Email == dto.Email);
        if (exists)
        {
            return BadRequest(new ApiResponse<UserDto> 
            { 
                Success = false, 
                Message = "Email is already registered" 
            });
        }

        // Determine tenant ID for the new user.
        // For TenantOwner, it should be their own TenantId.
        Guid? tenantId = context.CurrentTenantId;
        if (tenantId == null && CurrentUserRole == "TenantOwner")
        {
            // Fallback: check claims
            var tenantClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
            if (tenantClaim != null && Guid.TryParse(tenantClaim.Value, out var parsedId))
            {
                tenantId = parsedId;
            }
        }

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            TenantId = tenantId
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var resultDto = new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role,
            CreatedAt = user.CreatedAt
        };

        return Ok(new ApiResponse<UserDto> 
        { 
            Data = resultDto, 
            Message = "User added successfully", 
            CurrentUserRole = CurrentUserRole 
        });
    }
}
