using System;
using System.Collections.Generic;
using Structo.Core.DTOs.Settlements;
using Structo.Core.DTOs.Transactions;

namespace Structo.Core.DTOs.Reports;

public class ProjectInfoDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Client { get; set; }
    public decimal Budget { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ReportDateRangeDto
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsFullPeriod => !StartDate.HasValue && !EndDate.HasValue;
    public Guid? FilterProjectId { get; set; }
    public string? FilterProjectName { get; set; }
}

public class ProjectReportSummaryDto
{
    public decimal TotalBudget { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal NetBalance { get; set; }
    public decimal TotalCustodyIssued { get; set; }
    public decimal TotalCustodySettled { get; set; }
    public decimal TotalCustodyPending { get; set; }
    public decimal TotalCustodyReturned { get; set; }
    public int UnsettledCustodyCount { get; set; }
    public decimal RemainingPoolBalance { get; set; }
}

public class ProjectFullReportDto
{
    public ProjectInfoDto Project { get; set; } = new();
    public ReportDateRangeDto DateRange { get; set; } = new();
    public ProjectReportSummaryDto Summary { get; set; } = new();
    public List<FinancialTransactionMobileDto> Transactions { get; set; } = [];
    public List<PettyCashMobileDto> PettyCashes { get; set; } = [];
    public List<SettlementMobileDto> Settlements { get; set; } = [];
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
