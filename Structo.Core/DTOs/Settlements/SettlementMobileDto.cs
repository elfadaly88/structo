using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Settlements;

public class SettlementMobileDto
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public Guid PettyCashId { get; set; }
    public decimal CustodyAmount { get; set; }
    public string CustodyReason { get; set; } = string.Empty;
    public string IssuedTo { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
    public string ResolvedBy { get; set; } = string.Empty;
    public decimal NetDifference { get; set; }
    public string Comments { get; set; } = string.Empty;
    
    public List<SettlementLineMobileDto> Lines { get; set; } = [];
}
