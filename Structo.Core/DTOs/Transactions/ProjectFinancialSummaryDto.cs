using System;

namespace Structo.Core.DTOs.Transactions;

public class ProjectFinancialSummaryDto
{
    public Guid ProjectId { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal NetBalance { get; set; }
    public int PendingApprovalsCount { get; set; }
}
