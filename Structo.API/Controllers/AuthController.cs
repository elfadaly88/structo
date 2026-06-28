using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using Structo.Core.Interfaces;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginDto dto)
    {
        var (success, data, message) = await authService.LoginAsync(dto);

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

    [HttpPost("register-tenant")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<Guid>>> RegisterTenant([FromBody] TenantRegisterDto dto)
    {
        try
        {
            var (success, tenantId, message) = await authService.RegisterTenantAsync(dto);

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
            Console.WriteLine(ex.ToString());
            return StatusCode(500, new ApiResponse<Guid> { Success = false, Message = "An internal database error occurred." });
        }
    }
}
