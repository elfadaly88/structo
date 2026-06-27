using System.ComponentModel.DataAnnotations;
using Structo.Core.Entities;

namespace Structo.Core.DTOs.Auth;

public class TenantRegisterDto
{
    [Required]
    [StringLength(100)]
    public required string CompanyName { get; set; }

    [Required]
    public required string BusinessDomain { get; set; }

    [Required]
    [StringLength(100)]
    public required string OwnerName { get; set; }

    [Required]
    [EmailAddress]
    public required string AdminEmail { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }
    
    public string SubscriptionPlan { get; set; } = "Free";
}
