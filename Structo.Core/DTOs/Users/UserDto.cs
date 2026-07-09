using System;
using Structo.Core.Enums;

namespace Structo.Core.DTOs.Users;

public class UserDto
{
    public Guid Id { get; set; }
    public bool IsActive { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
}
