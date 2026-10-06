using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using Structo.Core.Interfaces;
using Structo.Core.Services;
using System;
using System.Threading.RateLimiting;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    // Per-account limit on top of the per-IP "loginPolicy": stops one account being brute-forced
    // from many IPs, while a lockout lasts at most one 5-minute window.
    private static readonly PartitionedRateLimiter<string> LoginPerEmailLimiter =
        PartitionedRateLimiter.Create<string, string>(email => RateLimitPartition.GetFixedWindowLimiter(email,
            _ => new FixedWindowRateLimiterOptions { PermitLimit = 5, Window = TimeSpan.FromMinutes(5), QueueLimit = 0 }));

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("login")]
    [EnableRateLimiting("loginPolicy")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginDto dto)
    {
        using var emailLease = LoginPerEmailLimiter.AttemptAcquire(dto.Email?.Trim().ToLowerInvariant() ?? string.Empty);
        if (!emailLease.IsAcquired)
        {
            if (emailLease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
            {
                Response.Headers.RetryAfter = ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString();
            }
            return StatusCode(StatusCodes.Status429TooManyRequests,
                new ApiResponse<LoginResponseDto> { Success = false, Message = "AUTH.RATE_LIMITED" });
        }

        try
        {
            var (success, data, message) = await _authService.LoginAsync(dto);

            if (!success)
            {
                return Unauthorized(new ApiResponse<LoginResponseDto> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<LoginResponseDto>
            {
                Data = data,
                Message = message,
                Success = true
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    [HttpPost("refresh")]
    [HttpPost("refresh-token")]
    [AllowAnonymous]
    [EnableRateLimiting("refreshPolicy")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Refresh([FromBody] RefreshTokenDto dto)
    {
        try
        {
            var (success, data, message) = await _authService.RefreshTokenAsync(dto);

            if (!success)
            {
                return Unauthorized(new ApiResponse<LoginResponseDto> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<LoginResponseDto>
            {
                Data = data,
                Message = message,
                Success = true
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    [HttpPost("register-tenant")]
    [EnableRateLimiting("registrationPolicy")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> RegisterTenant([FromBody] TenantRegisterDto dto)
    {
        try
        {
            var (success, data, message) = await _authService.RegisterTenantAsync(dto);

            if (!success)
            {
                return BadRequest(new ApiResponse<LoginResponseDto> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<LoginResponseDto>
            {
                Data = data,
                Success = true,
                Message = message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during tenant registration for email: {Email}", dto?.AdminEmail);
            return StatusCode(500, new ApiResponse<LoginResponseDto> { Success = false, Message = ex.Message });
        }
    }
}
