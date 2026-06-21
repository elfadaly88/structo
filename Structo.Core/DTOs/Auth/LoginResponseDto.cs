using System;

namespace Structo.Core.DTOs.Auth;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string Role { get; set; } = string.Empty;
    public Guid? TenantId { get; set; }
    public string Name { get; set; } = string.Empty;
}
