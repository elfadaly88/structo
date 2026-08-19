using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Helpers;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Threading.Tasks;

namespace Structo.API.Services;

public class GoogleAuthService : IGoogleAuthService
{
    private readonly StructoDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GoogleAuthService> _logger;
    private readonly ITokenProvider _tokenProvider;

    public GoogleAuthService(
        StructoDbContext context,
        IConfiguration configuration,
        ILogger<GoogleAuthService> logger,
        ITokenProvider tokenProvider)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
        _tokenProvider = tokenProvider;
    }

    public async Task<ApiResponse<LoginResponseDto>> AuthenticateGoogleUserAsync(string idToken)
    {
        if (string.IsNullOrWhiteSpace(idToken))
        {
            return new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = "Google Token is required."
            };
        }

        try
        {
            var googleClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID")
                ?? _configuration["Authentication:Google:ClientId"];

            if (string.IsNullOrWhiteSpace(googleClientId))
            {
                _logger.LogError("Google Client ID configuration is missing.");
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "GOOGLE_AUTH_NOT_CONFIGURED"
                };
            }

            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { googleClientId }
                });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Google token validation failed.");
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "INVALID_GOOGLE_TOKEN"
                };
            }

            var email = payload.Email?.Trim().ToLowerInvariant() ?? string.Empty;
            if (string.IsNullOrEmpty(email))
            {
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "Google account does not provide email."
                };
            }

            var user = await _context.Users.IgnoreQueryFilters()
                .Include(u => u.Tenant)
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (user != null)
            {
                // CASE A: User already pre-registered by TenantOwner (Invited Employee) or existing user
                _logger.LogInformation("Existing user {Email} authenticating via Google OAuth.", email);

                // Ensure user is active and approved (Zero Pending state for invited employees)
                user.IsApproved = true;
                user.IsActive = true;

                // Merge Google verified profile details if names were placeholder
                var googleFirstName = HtmlSanitizer.Sanitize(payload.GivenName) ?? string.Empty;
                var googleLastName = HtmlSanitizer.Sanitize(payload.FamilyName) ?? string.Empty;

                if (!string.IsNullOrWhiteSpace(googleFirstName) && (string.IsNullOrWhiteSpace(user.FirstName) || user.FirstName == "User" || user.FirstName == "Owner"))
                {
                    user.FirstName = googleFirstName;
                }
                if (!string.IsNullOrWhiteSpace(googleLastName) && (string.IsNullOrWhiteSpace(user.LastName) || user.LastName == "User"))
                {
                    user.LastName = googleLastName;
                }

                if (user.TenantId.HasValue)
                {
                    var tenant = user.Tenant ?? await _context.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == user.TenantId.Value);
                    if (tenant != null)
                    {
                        if (tenant.Status == TenantStatus.Suspended)
                        {
                            return new ApiResponse<LoginResponseDto>
                            {
                                Success = false,
                                Message = "⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك."
                            };
                        }
                        if (tenant.Status != TenantStatus.Active)
                        {
                            return new ApiResponse<LoginResponseDto>
                            {
                                Success = false,
                                Message = "AUTH.ACCOUNT_PENDING_OR_INACTIVE"
                            };
                        }
                    }
                }
            }
            else
            {
                // CASE B: Brand-New User (Not pre-registered in any tenant)
                var allowSelfRegistrationSetting = Environment.GetEnvironmentVariable("ALLOW_SELF_REGISTRATION")
                    ?? _configuration["Authentication:Google:AllowSelfRegistration"]
                    ?? "true";

                bool allowSelfRegistration = !string.Equals(allowSelfRegistrationSetting, "false", StringComparison.OrdinalIgnoreCase);

                if (!allowSelfRegistration)
                {
                    _logger.LogWarning("User {Email} tried Google OAuth but self-registration is disabled and email is not pre-registered.", email);
                    return new ApiResponse<LoginResponseDto>
                    {
                        Success = false,
                        Message = "هذا البريد غير مسجل لدى أي شركة. يرجى التواصل مع مسؤول شركتك لإضافتك."
                    };
                }

                _logger.LogInformation("Creating new Tenant and User for self-registered email {Email} via Google OAuth.", email);

                var firstName = HtmlSanitizer.Sanitize(payload.GivenName) ?? "Owner";
                var lastName = HtmlSanitizer.Sanitize(payload.FamilyName) ?? string.Empty;
                var companyName = $"شركة {firstName} {lastName}".Trim();

                var tenant = new Tenant
                {
                    Name = companyName,
                    SubscriptionPlan = SubscriptionPlan.Free,
                    MaxActiveProjects = 2,
                    Status = TenantStatus.Active,
                    CreatedAt = DateTime.UtcNow
                };

                user = new User
                {
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    Role = UserRole.TenantOwner,
                    TenantId = tenant.Id,
                    IsApproved = true,
                    IsActive = true,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    CreatedAt = DateTime.UtcNow
                };

                _context.Tenants.Add(tenant);
                _context.Users.Add(user);
            }

            // Generate Token and Save
            var token = _tokenProvider.GenerateToken(user);
            var refreshToken = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            bool isProfileComplete = false;
            if (user.Role == UserRole.SuperAdmin)
            {
                isProfileComplete = true;
            }
            else if (user.Tenant != null)
            {
                var tenant = user.Tenant;
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

            var responseDto = new LoginResponseDto
            {
                Token = token,
                RefreshToken = refreshToken,
                UserId = user.Id,
                Role = user.Role.ToString(),
                TenantId = user.TenantId,
                Name = $"{user.FirstName} {user.LastName}".Trim(),
                IsApproved = user.IsActive,
                IsProfileComplete = isProfileComplete
            };

            return new ApiResponse<LoginResponseDto>
            {
                Success = true,
                Message = "LOGIN_SUCCESS",
                Data = responseDto
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Critical error during Google auth login execution.");
            return new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = "SERVER_ERROR"
            };
        }
    }
}
