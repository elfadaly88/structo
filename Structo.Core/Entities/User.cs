using System;
using System.Collections.Generic;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? TenantId { get; set; }
    
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public ICollection<Project> ManagedProjects { get; set; } = [];
    public ICollection<PettyCash> PettyCashes { get; set; } = [];
}
