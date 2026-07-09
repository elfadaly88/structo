using System;
using System.Collections.Generic;
using Structo.Core.Enums;

namespace Structo.Core.Entities;

public class Tenant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public SubscriptionPlan SubscriptionPlan { get; set; } = SubscriptionPlan.Free;
    public int MaxActiveProjects { get; set; }
    public string LogoUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyDescription { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public double Rating { get; set; }
    public TenantStatus Status { get; set; } = TenantStatus.Active;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string Location { get; set; } = string.Empty;
    public string? CommercialRegister { get; set; }
    public string? TaxCard { get; set; }
    public string AccountType { get; set; } = "Company";

    public string? ManualAddress { get; set; }
    public string? MapLocationUrl { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    // Navigation properties
    public ICollection<User> Users { get; set; } = [];
    public ICollection<Project> Projects { get; set; } = [];
}
