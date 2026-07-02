using System.ComponentModel.DataAnnotations;
using Structo.Core.Enums;

namespace Structo.Core.DTOs.Users;

public class UserCreateDto
{
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "Contact phone must match 01xxxxxxxxx")]
    public string? ContactPhone { get; set; }

    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "WhatsApp phone must match 01xxxxxxxxx")]
    public string? WhatsAppPhone { get; set; }

    [Required]
    [MinLength(6)]
    [MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public UserRole Role { get; set; }
}
