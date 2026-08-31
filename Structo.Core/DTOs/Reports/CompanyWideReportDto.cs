using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Reports;

public class CompanyFinancialTotalsDto
{
    public decimal TotalBudget { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal NetBalance { get; set; }
    public decimal TotalOutstandingPettyCash { get; set; }
    public decimal TotalSettlements { get; set; }
    public int ProjectCount { get; set; }
}

public class ProjectFinancialBreakdownDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal NetBalance { get; set; }
    public decimal OutstandingPettyCash { get; set; }
    public decimal TotalSettlements { get; set; }
}

public class CompanyTransactionDto
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime TransactionDate { get; set; }
    public DateTime? PaymentDate { get; set; }
    public string? PaymentMethod { get; set; }
    public string? ReceiptPhotoUrl { get; set; }
    public bool IsLocked { get; set; }
}

public class CompanyWideReportDto
{
    public ReportDateRangeDto DateRange { get; set; } = new();
    public CompanyFinancialTotalsDto AggregatedTotals { get; set; } = new();
    public List<ProjectFinancialBreakdownDto> ProjectBreakdowns { get; set; } = [];
    public List<CompanyTransactionDto> CombinedTransactions { get; set; } = [];
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
