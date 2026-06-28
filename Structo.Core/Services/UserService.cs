using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

public class UserService(DbContext context, ITenantContextAccessor tenantContextAccessor) : IUserService
{
    public async Task<List<UserDto>> GetAllUsersAsync()
    {
        return await context.Set<User>()
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
    }

    public async Task<(bool Success, UserDto? Data, string Message)> CreateUserAsync(UserCreateDto dto, string currentUserRole)
    {
        var usersDbSet = context.Set<User>();
        var exists = await usersDbSet.IgnoreQueryFilters().AnyAsync(u => u.Email == dto.Email);
        
        if (exists)
        {
            return (false, null, "Email is already registered");
        }

        Guid? tenantId = tenantContextAccessor.GetCurrentTenantId();

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            TenantId = tenantId
        };

        usersDbSet.Add(user);
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

        return (true, resultDto, "User added successfully");
    }
}
