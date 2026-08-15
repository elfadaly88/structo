using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Enums;
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
                IsActive = u.IsActive,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                PersonalPhone = u.PersonalPhone,
                WhatsAppPhone = u.WhatsAppPhone,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<(bool Success, UserDto? Data, string Message)> CreateUserAsync(UserCreateDto dto, string currentUserRole, Guid? assignedByUserId = null)
    {
        var usersDbSet = context.Set<User>();
        var normalizedEmail = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Email).ToLower().Trim();
        var exists = await usersDbSet.IgnoreQueryFilters().AnyAsync(u => u.Email == normalizedEmail);
        
        if (exists)
        {
            return (false, null, "Email is already registered");
        }

        Guid? tenantId = tenantContextAccessor.GetCurrentTenantId();
        if (!tenantId.HasValue && currentUserRole != "SuperAdmin")
        {
            return (false, null, "Tenant ID claim missing or invalid.");
        }

        var executionStrategy = context.Database.CreateExecutionStrategy();
        return await executionStrategy.ExecuteAsync(async () =>
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var user = new User
                {
                    FirstName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.FirstName),
                    LastName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.LastName),
                    Email = normalizedEmail,
                    PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone),
                    WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone),
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    Role = dto.Role,
                    TenantId = tenantId,
                    IsActive = true,
                    IsApproved = true
                };

                usersDbSet.Add(user);
                await context.SaveChangesAsync();

                // If assigned projects are provided and role is not TenantOwner or SuperAdmin, bind them in the same transaction
                if (dto.AssignedProjectIds != null && dto.AssignedProjectIds.Any() && dto.Role != UserRole.TenantOwner && dto.Role != UserRole.SuperAdmin)
                {
                    var targetTenantId = tenantId ?? Guid.Empty;
                    var distinctProjectIds = dto.AssignedProjectIds.Distinct().ToList();

                    var validProjects = await context.Set<Project>()
                        .Where(p => distinctProjectIds.Contains(p.Id) && p.TenantId == targetTenantId)
                        .ToListAsync();

                    if (validProjects.Count != distinctProjectIds.Count)
                    {
                        await transaction.RollbackAsync();
                        return (false, null, "One or more assigned projects do not exist in this company.");
                    }

                    // Guard: verify project status is active
                    var inactiveProjects = validProjects.Where(p => p.Status != ProjectStatus.Active).ToList();
                    if (inactiveProjects.Any())
                    {
                        await transaction.RollbackAsync();
                        return (false, null, "لا يمكن تعيين مستخدم لمشروع مجمّد أو مغلق / Cannot assign user to frozen or closed project.");
                    }

                    foreach (var proj in validProjects)
                    {
                        context.Set<ProjectMember>().Add(new ProjectMember
                        {
                            ProjectId = proj.Id,
                            UserId = user.Id,
                            TenantId = targetTenantId,
                            AssignedAt = DateTime.UtcNow,
                            AssignedByUserId = assignedByUserId
                        });
                    }

                    await context.SaveChangesAsync();
                }

                await transaction.CommitAsync();

                var resultDto = new UserDto
                {
                    Id = user.Id,
                    IsActive = user.IsActive,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PersonalPhone = user.PersonalPhone,
                    WhatsAppPhone = user.WhatsAppPhone,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                };

                return (true, resultDto, "User added successfully");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, null, $"Failed to create user: {ex.Message}");
            }
        });
    }

}
