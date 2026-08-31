using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Reports;
using Structo.Core.DTOs.Settlements;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class FinancialReportService(
    DbContext context,
    IFinancialTransactionService financialTransactionService,
    IProjectAccessService projectAccessService) : IFinancialReportService
{
    public async Task<ProjectFullReportDto?> GetSingleProjectFullReportAsync(
        Guid projectId, 
        DateTime? startDate, 
        DateTime? endDate, 
        Guid currentTenantId)
    {
        if (currentTenantId == Guid.Empty)
            throw new UnauthorizedAccessException("Tenant context missing or invalid.");

        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == currentTenantId);

        if (project == null)
            return null;

        // Ensure settlement expenses materialized in ledger before reporting
        await financialTransactionService.EnsureSettlementExpensesMaterializedAsync(projectId);

        DateTime? startUtc = startDate?.Date;
        DateTime? endUtc = endDate.HasValue ? endDate.Value.Date.AddDays(1).AddTicks(-1) : null;

        // Extract client name if stored in description JSON
        string? clientName = null;
        if (!string.IsNullOrWhiteSpace(project.Description) && project.Description.TrimStart().StartsWith('{'))
        {
            try
            {
                using var doc = JsonDocument.Parse(project.Description);
                if (doc.RootElement.TryGetProperty("client", out var clientProp))
                {
                    clientName = clientProp.GetString();
                }
            }
            catch
            {
                // Fallback gracefully on parsing issues
            }
        }

        // 1. Transactions Ledger
        var txQuery = context.Set<FinancialTransaction>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(t => t.ProjectId == projectId && t.TenantId == currentTenantId);

        if (startUtc.HasValue)
            txQuery = txQuery.Where(t => t.TransactionDate >= startUtc.Value);
        if (endUtc.HasValue)
            txQuery = txQuery.Where(t => t.TransactionDate <= endUtc.Value);

        var dbTransactions = await txQuery
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();

        var transactions = dbTransactions.Select(t => new FinancialTransactionMobileDto
        {
            Id = t.Id,
            Amount = t.Amount,
            Type = t.Type.ToString(),
            Description = t.Description,
            TransactionDate = t.TransactionDate,
            PaymentDate = t.PaymentDate,
            PaymentMethod = t.PaymentMethod?.ToString(),
            ReceiptPhotoUrl = t.ReceiptPhotoUrl,
            IsLocked = t.IsAudited || t.IsClosed || t.SettlementId.HasValue,
            CanEdit = !(t.IsAudited || t.IsClosed || t.SettlementId.HasValue),
            CanDelete = !(t.IsAudited || t.IsClosed || t.SettlementId.HasValue)
        }).ToList();

        // 2. Petty Cash History
        var pcQuery = context.Set<PettyCash>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Include(p => p.IssuedToUser)
            .Where(p => p.ProjectId == projectId && p.TenantId == currentTenantId);

        if (startUtc.HasValue)
            pcQuery = pcQuery.Where(p => p.IssuedAt >= startUtc.Value);
        if (endUtc.HasValue)
            pcQuery = pcQuery.Where(p => p.IssuedAt <= endUtc.Value);

        var dbPettyCash = await pcQuery
            .OrderByDescending(p => p.IssuedAt)
            .ToListAsync();

        var pettyCashes = dbPettyCash.Select(p => new PettyCashMobileDto
        {
            Id = p.Id,
            ProjectId = p.ProjectId,
            ProjectName = project.Name,
            Amount = p.Amount,
            Reason = p.Reason,
            IssuedAt = p.IssuedAt,
            IsSettled = p.IsSettled,
            IssuedTo = p.IssuedToUser != null ? $"{p.IssuedToUser.FirstName} {p.IssuedToUser.LastName}".Trim() : string.Empty,
            Status = p.Status,
            Category = p.Category,
            Comments = p.Comments,
            ReceiptPhotoUrl = p.ReceiptPhotoUrl,
            SettlementPaymentMethod = p.SettlementPaymentMethod?.ToString() ?? string.Empty,
            ExpenseDate = p.ExpenseDate,
            IsReimbursement = p.IsReimbursement
        }).ToList();

        // 3. Settlements History
        var settQuery = context.Set<Settlement>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Include(s => s.Lines)
            .Include(s => s.PettyCash)
                .ThenInclude(pc => pc!.IssuedToUser)
            .Include(s => s.ResolvedByUser)
            .Where(s => s.ProjectId == projectId && s.TenantId == currentTenantId);

        if (startUtc.HasValue)
            settQuery = settQuery.Where(s => s.SubmittedAt >= startUtc.Value);
        if (endUtc.HasValue)
            settQuery = settQuery.Where(s => s.SubmittedAt <= endUtc.Value);

        var dbSettlements = await settQuery
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync();

        var settlements = dbSettlements.Select(s => new SettlementMobileDto
        {
            Id = s.Id,
            ProjectId = s.ProjectId,
            ProjectName = project.Name,
            PettyCashId = s.PettyCashId,
            CustodyAmount = s.PettyCash?.Amount ?? 0,
            CustodyReason = s.PettyCash?.Reason ?? string.Empty,
            IssuedTo = s.PettyCash?.IssuedToUser != null 
                ? $"{s.PettyCash.IssuedToUser.FirstName} {s.PettyCash.IssuedToUser.LastName}".Trim() 
                : string.Empty,
            TotalAmount = s.TotalAmount,
            Status = s.Status.ToString(),
            SubmittedAt = s.SubmittedAt,
            ResolvedAt = s.ResolvedAt,
            ResolvedBy = s.ResolvedByUser != null 
                ? $"{s.ResolvedByUser.FirstName} {s.ResolvedByUser.LastName}".Trim() 
                : string.Empty,
            NetDifference = s.NetDifference,
            Comments = s.Comments,
            Lines = s.Lines.Select(l => new SettlementLineMobileDto
            {
                Id = l.Id,
                Category = l.Category,
                Amount = l.Amount,
                Description = l.Description,
                InvoiceUrl = l.InvoiceUrl ?? string.Empty,
                IsBillableToClient = l.IsBillableToClient
            }).ToList()
        }).ToList();

        // 4. Financial Summary & Reconciliation Calculations
        var incomeTotal = dbTransactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount);
        var expensesTotal = dbTransactions.Where(t => t.Type == TransactionType.Expense || t.Type == TransactionType.DirectProjectExpense).Sum(t => t.Amount);
        var custodyIssued = dbPettyCash.Where(p => p.Status == "Issued" || p.Status == "Settled" || p.Status == "SettlePending").Sum(p => p.Amount);
        var custodySettled = dbSettlements.Where(s => s.Status == SettlementStatus.Approved || s.Status == SettlementStatus.Refunded).Sum(s => s.TotalAmount);
        var custodyReturned = dbSettlements.Where(s => s.Status == SettlementStatus.Refunded || (s.Status == SettlementStatus.Approved && s.NetDifference > 0)).Sum(s => s.NetDifference);
        var custodyPending = custodyIssued - custodySettled - custodyReturned;
        if (custodyPending < 0) custodyPending = 0;

        var pools = await context.Set<ProjectCashPool>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => p.ProjectId == projectId && p.TenantId == currentTenantId)
            .ToListAsync();
        var remainingPoolBalance = pools.Sum(p => p.AvailableBalance);

        var unsettledCount = dbPettyCash.Count(p => !p.IsSettled && p.Status != "Rejected");

        return new ProjectFullReportDto
        {
            Project = new ProjectInfoDto
            {
                Id = project.Id,
                Name = project.Name,
                Client = clientName,
                Budget = project.Budget,
                Status = project.Status.ToString(),
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                CreatedAt = project.CreatedAt
            },
            DateRange = new ReportDateRangeDto
            {
                StartDate = startDate,
                EndDate = endDate
            },
            Summary = new ProjectReportSummaryDto
            {
                TotalBudget = project.Budget,
                TotalIncome = incomeTotal,
                TotalExpenses = expensesTotal,
                NetBalance = incomeTotal - expensesTotal,
                TotalCustodyIssued = custodyIssued,
                TotalCustodySettled = custodySettled,
                TotalCustodyPending = custodyPending,
                TotalCustodyReturned = custodyReturned,
                UnsettledCustodyCount = unsettledCount,
                RemainingPoolBalance = remainingPoolBalance
            },
            Transactions = transactions,
            PettyCashes = pettyCashes,
            Settlements = settlements,
            GeneratedAt = DateTime.UtcNow
        };
    }

    public async Task<CompanyWideReportDto> GetCompanyWideFullReportAsync(
        Guid currentTenantId, 
        Guid currentUserId, 
        string currentUserRole, 
        DateTime? startDate, 
        DateTime? endDate, 
        Guid? filterProjectId)
    {
        if (currentTenantId == Guid.Empty)
            throw new UnauthorizedAccessException("Tenant context missing or invalid.");

        if (currentUserRole == "SuperAdmin")
            throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.");

        if (currentUserRole != "TenantOwner" && currentUserRole != "Accountant")
            throw new UnauthorizedAccessException("Only TenantOwner and Accountant can access company-wide financial reports.");

        // Resolve in-scope projects
        List<Guid> inScopeProjectIds;
        if (currentUserRole == "TenantOwner")
        {
            inScopeProjectIds = await context.Set<Project>()
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Where(p => p.TenantId == currentTenantId)
                .Select(p => p.Id)
                .ToListAsync();
        }
        else // Accountant: restricted strictly to assigned projects
        {
            var assignedIds = await projectAccessService.GetAssignedProjectIdsForUserAsync(currentUserId);
            inScopeProjectIds = await context.Set<Project>()
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Where(p => p.TenantId == currentTenantId && assignedIds.Contains(p.Id))
                .Select(p => p.Id)
                .ToListAsync();
        }

        // If specific project filter requested, verify scope
        string? filterProjectName = null;
        if (filterProjectId.HasValue)
        {
            if (!inScopeProjectIds.Contains(filterProjectId.Value))
            {
                throw new UnauthorizedAccessException("Forbidden: You are not assigned to or authorized for this project.");
            }

            inScopeProjectIds = [filterProjectId.Value];
            var filterProject = await context.Set<Project>()
                .IgnoreQueryFilters()
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == filterProjectId.Value && p.TenantId == currentTenantId);
            filterProjectName = filterProject?.Name;
        }

        var projects = await context.Set<Project>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => inScopeProjectIds.Contains(p.Id) && p.TenantId == currentTenantId)
            .OrderBy(p => p.Name)
            .ToListAsync();

        DateTime? startUtc = startDate?.Date;
        DateTime? endUtc = endDate.HasValue ? endDate.Value.Date.AddDays(1).AddTicks(-1) : null;

        // Ensure settlement expenses materialized in ledger for all in-scope projects
        foreach (var p in projects)
        {
            await financialTransactionService.EnsureSettlementExpensesMaterializedAsync(p.Id);
        }

        // Combined Transactions
        var txQuery = context.Set<FinancialTransaction>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Include(t => t.Project)
            .Where(t => inScopeProjectIds.Contains(t.ProjectId) && t.TenantId == currentTenantId);

        if (startUtc.HasValue)
            txQuery = txQuery.Where(t => t.TransactionDate >= startUtc.Value);
        if (endUtc.HasValue)
            txQuery = txQuery.Where(t => t.TransactionDate <= endUtc.Value);

        var dbTransactions = await txQuery
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();

        var combinedTransactions = dbTransactions.Select(t => new CompanyTransactionDto
        {
            Id = t.Id,
            ProjectId = t.ProjectId,
            ProjectName = t.Project?.Name ?? string.Empty,
            Amount = t.Amount,
            Type = t.Type.ToString(),
            Description = t.Description,
            TransactionDate = t.TransactionDate,
            PaymentDate = t.PaymentDate,
            PaymentMethod = t.PaymentMethod?.ToString(),
            ReceiptPhotoUrl = t.ReceiptPhotoUrl,
            IsLocked = t.IsAudited || t.IsClosed || t.SettlementId.HasValue
        }).ToList();

        // Petty Cash across in-scope projects
        var pcQuery = context.Set<PettyCash>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => inScopeProjectIds.Contains(p.ProjectId) && p.TenantId == currentTenantId && p.Status != "Rejected");

        if (startUtc.HasValue)
            pcQuery = pcQuery.Where(p => p.IssuedAt >= startUtc.Value);
        if (endUtc.HasValue)
            pcQuery = pcQuery.Where(p => p.IssuedAt <= endUtc.Value);

        var dbPettyCash = await pcQuery.ToListAsync();

        // Settlements across in-scope projects
        var settQuery = context.Set<Settlement>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(s => inScopeProjectIds.Contains(s.ProjectId) && s.TenantId == currentTenantId && 
                        (s.Status == SettlementStatus.Approved || s.Status == SettlementStatus.Refunded));

        if (startUtc.HasValue)
            settQuery = settQuery.Where(s => s.SubmittedAt >= startUtc.Value);
        if (endUtc.HasValue)
            settQuery = settQuery.Where(s => s.SubmittedAt <= endUtc.Value);

        var dbSettlements = await settQuery.ToListAsync();

        // Per-project breakdowns
        var breakdowns = new List<ProjectFinancialBreakdownDto>();
        foreach (var proj in projects)
        {
            var pIncome = dbTransactions
                .Where(t => t.ProjectId == proj.Id && t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var pExpenses = dbTransactions
                .Where(t => t.ProjectId == proj.Id && (t.Type == TransactionType.Expense || t.Type == TransactionType.DirectProjectExpense))
                .Sum(t => t.Amount);

            var pOutstandingPettyCash = dbPettyCash
                .Where(p => p.ProjectId == proj.Id && !p.IsSettled)
                .Sum(p => p.Amount);

            var pSettlements = dbSettlements
                .Where(s => s.ProjectId == proj.Id)
                .Sum(s => s.TotalAmount);

            breakdowns.Add(new ProjectFinancialBreakdownDto
            {
                ProjectId = proj.Id,
                ProjectName = proj.Name,
                Status = proj.Status.ToString(),
                Budget = proj.Budget,
                TotalIncome = pIncome,
                TotalExpenses = pExpenses,
                NetBalance = pIncome - pExpenses,
                OutstandingPettyCash = pOutstandingPettyCash,
                TotalSettlements = pSettlements
            });
        }

        var totalIncome = dbTransactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount);
        var totalExpenses = dbTransactions.Where(t => t.Type == TransactionType.Expense || t.Type == TransactionType.DirectProjectExpense).Sum(t => t.Amount);
        var totalOutstandingPettyCash = dbPettyCash.Where(p => !p.IsSettled).Sum(p => p.Amount);
        var totalSettlements = dbSettlements.Sum(s => s.TotalAmount);
        var totalBudget = projects.Sum(p => p.Budget);

        return new CompanyWideReportDto
        {
            DateRange = new ReportDateRangeDto
            {
                StartDate = startDate,
                EndDate = endDate,
                FilterProjectId = filterProjectId,
                FilterProjectName = filterProjectName
            },
            AggregatedTotals = new CompanyFinancialTotalsDto
            {
                TotalBudget = totalBudget,
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                NetBalance = totalIncome - totalExpenses,
                TotalOutstandingPettyCash = totalOutstandingPettyCash,
                TotalSettlements = totalSettlements,
                ProjectCount = projects.Count
            },
            ProjectBreakdowns = breakdowns,
            CombinedTransactions = combinedTransactions,
            GeneratedAt = DateTime.UtcNow
        };
    }
}
