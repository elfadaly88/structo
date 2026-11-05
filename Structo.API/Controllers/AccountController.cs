using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.Enums;
using Structo.Infrastructure.Data;

namespace Structo.API.Controllers;

public sealed class MyAccountDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public string Role { get; set; } = string.Empty;
    public string? TenantName { get; set; }
    public DateTime CreatedAt { get; set; }
    public int AssignedProjectsCount { get; set; }
}

public sealed class UpdateMyAccountDto
{
    [Required, StringLength(60, MinimumLength = 2)]
    public string FirstName { get; set; } = string.Empty;

    [Required, StringLength(60, MinimumLength = 1)]
    public string LastName { get; set; } = string.Empty;

    [StringLength(20)]
    public string? PersonalPhone { get; set; }

    [StringLength(20)]
    public string? WhatsAppPhone { get; set; }
}

public sealed class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required, StringLength(100, MinimumLength = 8)]
    public string NewPassword { get; set; } = string.Empty;
}

public sealed class SetPasswordDto
{
    [Required, StringLength(100, MinimumLength = 8)]
    public string NewPassword { get; set; } = string.Empty;
}

/// <summary>
/// The signed-in user's own account (any role): profile, phones and password.
/// Also lets a company owner set a new password for one of their employees.
/// </summary>
[ApiController]
[Route("api/account")]
[Authorize]
public partial class AccountController(StructoDbContext context, ILogger<AccountController> logger) : ControllerBase
{
    [GeneratedRegex(@"^\+?[0-9]{8,15}$")]
    private static partial Regex PhoneRegex();

    private Guid CurrentUserId => Guid.TryParse(
        User.FindFirstValue("sub") ?? User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : Guid.Empty;

    [HttpGet]
    public async Task<ActionResult<ApiResponse<MyAccountDto>>> Get()
    {
        var me = await context.Users.IgnoreQueryFilters().AsNoTracking()
            .Where(u => u.Id == CurrentUserId)
            .Select(u => new MyAccountDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                PersonalPhone = u.PersonalPhone,
                WhatsAppPhone = u.WhatsAppPhone,
                Role = u.Role.ToString(),
                TenantName = u.Tenant != null ? u.Tenant.Name : null,
                CreatedAt = u.CreatedAt,
                AssignedProjectsCount = u.ProjectMemberships.Count
            })
            .FirstOrDefaultAsync();

        if (me == null) return NotFound(new ApiResponse<MyAccountDto> { Success = false, Message = "USERS.USER_NOT_FOUND" });
        return Ok(new ApiResponse<MyAccountDto> { Data = me });
    }

    [HttpPut]
    public async Task<ActionResult<ApiResponse<bool>>> Update([FromBody] UpdateMyAccountDto dto)
    {
        var personal = NormalizePhone(dto.PersonalPhone);
        var whatsApp = NormalizePhone(dto.WhatsAppPhone);
        if ((personal != null && !PhoneRegex().IsMatch(personal)) || (whatsApp != null && !PhoneRegex().IsMatch(whatsApp)))
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "ACCOUNT.INVALID_PHONE" });

        var user = await context.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Id == CurrentUserId);
        if (user == null) return NotFound(new ApiResponse<bool> { Success = false, Message = "USERS.USER_NOT_FOUND" });

        user.FirstName = dto.FirstName.Trim();
        user.LastName = dto.LastName.Trim();
        user.PersonalPhone = personal;
        user.WhatsAppPhone = whatsApp;
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "ACCOUNT.PROFILE_SAVED" });
    }

    [HttpPost("change-password")]
    public async Task<ActionResult<ApiResponse<bool>>> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (!IsStrongEnough(dto.NewPassword))
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "ACCOUNT.WEAK_PASSWORD" });

        var user = await context.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Id == CurrentUserId);
        if (user == null) return NotFound(new ApiResponse<bool> { Success = false, Message = "USERS.USER_NOT_FOUND" });

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "ACCOUNT.WRONG_CURRENT_PASSWORD" });

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        // Other devices can no longer renew their session
        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;
        await context.SaveChangesAsync();

        logger.LogInformation("User {UserId} changed their password", user.Id);
        return Ok(new ApiResponse<bool> { Data = true, Message = "ACCOUNT.PASSWORD_CHANGED" });
    }

    /// <summary>A company owner sets a new password for an employee of the same company (e.g. one added without a password).</summary>
    [HttpPost("/api/users/{id:guid}/set-password")]
    [Authorize(Roles = "TenantOwner")]
    public async Task<ActionResult<ApiResponse<bool>>> SetEmployeePassword(Guid id, [FromBody] SetPasswordDto dto)
    {
        if (id == CurrentUserId)
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "ACCOUNT.USE_CHANGE_PASSWORD" });
        if (!IsStrongEnough(dto.NewPassword))
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "ACCOUNT.WEAK_PASSWORD" });

        var tenantId = context.CurrentTenantId;
        var employee = await context.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Id == id);
        if (employee == null || !tenantId.HasValue || employee.TenantId != tenantId
            || employee.Role is UserRole.SuperAdmin or UserRole.TenantOwner)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "USERS.USER_NOT_FOUND" });

        employee.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        employee.RefreshToken = null;
        employee.RefreshTokenExpiryTime = null;
        await context.SaveChangesAsync();

        logger.LogInformation("Owner {OwnerId} set a new password for employee {UserId}", CurrentUserId, employee.Id);
        return Ok(new ApiResponse<bool> { Data = true, Message = "ACCOUNT.EMPLOYEE_PASSWORD_SET" });
    }

    private static string? NormalizePhone(string? phone)
    {
        if (string.IsNullOrWhiteSpace(phone)) return null;
        return Regex.Replace(phone.Trim(), @"[\s\-()]", "");
    }

    // At least 8 characters with a letter and a digit
    private static bool IsStrongEnough(string password) =>
        password.Length >= 8 && password.Any(char.IsLetter) && password.Any(char.IsDigit);
}
