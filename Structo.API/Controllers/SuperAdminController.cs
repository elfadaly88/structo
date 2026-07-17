using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/superadmin")]
[Authorize(Roles = "SuperAdmin")]
public class SuperAdminController : ControllerBase
{
    private readonly StructoDbContext _context;
    private readonly ILogger<SuperAdminController> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public SuperAdminController(
        StructoDbContext context,
        ILogger<SuperAdminController> logger,
        IServiceScopeFactory scopeFactory)
    {
        _context = context;
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    [HttpGet("pending-users")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetPendingUsers()
    {
        try
        {
            var pendingUsers = await _context.Users.IgnoreQueryFilters()
                .AsNoTracking()
                .Include(u => u.Tenant)
                .Where(u => !u.IsApproved)
                .OrderByDescending(u => u.CreatedAt)
                .Select(u => new PendingUserDto
                {
                    Id = u.Id,
                    TenantId = u.TenantId,
                    TenantName = u.Tenant != null ? u.Tenant.Name : null,
                    SubscriptionPlan = u.Tenant != null ? u.Tenant.SubscriptionPlan.ToString() : null,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PersonalPhone = u.PersonalPhone,
                    WhatsAppPhone = u.WhatsAppPhone,
                    Role = u.Role.ToString(),
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();

            return Ok(new ApiResponse<List<PendingUserDto>>
            {
                Success = true,
                Message = "Pending users retrieved successfully.",
                Data = pendingUsers
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve pending users.");
            return StatusCode(500, new ApiResponse<List<PendingUserDto>>
            {
                Success = false,
                Message = "An error occurred while retrieving pending users."
            });
        }
    }

    // [HttpPost("approve/{userId}")]
    // public async Task<ActionResult<ApiResponse<bool>>> ApproveUser(Guid userId)
    // {
    //     try
    //     {
    //         var user = await _context.Users.IgnoreQueryFilters()
    //             .Include(u => u.Tenant)
    //             .FirstOrDefaultAsync(u => u.Id == userId);

    //         if (user == null)
    //         {
    //             return NotFound(new ApiResponse<bool>
    //             {
    //                 Success = false,
    //                 Message = "User not found."
    //             });
    //         }

    //         if (user.IsApproved)
    //         {
    //             return BadRequest(new ApiResponse<bool>
    //             {
    //                 Success = false,
    //                 Message = "User is already approved."
    //             });
    //         }

    //         user.IsApproved = true;
    //         user.IsActive = true;

    //         if (user.Role == UserRole.TenantOwner && user.Tenant != null && user.Tenant.Status == TenantStatus.PendingApproval)
    //         {
    //             user.Tenant.Status = TenantStatus.Active;
    //         }

    //         await _context.SaveChangesAsync();

    //         _ = Task.Run(async () =>
    //         {
    //             try
    //             {
    //                 using var scope = _scopeFactory.CreateScope();
    //                 var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
    //                 await emailService.SendWelcomeEmailAsync(user.Email, $"{user.FirstName} {user.LastName}");
    //             }
    //             catch (Exception ex)
    //             {
    //                 _logger.LogError(ex, "Background error sending welcome email to {Email}", user.Email);
    //             }
    //         });

    //         return Ok(new ApiResponse<bool>
    //         {
    //             Success = true,
    //             Message = "User approved successfully.",
    //             Data = true
    //         });
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError(ex, "Failed to approve user {UserId}", userId);
    //         return StatusCode(500, new ApiResponse<bool>
    //         {
    //             Success = false,
    //             Message = "An error occurred during approval process."
    //         });
    //     }
    // }

    [HttpPost("approve/{userId}")]
    public async Task<ActionResult<ApiResponse<bool>>> ApproveUser(string userId)
    {
        try
        {

            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "Invalid User ID format."
                });
            }
            var user = await _context.Users.IgnoreQueryFilters()
                .Include(u => u.Tenant)
                .FirstOrDefaultAsync(u => u.Id == parsedUserId);

            if (user == null)
            {
                return NotFound(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "User not found."
                });
            }

            if (user.IsApproved)
            {
                return BadRequest(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "User is already approved."
                });
            }

            user.IsApproved = true;
            user.IsActive = true;

            bool isTenantActivated = false;
            string tenantName = string.Empty;

            if (user.Role == UserRole.TenantOwner && user.Tenant != null && user.Tenant.Status == TenantStatus.PendingApproval)
            {
                user.Tenant.Status = TenantStatus.Active;
                isTenantActivated = true;
                tenantName = user.Tenant.Name;
                
                switch (user.Tenant.SubscriptionPlan)
                {
                    case SubscriptionPlan.Free:
                        user.Tenant.MaxActiveProjects = 2;
                        break;
                    case SubscriptionPlan.Standard:
                        user.Tenant.MaxActiveProjects = 10;
                        break;
                    case SubscriptionPlan.Premium:
                        user.Tenant.MaxActiveProjects = 50;
                        break;
                    default:
                        user.Tenant.MaxActiveProjects = 2;
                        break;
                }
            }

            // 1. حفظ التغييرات أولاً للتأكد من نزولها الداتابيز بنجاح
            await _context.SaveChangesAsync();

            // 2. 💡 الحل السحري: استخراج البيانات كـ Variables منفصلة قبل الـ Task.Run
            var targetEmail = user.Email;
            var targetFullName = $"{user.FirstName} {user.LastName}";

            // 3. تشغيل الـ Background Task بأمان كامل بدون تمرير الـ user Entity
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
                    await emailService.SendWelcomeEmailAsync(targetEmail, targetFullName); // 👈 استخدام المتغيرات الآمنة
                    
                    if (isTenantActivated && !string.IsNullOrEmpty(tenantName))
                    {
                        await emailService.SendTenantActivatedEmailAsync(targetEmail, targetFullName, tenantName);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Background error sending welcome/activation email to {Email}", targetEmail);
                }
            });

            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Message = "User approved successfully.",
                Data = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to approve user {UserId}", userId);
            return StatusCode(500, new ApiResponse<bool>
            {
                Success = false,
                Message = "An error occurred during approval process."
            });
        }
    }
}

public class PendingUserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public string Role { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? TenantId { get; set; }
    public string? TenantName { get; set; }
    public string? SubscriptionPlan { get; set; }
}

