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
using Structo.Core.Entities;
using Structo.Core.Enums;
using Microsoft.AspNetCore.Authorization;

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
            new Claim("role", user.Role.ToString()),
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

    [HttpPost("register-tenant")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<Guid>>> RegisterTenant([FromBody] TenantRegisterDto dto)
    {
        try
        {
            if (await context.Users.IgnoreQueryFilters().AnyAsync(u => u.Email == dto.AdminEmail))
            {
                return BadRequest(new ApiResponse<Guid> { Success = false, Message = "Email is already taken." });
            }

            var tenant = new Tenant
            {
                Name = dto.CompanyName,
                CompanyDescription = dto.BusinessDomain,
                SubscriptionPlan = Enum.TryParse<SubscriptionPlan>(dto.SubscriptionPlan, true, out var parsedPlan) ? parsedPlan : SubscriptionPlan.Free,
                Status = TenantStatus.PendingApproval,
                CreatedAt = DateTime.UtcNow
            };

            context.Tenants.Add(tenant);

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

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<Guid>
            {
                Data = tenant.Id,
                Success = true,
                Message = "Registration successful! Your account is pending SuperAdmin approval."
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, new ApiResponse<Guid> { Success = false, Message = "An internal database error occurred." });
        }
    }
}
