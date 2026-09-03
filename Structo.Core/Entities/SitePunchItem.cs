using System;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public enum PunchItemSeverity
{
    Low,
    Medium,
    Critical
}

public enum PunchItemStatus
{
    Open,
    FixedPendingReview,
    ApprovedAndClosed
}

public class SitePunchItem : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public Guid? SiteTaskId { get; set; } // ربط اختياري ببند التنفيذ
    public SiteTask? SiteTask { get; set; }

    public string Title { get; set; } = string.Empty;
    public PunchItemSeverity Severity { get; set; } = PunchItemSeverity.Medium;
    public PunchItemStatus Status { get; set; } = PunchItemStatus.Open;
    public string? SubcontractorName { get; set; } // الفني / المقاول المسؤول
    public string DefectPhotoUrl { get; set; } = string.Empty; // صورة العيب قبل الإصلاح
    public string? ResolutionPhotoUrl { get; set; } // صورة الإثبات بعد المعالجة
    public string? EngineerNotes { get; set; }

    public Guid CreatedByUserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }
}
