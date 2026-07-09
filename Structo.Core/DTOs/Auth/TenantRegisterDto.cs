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

    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "Personal phone must match 01xxxxxxxxx")]
    public string? PersonalPhone { get; set; }

    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "WhatsApp phone must match 01xxxxxxxxx")]
    public string? WhatsAppPhone { get; set; }

    public string? CommercialRegister { get; set; }
    public string? TaxCard { get; set; }
    public string? NationalId { get; set; }
    public string? SyndicateId { get; set; }

    public string? ManualAddress { get; set; }
    public string? MapLocationUrl { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}
