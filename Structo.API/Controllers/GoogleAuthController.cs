using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Auth;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Core.Helpers;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/google-auth")]
public class GoogleAuthController : ControllerBase
{
    private readonly StructoDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GoogleAuthController> _logger;
    private readonly ITokenProvider _tokenProvider;

    public GoogleAuthController(
        StructoDbContext context,
        IConfiguration configuration,
        ILogger<GoogleAuthController> logger,
        ITokenProvider tokenProvider)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
        _tokenProvider = tokenProvider;
    }

    [HttpPost("google-login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> GoogleLogin([FromBody] GoogleLoginRequestDto dto)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.IdToken))
        {
            return BadRequest(new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = "Google Token is required."
            });
        }

        try
        {
            // 💡 التعديل الصح والمأمن بالملي:
var googleClientId = _configuration["Authentication:Google:ClientId"] ?? "752236038625-sfuglkls4icf5loo8to6gaes9b3kt1h6.apps.googleusercontent.com";
            
            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { googleClientId }
                });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Google token validation failed.");
                return Unauthorized(new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "INVALID_GOOGLE_TOKEN"
                });
            }

            var email = payload.Email?.ToLower().Trim() ?? string.Empty;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "Google account does not provide email."
                });
            }

            var user = await _context.Users.IgnoreQueryFilters()
                .Include(u => u.Tenant)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                _logger.LogInformation("Creating new Tenant and User for email {Email}", email);

                var subscriptionPlan = SubscriptionPlan.Free;
                if (!string.IsNullOrEmpty(dto.SubscriptionPlan))
                {
                    if (Enum.TryParse<SubscriptionPlan>(dto.SubscriptionPlan, true, out var parsedPlan))
                    {
                        subscriptionPlan = parsedPlan;
                    }
                }

                int maxProjects = subscriptionPlan switch
                {
                    SubscriptionPlan.Free => 2,
                    SubscriptionPlan.Standard => 10,
                    SubscriptionPlan.Premium => 50,
                    _ => 2
                };

                var firstName = HtmlSanitizer.Sanitize(payload.GivenName) ?? "Owner";
                var lastName = HtmlSanitizer.Sanitize(payload.FamilyName) ?? string.Empty;
                var companyName = $"شركة {firstName} {lastName}".Trim();

                var tenant = new Tenant
                {
                    Name = companyName,
                    SubscriptionPlan = subscriptionPlan,
                    MaxActiveProjects = maxProjects,
                    Status = TenantStatus.PendingApproval,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Tenants.Add(tenant);

                user = new User
                {
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    Role = UserRole.TenantOwner,
                    TenantId = tenant.Id,
                    IsApproved = false,
                    IsActive = true,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation("New tenant owner {Email} successfully registered via Google. Pending approval.", email);

                return Unauthorized(new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "ACCOUNT_PENDING_APPROVAL"
                });
            }

            if (!user.IsApproved)
            {
                _logger.LogWarning("User {Email} tried to log in but account is not approved.", email);
                return Unauthorized(new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "ACCOUNT_PENDING_APPROVAL"
                });
            }

            // Auto-merge handshake for pre-registered employees/owners:
            // Overwrite placeholder names with Google's verified details.
            var googleFirstName = HtmlSanitizer.Sanitize(payload.GivenName) ?? string.Empty;
            var googleLastName = HtmlSanitizer.Sanitize(payload.FamilyName) ?? string.Empty;
            bool modified = false;

            if (!string.IsNullOrWhiteSpace(googleFirstName) && user.FirstName != googleFirstName)
            {
                user.FirstName = googleFirstName;
                modified = true;
            }
            if (!string.IsNullOrWhiteSpace(googleLastName) && user.LastName != googleLastName)
            {
                user.LastName = googleLastName;
                modified = true;
            }

            if (modified)
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Merged Google profile names for pre-registered user {Email}", email);
            }

            if (!user.IsActive)
            {
                return Unauthorized(new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "ACCOUNT_DEACTIVATED"
                });
            }

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
                IsApproved = user.IsApproved,
                IsProfileComplete = isProfileComplete
            };

            return Ok(new ApiResponse<LoginResponseDto>
            {
                Success = true,
                Message = "LOGIN_SUCCESS",
                Data = responseDto
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Critical error during Google auth login.");
            return StatusCode(500, new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = "SERVER_ERROR"
            });
        }
    }
}

public class GoogleLoginRequestDto
{
    public string IdToken { get; set; } = string.Empty;
    public string? SubscriptionPlan { get; set; }
}
