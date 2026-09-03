using System;
using Structo.Core.Interfaces;

namespace Structo.Core.Entities;

public class SiteDailyLog : ITenantEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public DateTime LogDate { get; set; } = DateTime.UtcNow.Date;
    public Guid LoggedByUserId { get; set; }
    public string? WeatherCondition { get; set; } // صحو، ممطر، عاصف، شديد الحرارة
    public int WorkforceCount { get; set; }
    public string? WorkforceSummary { get; set; } // تفصيل المهن: عمال، نجارين، سباكين
    public string? MaterialsDelivered { get; set; } // الخامات الموردة مع أرقام الأذون
    public string? GeneralObservations { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
