using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Projects;

public class EmployeeBalanceDto
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public decimal TotalIssued { get; set; }
    public decimal TotalSettled { get; set; }
    /// <summary>
    /// Positive = employee owes money back. Negative = company owes employee reimbursement.
    /// Zero = fully reconciled.
    /// </summary>
    public decimal Balance { get; set; }
    public bool IsClean => Balance == 0;
    public int UnsettledCount { get; set; }
}

public class ProjectReconciliationReportDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public decimal TotalBudget { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal NetBalance { get; set; }
    public decimal TotalCustodyIssued { get; set; }
    public decimal TotalCustodySettled { get; set; }
    public decimal TotalCustodyPending { get; set; }
    public int UnsettledCustodyCount { get; set; }
    public List<EmployeeBalanceDto> EmployeeBalances { get; set; } = [];
    /// <summary>
    /// True only when ALL employee balances == 0 AND no unsettled custody records exist.
    /// </summary>
    public bool IsFullyReconciled { get; set; }
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
