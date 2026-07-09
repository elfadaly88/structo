using Structo.Core.Enums;
using System;

namespace Structo.Core.DTOs.Tenants;

public class TenantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SubscriptionPlan { get; set; } = string.Empty;
    public int MaxActiveProjects { get; set; }
    public string LogoUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyDescription { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public double Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? AdminEmail { get; set; }
    public string? AdminFirstName { get; set; }
    public string? AdminLastName { get; set; }
    public string? Location { get; set; }
    public string? CommercialRegister { get; set; }
    public string? TaxCard { get; set; }
    public string? NationalId { get; set; }
    public string? SyndicateId { get; set; }
    public string? ManualAddress { get; set; }
    public string? MapLocationUrl { get; set; }
    public string? AccountType { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}
