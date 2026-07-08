using System;
using Structo.Core.Interfaces; // تأكد من استدعاء الانترفيس

namespace Structo.Core.Entities;

public class SettlementLine : ITenantEntity // 🚀 اخليه يورث من هنا
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; } // 🚀 ضيف العمود ده فوراً
    public Guid SettlementId { get; set; }
    
    public string Category { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? InvoiceUrl { get; set; }

    // Navigation property
    public Settlement? Settlement { get; set; }
    public Tenant? Tenant { get; set; } // اختياري لربط النفيجيشن
}