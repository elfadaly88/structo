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

    [Required]
    public string AccountType { get; set; } = "Company";

    [Required]
    public string Location { get; set; } = string.Empty;

    [Required]
    public string MobileNumber { get; set; } = string.Empty;

    public string? CommercialRegister { get; set; }
    public string? TaxCard { get; set; }
    public string? NationalId { get; set; }
    public string? SyndicateId { get; set; }
}
