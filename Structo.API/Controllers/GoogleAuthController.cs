using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Auth;
using Structo.Core.Interfaces;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/google-auth")]
public class GoogleAuthController : ControllerBase
{
    private readonly IGoogleAuthService _googleAuthService;

    public GoogleAuthController(IGoogleAuthService googleAuthService)
    {
        _googleAuthService = googleAuthService;
    }

    [HttpPost("google-login")]
    [EnableRateLimiting("loginPolicy")]
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

        // الكنترولر أصبح يستدعي الخدمة فقط ولا يتدخل في تفاصيل قاعدة البيانات
        var response = await _googleAuthService.AuthenticateGoogleUserAsync(dto.IdToken);

        if (!response.Success)
        {
            return response.Message == "ACCOUNT_PENDING_APPROVAL" || response.Message == "ACCOUNT_DEACTIVATED" 
                ? Unauthorized(response) 
                : BadRequest(response);
        }

        return Ok(response);
    }
}