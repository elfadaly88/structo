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

public class AuthService(DbContext context, ITokenProvider tokenProvider, INotificationEngine notificationEngine) : IAuthService
{
    public async Task<(bool Success, LoginResponseDto? Data, string Message)> LoginAsync(LoginDto dto)
    {
        var usersDbSet = context.Set<User>();
        var user = await usersDbSet.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return (false, null, "AUTH.INVALID_CREDENTIALS");
        }

        if (!user.IsActive)
        {
            throw new UnauthorizedAccessException("AUTH.ACCOUNT_DEACTIVATED");
        }

        if (user.TenantId.HasValue)
        {
            var tenant = await context.Set<Tenant>().IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == user.TenantId.Value);
            if (tenant == null || tenant.Status != TenantStatus.Active)
            {
                return (false, null, "AUTH.ACCOUNT_PENDING_OR_INACTIVE");
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

        return (true, responseDto, "AUTH.LOGIN_SUCCESS");
    }

    public async Task<(bool Success, Guid? TenantId, string Message)> RegisterTenantAsync(TenantRegisterDto dto)
    {
        // Validate password complexity
        if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
        {
            return (false, null, "Password must be at least 6 characters.");
        }

        int passScore = 0;
        if (dto.Password.Length >= 8) passScore++;
        if (dto.Password.Any(char.IsUpper)) passScore++;
        if (dto.Password.Any(char.IsLower)) passScore++;
        if (dto.Password.Any(char.IsDigit)) passScore++;
        if (dto.Password.Any(c => !char.IsLetterOrDigit(c))) passScore++;

        if (passScore < 3)
        {
            return (false, null, "Password is too weak. Must include uppercase, lowercase, numbers, or special characters.");
        }

        // Validation Guard based on AccountType
        if (dto.AccountType == "Freelancer")
        {
            if (string.IsNullOrWhiteSpace(dto.NationalId))
            {
                return (false, null, "National ID is required for Freelancers.");
            }
            if (dto.NationalId.Length != 14 || !dto.NationalId.All(char.IsDigit))
            {
                return (false, null, "National ID must be exactly 14 digits.");
            }
        }

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
            CreatedAt = DateTime.UtcNow,
            Location = dto.Location,
            MobileNumber = dto.MobileNumber,
            CommercialRegister = dto.CommercialRegister,
            TaxCard = dto.TaxCard,
            AccountType = dto.AccountType
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
            CreatedAt = DateTime.UtcNow,
            ContactPhone = dto.MobileNumber,
            NationalId = dto.NationalId,
            SyndicateId = dto.SyndicateId
        };

        usersDbSet.Add(user);
        await context.SaveChangesAsync();

        // Notify SuperAdmin about the new registration via NotificationEngine (WORKFLOW B)
        await notificationEngine.RaiseNewAccountRegistrationNotificationAsync(dto.CompanyName);

        return (true, tenant.Id, "Registration successful! Your account is pending SuperAdmin approval.");
    }
}
