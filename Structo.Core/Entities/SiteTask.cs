using System;
using System.Collections.Generic;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public enum SiteTaskStatus
{
    Pending,
    InProgress,
    UnderReview,
    Completed
}

public class SiteTask : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public Guid AssignedEngineerId { get; set; } // معرّف المهندس المسند له المشروع
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Weight { get; set; } = 1.0m; // وزن البند من إجمالي المشروع
    public int ProgressPercentage { get; set; } = 0; // من 0 إلى 100
    public SiteTaskStatus Status { get; set; } = SiteTaskStatus.Pending;

    public DateTime? PlannedStartDate { get; set; }
    public DateTime? PlannedEndDate { get; set; }
    public DateTime? CompletedAt { get; set; }

    public string? EngineerNotes { get; set; }
    public List<string> AttachmentUrls { get; set; } = new(); // صور وتقارير إثبات الإنجاز

    public ICollection<SiteTaskSettlementItem> LinkedSettlementItems { get; set; } = new List<SiteTaskSettlementItem>();
}
