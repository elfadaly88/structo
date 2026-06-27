using System;

namespace Structo.Core.Entities;

public class ProjectBudgetLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public decimal OldBudget { get; set; }
    public decimal NewBudget { get; set; }
    public string ReasonForChange { get; set; } = string.Empty;
    public string BoqFileUrl { get; set; } = string.Empty;
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public Project? Project { get; set; }
}
