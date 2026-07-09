using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Tenants;

public class TenantProfileUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyDescription { get; set; } = string.Empty;
    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "Personal phone must match 01xxxxxxxxx")]
    public string? PersonalPhone { get; set; }

    [MaxLength(11)]
    [RegularExpression(@"^01\d{9}$", ErrorMessage = "WhatsApp phone must match 01xxxxxxxxx")]
    public string? WhatsAppPhone { get; set; }

    public string? ManualAddress { get; set; }
    public string? MapLocationUrl { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}
