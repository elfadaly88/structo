using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

public class AuthService(DbContext context, ITokenProvider tokenProvider, INotificationService? notificationService = null) : IAuthService
{
    public async Task<(bool Success, LoginResponseDto? Data, string Message)> LoginAsync(LoginDto dto)
    {
        var usersDbSet = context.Set<User>();
        var user = await usersDbSet.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return (false, null, "Invalid email or password");
        }

        if (user.TenantId.HasValue)
        {
            var tenant = await context.Set<Tenant>().IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == user.TenantId.Value);
            if (tenant == null || tenant.Status != TenantStatus.Active)
            {
                return (false, null, "Your account is pending approval or inactive.");
            }
        }

        var token = tokenProvider.GenerateToken(user);

        var responseDto = new LoginResponseDto
        {
            Token = token,
            UserId = user.Id,
            Role = user.Role.ToString(),
            TenantId = user.TenantId,
            Name = $"{user.FirstName} {user.LastName}"
        };

        return (true, responseDto, "Login successful");
    }

    public async Task<(bool Success, Guid? TenantId, string Message)> RegisterTenantAsync(TenantRegisterDto dto)
    {
        var usersDbSet = context.Set<User>();
        if (await usersDbSet.IgnoreQueryFilters().AnyAsync(u => u.Email == dto.AdminEmail))
        {
            return (false, null, "Email is already taken.");
        }

        var tenant = new Tenant
        {
            Name = dto.CompanyName,
            CompanyDescription = dto.BusinessDomain,
            SubscriptionPlan = Enum.TryParse<SubscriptionPlan>(dto.SubscriptionPlan, true, out var parsedPlan) ? parsedPlan : SubscriptionPlan.Free,
            Status = TenantStatus.PendingApproval,
            CreatedAt = DateTime.UtcNow
        };

        var tenantsDbSet = context.Set<Tenant>();
        tenantsDbSet.Add(tenant);

        var nameParts = dto.OwnerName?.Trim().Split(' ') ?? ["Admin"];
        var firstName = string.IsNullOrWhiteSpace(nameParts.FirstOrDefault()) ? "Admin" : nameParts.FirstOrDefault();
        var lastName = nameParts.Length > 1 ? string.Join(" ", nameParts.Skip(1)) : "User";

        var user = new User
        {
            FirstName = firstName!,
            LastName = lastName,
            Email = dto.AdminEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.TenantOwner,
            TenantId = tenant.Id,
            CreatedAt = DateTime.UtcNow
        };

        usersDbSet.Add(user);
        await context.SaveChangesAsync();

        // Notify SuperAdmin about the new registration (fire-and-forget friendly)
        if (notificationService is not null)
        {
            try
            {
                await notificationService.SendAsync(new SendNotificationDto
                {
                    TenantId   = null, // global — SuperAdmin scope
                    ReceiverId = null, // broadcast to the SuperAdmin group
                    TargetRole = UserRole.SuperAdmin,
                    Title      = "🏢 New Tenant Registration",
                    Message    = $"'{dto.CompanyName}' has submitted a registration request and is pending your approval.",
                    Type       = NotificationType.Registration,
                    DeepLink   = "/dashboard/tenants"
                });
            }
            catch
            {
                // Notification failure must NEVER block registration
            }
        }

        return (true, tenant.Id, "Registration successful! Your account is pending SuperAdmin approval.");
    }
}
