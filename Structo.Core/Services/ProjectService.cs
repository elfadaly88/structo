using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Projects;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Structo.Core.Services;

public class ProjectService(DbContext context, ITenantContextAccessor tenantContextAccessor) : IProjectService
{
    private string BuildLegacyDescription(Project p)
    {
        var obj = new JsonObject();
        obj["client"] = p.ClientName ?? string.Empty;
        obj["budget"] = p.Budget;
        obj["description"] = p.Description ?? string.Empty;
        obj["category"] = p.Category ?? string.Empty;
        obj["isPublic"] = p.IsPublicPortfolio;
        return obj.ToJsonString();
    }

    private ProjectDto MapToDto(Project p, string? userRole = null) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Description = userRole == "SuperAdmin" ? string.Empty : BuildLegacyDescription(p),
        StartDate = p.StartDate,
        EndDate = p.EndDate,
        IsActive = p.IsActive,
        ManagerId = p.ManagerId,
        Status = p.Status.ToString(),
        PublicReviewToken = p.PublicReviewToken,
        Governorate = p.Governorate,
        CityOrZone = p.CityOrZone,
        SiteAddress = p.SiteAddress,
        ClientName = p.ClientName,
        ClientWhatsApp = p.ClientWhatsApp,
        PropertyType = p.PropertyType.ToString(),
        ClientReviewNotes = p.ClientReviewNotes,
        ClientRating = p.ClientRating,
        IsReviewHidden = p.IsReviewHidden
    };

    public async Task<List<ProjectDto>> GetAllProjectsAsync(Guid? tenantIdFilter, string userRole)
    {
        var query = context.Set<Project>().AsQueryable();

        if (userRole != "SuperAdmin")
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null)
            {
                throw new UnauthorizedAccessException("Tenant ID claim missing or invalid.");
            }
            query = query.Where(p => p.TenantId == currentTenantId.Value);
        }
        else if (tenantIdFilter.HasValue)
        {
            query = query.Where(p => p.TenantId == tenantIdFilter.Value);
        }

        var projects = await query
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return projects.Select(p => MapToDto(p, userRole)).ToList();
    }

    public async Task<(bool Success, ProjectDto? Data, string Message)> CreateProjectAsync(ProjectCreateDto dto, string userRole)
    {
        Guid tenantId;

        if (userRole == "SuperAdmin")
        {
            if (!dto.TenantId.HasValue || dto.TenantId.Value == Guid.Empty)
            {
                return (false, null, "Tenant ID is required for SuperAdmin.");
            }
            tenantId = dto.TenantId.Value;
        }
        else
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null)
            {
                return (false, null, "Tenant ID claim missing or invalid.");
            }
            tenantId = currentTenantId.Value;
        }

        // Handle parsing legacy JSON description if frontend still sends it
        string innerDesc = dto.Description;
        decimal budget = 0;
        string client = string.Empty;

        if (!string.IsNullOrEmpty(dto.Description) && dto.Description.StartsWith('{'))
        {
            try
            {
                var json = JsonSerializer.Deserialize<JsonObject>(dto.Description);
                if (json != null)
                {
                    if (json.TryGetPropertyValue("client", out var cNode) && cNode != null) client = cNode.ToString();
                    if (json.TryGetPropertyValue("description", out var dNode) && dNode != null) innerDesc = dNode.ToString();
                    if (json.TryGetPropertyValue("budget", out var bNode) && bNode != null) decimal.TryParse(bNode.ToString(), out budget);
                }
            }
            catch { }
        }

        var project = new Project
        {
            TenantId = tenantId,
            Name = dto.Name,
            Description = innerDesc,
            Budget = budget,
            ClientName = !string.IsNullOrWhiteSpace(dto.ClientName) ? dto.ClientName : client,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            ManagerId = dto.ManagerId,
            Status = ProjectStatus.Active,
            Governorate = dto.Governorate,
            CityOrZone = dto.CityOrZone,
            SiteAddress = dto.SiteAddress,
            ClientWhatsApp = dto.ClientWhatsApp,
            PropertyType = Enum.TryParse<PropertyType>(dto.PropertyType, true, out var pType) ? pType : PropertyType.Residential
        };

        context.Set<Project>().Add(project);
        await context.SaveChangesAsync();

        return (true, MapToDto(project), "Project created successfully");
    }

    public async Task<(bool Success, ProjectDto? Data, string Message)> UpdateProjectAsync(Guid id, ProjectCreateDto dto, string userRole)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return (false, null, "Project not found.");

        if (userRole != "SuperAdmin")
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null || project.TenantId != currentTenantId.Value)
            {
                return (false, null, "Unauthorized access to this project.");
            }
        }

        project.Name = dto.Name;
        project.StartDate = dto.StartDate;
        project.EndDate = dto.EndDate;
        project.ManagerId = dto.ManagerId;

        // Parse description
        string innerDesc = dto.Description;
        decimal budget = project.Budget;
        string client = project.ClientName ?? string.Empty;
        bool isPublic = project.IsPublicPortfolio;
        string category = project.Category ?? string.Empty;

        if (!string.IsNullOrEmpty(dto.Description) && dto.Description.StartsWith('{'))
        {
            try
            {
                var json = JsonSerializer.Deserialize<JsonObject>(dto.Description);
                if (json != null)
                {
                    if (json.TryGetPropertyValue("client", out var cNode) && cNode != null) client = cNode.ToString();
                    if (json.TryGetPropertyValue("description", out var dNode) && dNode != null) innerDesc = dNode.ToString();
                    if (json.TryGetPropertyValue("budget", out var bNode) && bNode != null) decimal.TryParse(bNode.ToString(), out budget);
                    if (json.TryGetPropertyValue("category", out var catNode) && catNode != null) category = catNode.ToString();
                    if (json.TryGetPropertyValue("isPublicPortfolio", out var pubNode) && pubNode != null) bool.TryParse(pubNode.ToString(), out isPublic);
                    else if (json.TryGetPropertyValue("isPublic", out var pubNode2) && pubNode2 != null) bool.TryParse(pubNode2.ToString(), out isPublic);
                }
            }
            catch { }
        }

        project.Description = innerDesc;
        project.Budget = budget;
        project.ClientName = !string.IsNullOrWhiteSpace(dto.ClientName) ? dto.ClientName : client;
        project.IsPublicPortfolio = isPublic;
        project.Category = category;
        project.Governorate = dto.Governorate;
        project.CityOrZone = dto.CityOrZone;
        project.SiteAddress = dto.SiteAddress;
        project.ClientWhatsApp = dto.ClientWhatsApp;
        project.PropertyType = Enum.TryParse<PropertyType>(dto.PropertyType, true, out var pType) ? pType : PropertyType.Residential;

        await context.SaveChangesAsync();

        return (true, MapToDto(project), "Project updated successfully");
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return null;
        return MapToDto(project);
    }

    public async Task<ProjectClientViewDto?> GetProjectClientViewAsync(Guid id)
    {
        var project = await context.Set<Project>()
            .Include(p => p.SitePhotos)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null) return null;

        return new ProjectClientViewDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            PublicDescription = BuildLegacyDescription(project),
            ProgressPercentage = 45, // Mocked progress calculation
            RecentPhotoUrls = project.SitePhotos
                .OrderByDescending(sp => sp.UploadedAt)
                .Take(5)
                .Select(sp => sp.PhotoUrl)
                .ToList()
        };
    }

    public async Task<(bool Success, string Message)> ReviseBudgetAsync(Guid id, ProjectBudgetRevisionDto dto)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null)
            return (false, "Project not found.");

        decimal oldBudget = project.Budget;
        project.Budget = dto.NewBudget;

        var log = new ProjectBudgetLog
        {
            ProjectId = id,
            OldBudget = oldBudget,
            NewBudget = dto.NewBudget,
            ReasonForChange = dto.ReasonForChange,
            BoqFileUrl = dto.BoqFileUrl
        };

        context.Set<ProjectBudgetLog>().Add(log);
        await context.SaveChangesAsync();

        return (true, "Project budget revised and logged successfully.");
    }

    public async Task<List<ProjectBudgetLog>> GetBudgetHistoryAsync(Guid id)
    {
        return await context.Set<ProjectBudgetLog>()
            .Where(l => l.ProjectId == id)
            .OrderByDescending(l => l.ChangedAt)
            .ToListAsync();
    }

    // =====================================================================
    // CLOSEOUT WORKFLOW
    // =====================================================================

    public async Task<ProjectReconciliationReportDto?> GetReconciliationReportAsync(Guid id, Guid tenantId)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId);
        if (project == null) return null;

        // Load all PettyCash for this project (not rejected)
        var pettyCashes = await context.Set<PettyCash>()
            .Include(pc => pc.IssuedToUser)
            .Where(pc => pc.ProjectId == id && pc.Status != "Rejected")
            .ToListAsync();

        // Load all FinancialTransactions for this project
        var transactions = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == id)
            .ToListAsync();

        var incomeTypes = new[] { TransactionType.Income };
        var expenseTypes = new[] { TransactionType.Expense, TransactionType.DirectProjectExpense };

        var totalIncome = transactions.Where(t => incomeTypes.Contains(t.Type)).Sum(t => t.Amount);
        var totalExpenses = transactions.Where(t => expenseTypes.Contains(t.Type)).Sum(t => t.Amount);

        var totalCustodyIssued = pettyCashes.Sum(pc => pc.Amount);
        var totalCustodySettled = pettyCashes.Where(pc => pc.IsSettled).Sum(pc => pc.Amount);
        var unsettledCustody = pettyCashes.Where(pc => !pc.IsSettled).ToList();

        // Build per-employee balance ledger
        var employeeGroups = pettyCashes
            .GroupBy(pc => pc.IssuedToUserId)
            .Select(g =>
            {
                var first = g.First();
                var name = first.IssuedToUser != null
                    ? $"{first.IssuedToUser.FirstName} {first.IssuedToUser.LastName}"
                    : g.Key.ToString();
                var issued = g.Sum(pc => pc.Amount);
                var settled = g.Where(pc => pc.IsSettled).Sum(pc => pc.SpentAmount); // actual spent
                var unsettledCount = g.Count(pc => !pc.IsSettled);
                // Balance > 0: employee still holds unaccounted cash
                // Balance == 0: fully clean
                var balance = issued - settled - g.Where(pc => pc.IsSettled).Sum(pc => pc.ReturnAmount);
                return new EmployeeBalanceDto
                {
                    UserId = g.Key,
                    FullName = name,
                    TotalIssued = issued,
                    TotalSettled = settled,
                    Balance = balance,
                    UnsettledCount = unsettledCount
                };
            })
            .ToList();

        var isFullyReconciled = employeeGroups.All(e => e.Balance == 0) && unsettledCustody.Count == 0;

        return new ProjectReconciliationReportDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            Status = project.Status.ToString(),
            TotalBudget = project.Budget,
            TotalIncome = totalIncome,
            TotalExpenses = totalExpenses,
            NetBalance = totalIncome - totalExpenses,
            TotalCustodyIssued = totalCustodyIssued,
            TotalCustodySettled = totalCustodySettled,
            TotalCustodyPending = totalCustodyIssued - totalCustodySettled,
            UnsettledCustodyCount = unsettledCustody.Count,
            EmployeeBalances = employeeGroups,
            IsFullyReconciled = isFullyReconciled,
            GeneratedAt = DateTime.UtcNow
        };
    }

    public async Task<(bool Success, string Message)> FreezeProjectAsync(Guid id, Guid tenantId, string userRole)
    {
        if (userRole != "TenantOwner" && userRole != "Accountant")
            throw new UnauthorizedAccessException("Only TenantOwner or Accountant can freeze a project.");

        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId);
        if (project == null) return (false, "Project not found.");

        if (project.Status == ProjectStatus.Closed)
            return (false, "Project is already closed and cannot be modified.");

        project.Status = ProjectStatus.FinancialFreeze;
        if (string.IsNullOrEmpty(project.PublicReviewToken))
            project.PublicReviewToken = Guid.NewGuid().ToString("N");

        await context.SaveChangesAsync();
        return (true, $"Project frozen successfully. Public review token: {project.PublicReviewToken}");
    }

    public async Task<(bool Success, string Message)> FinalCloseoutAsync(Guid id, Guid tenantId, string userRole)
    {
        if (userRole != "TenantOwner")
            throw new UnauthorizedAccessException("Only TenantOwner can perform a final project closeout.");

        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId);
        if (project == null) return (false, "Project not found.");

        if (project.Status == ProjectStatus.Closed)
            return (false, "Project is already closed.");

        // Run reconciliation check
        var report = await GetReconciliationReportAsync(id, tenantId);
        if (report == null) return (false, "Failed to generate reconciliation report.");

        if (!report.IsFullyReconciled)
        {
            var pendingNames = report.EmployeeBalances
                .Where(e => !e.IsClean)
                .Select(e => $"{e.FullName} (رصيد: {e.Balance:F2} EGP)")
                .ToList();
            var detail = report.UnsettledCustodyCount > 0
                ? $"يوجد {report.UnsettledCustodyCount} عهدة غير مُسوّاة. "
                : string.Empty;
            detail += pendingNames.Count > 0
                ? "الأرصدة غير المصفّاة: " + string.Join(", ", pendingNames)
                : string.Empty;
            return (false, $"RECONCILIATION_REQUIRED: لا يمكن إغلاق المشروع بشكل نهائي. {detail}".Trim());
        }

        project.Status = ProjectStatus.Closed;
        project.IsActive = false;

        await context.SaveChangesAsync();
        return (true, "تم إغلاق المشروع نهائياً وتجميد جميع العمليات المالية. سجل التدقيق محفوظ بشكل دائم.");
    }

    public async Task<(bool Success, string Message)> SubmitClientReviewAsync(string token, ClientReviewSubmitDto dto)
    {
        if (string.IsNullOrWhiteSpace(token))
            return (false, "Invalid review token.");

        var project = await context.Set<Project>()
            .IgnoreQueryFilters() // bypass tenant filter — this is a public endpoint
            .FirstOrDefaultAsync(p => p.PublicReviewToken == token);

        if (project == null)
            return (false, "Review link is invalid or has expired.");

        if (dto.Rating.HasValue && (dto.Rating < 1 || dto.Rating > 5))
            return (false, "Rating must be between 1 and 5.");

        if (dto.Rating.HasValue) project.ClientRating = dto.Rating;
        if (!string.IsNullOrWhiteSpace(dto.Notes)) project.ClientReviewNotes = dto.Notes;

        await context.SaveChangesAsync();
        return (true, "شكراً لك! تم تسجيل تقييمك بنجاح.");
    }
}
