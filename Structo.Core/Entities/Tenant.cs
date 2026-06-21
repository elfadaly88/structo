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
    public double Rating { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<User> Users { get; set; } = [];
    public ICollection<Project> Projects { get; set; } = [];
}
