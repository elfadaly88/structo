using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using Structo.Core.Interfaces;
using Structo.Core.Services;
using System;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;
    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }
    
    [HttpPost("login")]
    [EnableRateLimiting("loginPolicy")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginDto dto)
    {
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
    [AllowAnonymous]
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
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<Guid>>> RegisterTenant([FromBody] TenantRegisterDto dto)
    {
        try
        {
            var (success, tenantId, message) = await _authService.RegisterTenantAsync(dto);

            if (!success)
            {
                return BadRequest(new ApiResponse<Guid> { Success = false, Message = message });
            }

            return Ok(new ApiResponse<Guid>
            {
                Data = tenantId ?? Guid.Empty,
                Success = true,
                Message = message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during tenant registration.");
            return StatusCode(500, new ApiResponse<Guid> { Success = false, Message = "An internal error occurred." });
        }
    }
}
