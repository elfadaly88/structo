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
        var user = await usersDbSet.IgnoreQueryFilters().Include(u => u.Tenant).FirstOrDefaultAsync(u => u.Email == dto.Email);

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
            var tenant = user.Tenant ?? await context.Set<Tenant>().IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == user.TenantId.Value);
            if (tenant != null)
            {
                if (tenant.Status == TenantStatus.Suspended)
                {
                    throw new UnauthorizedAccessException("⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك.");
                }
                if (tenant.Status != TenantStatus.Active)
                {
                    return (false, null, "AUTH.ACCOUNT_PENDING_OR_INACTIVE");
                }
            }
        }

        bool isApproved = user.IsActive;
        bool isProfileComplete = false;

        if (user.Role == UserRole.SuperAdmin)
        {
            isProfileComplete = true;
        }
        else if (user.Tenant != null)
        {
            var tenant = user.Tenant;
            isApproved = user.IsActive && tenant.Status == TenantStatus.Active;

            if (tenant.AccountType == "Freelancer")
            {
                isProfileComplete = !string.IsNullOrEmpty(user.NationalId) && 
                                    !string.IsNullOrEmpty(user.ManualAddress) && 
                                    user.Latitude.HasValue;
            }
            else
            {
                isProfileComplete = !string.IsNullOrEmpty(tenant.ManualAddress) && 
                                    tenant.Latitude.HasValue && tenant.Longitude.HasValue;
            }
        }

        var token = tokenProvider.GenerateToken(user);
        var refreshToken = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await context.SaveChangesAsync();

        var responseDto = new LoginResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            UserId = user.Id,
            Role = user.Role.ToString(),
            TenantId = user.TenantId,
            Name = $"{user.FirstName} {user.LastName}",
            IsApproved = isApproved,
            IsProfileComplete = isProfileComplete
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

        // Validation Guard based on AccountType is removed to allow optional fields during registration.

        var usersDbSet = context.Set<User>();
        if (await usersDbSet.IgnoreQueryFilters().AnyAsync(u => u.Email == dto.AdminEmail))
        {
            return (false, null, "Email is already taken.");
        }

        var tenant = new Tenant
        {
            Name = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CompanyName) ?? string.Empty,
            CompanyDescription = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.BusinessDomain) ?? string.Empty,
            SubscriptionPlan = Enum.TryParse<SubscriptionPlan>(dto.SubscriptionPlan, true, out var parsedPlan) ? parsedPlan : SubscriptionPlan.Free,
            Status = TenantStatus.PendingApproval,
            CreatedAt = DateTime.UtcNow,
            Location = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Location),
            PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone),
            WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone),
            CommercialRegister = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CommercialRegister),
            TaxCard = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.TaxCard),
            AccountType = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.AccountType),
            ManualAddress = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.ManualAddress),
            MapLocationUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.MapLocationUrl),
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        var tenantsDbSet = context.Set<Tenant>();
        tenantsDbSet.Add(tenant);

        var nameParts = dto.OwnerName?.Trim().Split(' ') ?? ["Admin"];
        var firstName = string.IsNullOrWhiteSpace(nameParts.FirstOrDefault()) ? "Admin" : nameParts.FirstOrDefault();
        var lastName = nameParts.Length > 1 ? string.Join(" ", nameParts.Skip(1)) : "User";

        var user = new User
        {
            FirstName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(firstName) ?? string.Empty,
            LastName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(lastName) ?? string.Empty,
            Email = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.AdminEmail).ToLower().Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.TenantOwner,
            TenantId = tenant.Id,
            CreatedAt = DateTime.UtcNow,
            PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone),
            WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone),
            NationalId = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.NationalId),
            SyndicateId = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.SyndicateId),
            ManualAddress = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.ManualAddress),
            MapLocationUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.MapLocationUrl),
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        usersDbSet.Add(user);
        await context.SaveChangesAsync();

        // Notify SuperAdmin about the new registration via NotificationEngine (WORKFLOW B)
        await notificationEngine.RaiseNewAccountRegistrationNotificationAsync(dto.CompanyName);

        return (true, tenant.Id, "Registration successful! Your account is pending SuperAdmin approval.");
    }

    public async Task<(bool Success, LoginResponseDto? Data, string Message)> RefreshTokenAsync(RefreshTokenDto dto)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.RefreshToken))
        {
            return (false, null, "AUTH.REFRESH_TOKEN_REQUIRED");
        }

        var usersDbSet = context.Set<User>();
        var user = await usersDbSet.IgnoreQueryFilters()
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync(u => u.RefreshToken == dto.RefreshToken);

        if (user == null || !user.RefreshTokenExpiryTime.HasValue || user.RefreshTokenExpiryTime.Value <= DateTime.UtcNow)
        {
            return (false, null, "AUTH.INVALID_OR_EXPIRED_REFRESH_TOKEN");
        }

        if (!user.IsActive)
        {
            throw new UnauthorizedAccessException("AUTH.ACCOUNT_DEACTIVATED");
        }

        if (user.TenantId.HasValue)
        {
            var tenant = user.Tenant ?? await context.Set<Tenant>().IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == user.TenantId.Value);
            if (tenant != null)
            {
                if (tenant.Status == TenantStatus.Suspended)
                {
                    throw new UnauthorizedAccessException("⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك.");
                }
                if (tenant.Status != TenantStatus.Active)
                {
                    return (false, null, "AUTH.ACCOUNT_PENDING_OR_INACTIVE");
                }
            }
        }

        bool isApproved = user.IsActive;
        bool isProfileComplete = false;

        if (user.Role == UserRole.SuperAdmin)
        {
            isProfileComplete = true;
        }
        else if (user.Tenant != null)
        {
            var tenant = user.Tenant;
            isApproved = user.IsActive && tenant.Status == TenantStatus.Active;

            if (tenant.AccountType == "Freelancer")
            {
                isProfileComplete = !string.IsNullOrEmpty(user.NationalId) && 
                                    !string.IsNullOrEmpty(user.ManualAddress) && 
                                    user.Latitude.HasValue;
            }
            else
            {
                isProfileComplete = !string.IsNullOrEmpty(tenant.ManualAddress) && 
                                    tenant.Latitude.HasValue && tenant.Longitude.HasValue;
            }
        }

        var newAccessToken = tokenProvider.GenerateToken(user);
        var newRefreshToken = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await context.SaveChangesAsync();

        var responseDto = new LoginResponseDto
        {
            Token = newAccessToken,
            RefreshToken = newRefreshToken,
            UserId = user.Id,
            Role = user.Role.ToString(),
            TenantId = user.TenantId,
            Name = $"{user.FirstName} {user.LastName}",
            IsApproved = isApproved,
            IsProfileComplete = isProfileComplete
        };

        return (true, responseDto, "AUTH.TOKEN_REFRESH_SUCCESS");
    }
}
