using System;
using System.Collections.Generic;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class Project : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public string? ClientName { get; set; }
    public bool IsPublicPortfolio { get; set; }
    public string? Category { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid? ManagerId { get; set; }

    // --- Closeout fields ---
    public ProjectStatus Status { get; set; } = ProjectStatus.Active;
    public string? PublicReviewToken { get; set; }
    public string? ClientReviewNotes { get; set; }
    public int? ClientRating { get; set; }

    // Navigation properties
    public Tenant? Tenant { get; set; }
    public User? Manager { get; set; }
    public ICollection<FinancialTransaction> FinancialTransactions { get; set; } = [];
    public ICollection<PettyCash> PettyCashes { get; set; } = [];
    public ICollection<SitePhoto> SitePhotos { get; set; } = [];
    public ICollection<Settlement> Settlements { get; set; } = [];
}
