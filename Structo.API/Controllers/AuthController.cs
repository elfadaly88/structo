using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using Structo.Infrastructure.Data;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(StructoDbContext context, IConfiguration configuration) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginDto dto)
    {
        var user = await context.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Email == dto.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new ApiResponse<LoginResponseDto> { Success = false, Message = "Invalid email or password" });
        }

        var jwtSettings = configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["Secret"] ?? "SuperSecretKeyThatShouldBeAtLeast32BytesLongForHS256ToWorkProperly!";
        var key = Encoding.ASCII.GetBytes(secretKey);

        var tokenHandler = new JwtSecurityTokenHandler();
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim("name", $"{user.FirstName} {user.LastName}"),
            new Claim("tenantId", user.TenantId?.ToString() ?? string.Empty)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(12),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new ApiResponse<LoginResponseDto>
        {
            Data = new LoginResponseDto
            {
                Token = tokenHandler.WriteToken(token),
                UserId = user.Id,
                Role = user.Role.ToString(),
                TenantId = user.TenantId,
                Name = $"{user.FirstName} {user.LastName}"
            },
            Message = "Login successful"
        });
    }
}
