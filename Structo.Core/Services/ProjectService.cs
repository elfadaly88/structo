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

public class ProjectService(
    DbContext context,
    ITenantContextAccessor tenantContextAccessor,
    INotificationEngine notificationEngine) : IProjectService
{
    private string BuildLegacyDescription(Project p)
    {
        var obj = new JsonObject();
        obj["client"] = p.ClientName ?? string.Empty;
        obj["budget"] = p.Budget;
        
        string descText = p.Description ?? string.Empty;
        string boqUrl = string.Empty;
        string boqName = string.Empty;

        if (!string.IsNullOrEmpty(descText) && descText.StartsWith('{'))
        {
            try
            {
                var parsed = JsonSerializer.Deserialize<JsonObject>(descText);
                if (parsed != null)
                {
                    if (parsed.TryGetPropertyValue("description", out var dNode) && dNode != null) descText = dNode.ToString();
                    if (parsed.TryGetPropertyValue("boqFileUrl", out var uNode) && uNode != null) boqUrl = uNode.ToString();
                    if (parsed.TryGetPropertyValue("boqFileName", out var nNode) && nNode != null) boqName = nNode.ToString();
                }
            }
            catch { }
        }

        obj["description"] = descText;
        obj["category"] = p.Category ?? string.Empty;
        obj["isPublic"] = p.IsPublicPortfolio;
        if (!string.IsNullOrEmpty(boqUrl))
        {
            obj["boqFileUrl"] = boqUrl;
            obj["boqFileName"] = boqName;
        }
        return obj.ToJsonString();
    }

    private static DateTime ToEgyptLocalTime(DateTime utcTime)
    {
        TimeZoneInfo egyptZone;
        try
        {
            egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time");
        }
        catch (TimeZoneNotFoundException)
        {
            egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Africa/Cairo");
        }
        
        // Ensure the input DateTime has Utc Kind before conversion
        var utc = utcTime.Kind == DateTimeKind.Unspecified 
            ? DateTime.SpecifyKind(utcTime, DateTimeKind.Utc) 
            : utcTime.ToUniversalTime();
            
        return TimeZoneInfo.ConvertTimeFromUtc(utc, egyptZone);
    }

    private ProjectDto MapToDto(Project p, string? userRole = null)
    {
        var completionDate = (p.Status == ProjectStatus.Closed || p.EndDate.HasValue) && p.EndDate.HasValue && p.EndDate.Value.Year > 1
            ? ToEgyptLocalTime(p.EndDate.Value)
            : (DateTime?)null;
        var createdAt = p.CreatedAt.Year > 1 ? ToEgyptLocalTime(p.CreatedAt) : (DateTime?)null;
        var startDate = p.StartDate.Year > 1 ? ToEgyptLocalTime(p.StartDate) : (DateTime?)null;
        var displayDate = completionDate ?? createdAt;

        return new()
        {
            Id = p.Id,
            Name = p.Name,
            Description = userRole == "SuperAdmin" ? string.Empty : BuildLegacyDescription(p),
            StartDate = startDate,
            EndDate = p.EndDate.HasValue && p.EndDate.Value.Year > 1 ? ToEgyptLocalTime(p.EndDate.Value) : null,
            CreatedAt = createdAt,
            CompletionDate = completionDate,
            DisplayDate = displayDate,
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
    }

    public async Task<List<ProjectDto>> GetAllProjectsAsync(Guid? tenantIdFilter, string userRole, Guid? currentUserId = null)
    {
        var query = context.Set<Project>().AsNoTracking().AsQueryable();

        if (userRole != "SuperAdmin")
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null)
            {
                throw new UnauthorizedAccessException("Tenant ID claim missing or invalid.");
            }
            query = query.Where(p => p.TenantId == currentTenantId.Value);

            // Scoped visibility: Non-TenantOwner roles (Manager, Accountant, SiteEngineer, DesignEngineer)
            // only see projects they are assigned to
            if (userRole != "TenantOwner" && currentUserId.HasValue && currentUserId.Value != Guid.Empty)
            {
                var assignedProjectIds = await context.Set<ProjectMember>()
                    .AsNoTracking()
                    .Where(pm => pm.UserId == currentUserId.Value)
                    .Select(pm => pm.ProjectId)
                    .ToListAsync();

                query = query.Where(p => assignedProjectIds.Contains(p.Id));
            }
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

    public async Task<(bool Success, ProjectDto? Data, string Message)> CreateProjectAsync(ProjectCreateDto dto, string userRole, Guid? assignedByUserId = null)
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
        string boqFileUrl = string.Empty;
        string boqFileName = string.Empty;

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
                    if (json.TryGetPropertyValue("boqFileUrl", out var boqUrlNode) && boqUrlNode != null) boqFileUrl = boqUrlNode.ToString();
                    if (json.TryGetPropertyValue("boqFileName", out var boqNameNode) && boqNameNode != null) boqFileName = boqNameNode.ToString();
                }
            }
            catch { }
        }

        var tenant = await context.Set<Tenant>().FirstOrDefaultAsync(t => t.Id == tenantId);
        var allowedProjects = tenant?.MaxActiveProjects ?? 1;

        // ─── Total Lifetime Slot Logic ─────────────────────────────────────────────
        var usedProjects = await context.Set<Project>()
            .CountAsync(p => p.TenantId == tenantId);

        var finalStatus = ProjectStatus.Active;
        var isActive = true;
        var creationMessage = "Project created successfully";

        if (usedProjects >= allowedProjects)
        {
            finalStatus = ProjectStatus.PendingActivation;
            isActive = false;
            creationMessage = "QUOTA_EXCEEDED: Project created under PendingActivation status.";
        }

        // Validate assigned users if provided
        if (dto.AssignedUserIds != null && dto.AssignedUserIds.Any())
        {
            var assignedUsers = await context.Set<User>()
                .Where(u => dto.AssignedUserIds.Contains(u.Id) && u.TenantId == tenantId)
                .ToListAsync();

            if (assignedUsers.Count != dto.AssignedUserIds.Distinct().Count())
            {
                return (false, null, "One or more assigned users do not exist in this company.");
            }

            if (assignedUsers.Any(u => u.Role == UserRole.TenantOwner || u.Role == UserRole.SuperAdmin))
            {
                return (false, null, "TenantOwner or SuperAdmin users cannot be explicitly assigned to projects.");
            }
        }

        string cleanDesc = Structo.Core.Helpers.HtmlSanitizer.Sanitize(innerDesc) ?? string.Empty;
        string storedDesc = cleanDesc;
        if (!string.IsNullOrEmpty(boqFileUrl))
        {
            var metaObj = new JsonObject
            {
                ["description"] = cleanDesc,
                ["boqFileUrl"] = boqFileUrl,
                ["boqFileName"] = boqFileName
            };
            storedDesc = metaObj.ToJsonString();
        }

        var project = new Project
        {
            TenantId = tenantId,
            Name = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Name) ?? string.Empty,
            Description = storedDesc,
            Budget = budget,
            ClientName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(!string.IsNullOrWhiteSpace(dto.ClientName) ? dto.ClientName : client),
            StartDate = dto.StartDate.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(dto.StartDate, DateTimeKind.Utc) : dto.StartDate.ToUniversalTime(),
            EndDate = dto.EndDate.HasValue ? (dto.EndDate.Value.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(dto.EndDate.Value, DateTimeKind.Utc) : dto.EndDate.Value.ToUniversalTime()) : null,
            ManagerId = dto.ManagerId,
            Status = finalStatus,
            IsActive = isActive,
            Governorate = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Governorate),
            CityOrZone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CityOrZone),
            SiteAddress = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.SiteAddress),
            ClientWhatsApp = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.ClientWhatsApp),
            PropertyType = Enum.TryParse<PropertyType>(dto.PropertyType, true, out var pType) ? pType : PropertyType.Residential
        };

        context.Set<Project>().Add(project);

        if (dto.AssignedUserIds != null && dto.AssignedUserIds.Any())
        {
            foreach (var userId in dto.AssignedUserIds.Distinct())
            {
                context.Set<ProjectMember>().Add(new ProjectMember
                {
                    ProjectId = project.Id,
                    UserId = userId,
                    TenantId = tenantId,
                    AssignedAt = DateTime.UtcNow,
                    AssignedByUserId = assignedByUserId
                });
            }
        }

        await context.SaveChangesAsync();

        return (true, MapToDto(project), creationMessage);
    }

    public async Task<(bool Success, ProjectDto? Data, string Message)> UpdateProjectAsync(Guid id, ProjectCreateDto dto, string userRole, Guid? assignedByUserId = null)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return (false, null, "Project not found.");

        if (project.Status == ProjectStatus.PendingActivation && userRole != "SuperAdmin")
        {
            return (false, null, "ACCESS_DENIED: Pending activation projects cannot be modified.");
        }

        Guid tenantId;
        if (userRole != "SuperAdmin")
        {
            var currentTenantId = tenantContextAccessor.GetCurrentTenantId();
            if (currentTenantId == null || project.TenantId != currentTenantId.Value)
            {
                return (false, null, "Unauthorized access to this project.");
            }
            tenantId = currentTenantId.Value;
        }
        else
        {
            tenantId = project.TenantId;
        }

        project.Name = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Name) ?? string.Empty;
        project.StartDate = dto.StartDate.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(dto.StartDate, DateTimeKind.Utc) : dto.StartDate.ToUniversalTime();
        project.EndDate = dto.EndDate.HasValue ? (dto.EndDate.Value.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(dto.EndDate.Value, DateTimeKind.Utc) : dto.EndDate.Value.ToUniversalTime()) : null;
        project.ManagerId = dto.ManagerId;

        // Parse description
        string innerDesc = dto.Description;
        decimal budget = project.Budget;
        string client = project.ClientName ?? string.Empty;
        bool isPublic = project.IsPublicPortfolio;
        string category = project.Category ?? string.Empty;
        string boqFileUrl = string.Empty;
        string boqFileName = string.Empty;

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
                    if (json.TryGetPropertyValue("boqFileUrl", out var boqUrlNode) && boqUrlNode != null) boqFileUrl = boqUrlNode.ToString();
                    if (json.TryGetPropertyValue("boqFileName", out var boqNameNode) && boqNameNode != null) boqFileName = boqNameNode.ToString();
                }
            }
            catch { }
        }

        string cleanDesc = Structo.Core.Helpers.HtmlSanitizer.Sanitize(innerDesc) ?? string.Empty;
        string finalDesc = cleanDesc;

        if (!string.IsNullOrEmpty(boqFileUrl))
        {
            var metaObj = new JsonObject
            {
                ["description"] = cleanDesc,
                ["boqFileUrl"] = boqFileUrl,
                ["boqFileName"] = boqFileName
            };
            finalDesc = metaObj.ToJsonString();
        }
        else if (!string.IsNullOrEmpty(project.Description) && project.Description.StartsWith('{'))
        {
            try
            {
                var existingJson = JsonSerializer.Deserialize<JsonObject>(project.Description);
                if (existingJson != null && existingJson.TryGetPropertyValue("boqFileUrl", out var exBoq) && exBoq != null && !string.IsNullOrEmpty(exBoq.ToString()))
                {
                    var metaObj = new JsonObject
                    {
                        ["description"] = cleanDesc,
                        ["boqFileUrl"] = exBoq.ToString(),
                        ["boqFileName"] = existingJson.TryGetPropertyValue("boqFileName", out var exName) && exName != null ? exName.ToString() : string.Empty
                    };
                    finalDesc = metaObj.ToJsonString();
                }
            }
            catch { }
        }

        project.Description = finalDesc;
        project.Budget = budget;
        project.ClientName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(!string.IsNullOrWhiteSpace(dto.ClientName) ? dto.ClientName : client);
        project.IsPublicPortfolio = isPublic;
        project.Category = Structo.Core.Helpers.HtmlSanitizer.Sanitize(category);
        project.Governorate = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Governorate);
        project.CityOrZone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.CityOrZone);
        project.SiteAddress = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.SiteAddress);
        project.ClientWhatsApp = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.ClientWhatsApp);
        project.PropertyType = Enum.TryParse<PropertyType>(dto.PropertyType, true, out var pType) ? pType : PropertyType.Residential;

        // Synchronize assigned members if explicitly provided
        if (dto.AssignedUserIds != null)
        {
            // Block member modifications if project is not active
            if (project.Status != ProjectStatus.Active)
            {
                return (false, null, "لا يمكن تعديل فريق العمل — المشروع مجمّد أو مغلق / Cannot modify team members — project is frozen or closed.");
            }

            var validUsers = await context.Set<User>()
                .Where(u => dto.AssignedUserIds.Contains(u.Id) && u.TenantId == tenantId && u.Role != UserRole.TenantOwner && u.Role != UserRole.SuperAdmin)
                .Select(u => u.Id)
                .ToListAsync();

            var currentMembers = await context.Set<ProjectMember>()
                .Where(pm => pm.ProjectId == id)
                .ToListAsync();

            var currentMemberIds = currentMembers.Select(m => m.UserId).ToHashSet();
            var targetMemberIds = validUsers.ToHashSet();

            var toRemove = currentMembers.Where(m => !targetMemberIds.Contains(m.UserId)).ToList();
            var toAddIds = targetMemberIds.Where(uid => !currentMemberIds.Contains(uid)).ToList();

            if (toRemove.Any())
            {
                context.Set<ProjectMember>().RemoveRange(toRemove);
            }

            foreach (var newUid in toAddIds)
            {
                context.Set<ProjectMember>().Add(new ProjectMember
                {
                    ProjectId = id,
                    UserId = newUid,
                    TenantId = tenantId,
                    AssignedAt = DateTime.UtcNow,
                    AssignedByUserId = assignedByUserId
                });
            }
        }

        await context.SaveChangesAsync();

        return (true, MapToDto(project), "Project updated successfully");
    }

    public async Task<List<ProjectMemberDto>> GetProjectMembersAsync(Guid projectId)
    {
        var members = await context.Set<ProjectMember>()
            .AsNoTracking()
            .Include(pm => pm.User)
            .Where(pm => pm.ProjectId == projectId)
            .OrderBy(pm => pm.AssignedAt)
            .ToListAsync();

        return members.Select(pm => new ProjectMemberDto
        {
            ProjectId = pm.ProjectId,
            UserId = pm.UserId,
            FullName = pm.User != null ? $"{pm.User.FirstName} {pm.User.LastName}".Trim() : string.Empty,
            Email = pm.User?.Email ?? string.Empty,
            Role = pm.User?.Role.ToString() ?? string.Empty,
            PhoneNumber = pm.User?.PersonalPhone ?? pm.User?.WhatsAppPhone,
            AssignedAt = pm.AssignedAt != default ? pm.AssignedAt : DateTime.UtcNow,
            AssignedByUserId = pm.AssignedByUserId
        }).ToList();
    }

    public async Task<(bool Success, string Message, List<ProjectMemberDto>? AddedMembers)> AddProjectMembersAsync(Guid projectId, List<Guid> userIds, Guid assignedByUserId, Guid tenantId)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return (false, "Project not found.", null);

        // Guard: Block if project is not Active (FinancialFreeze or Closed)
        if (project.Status != ProjectStatus.Active)
        {
            return (false, "لا يمكن تعديل فريق العمل — المشروع مجمّد أو مغلق / Cannot modify team members — project is frozen or closed.", null);
        }

        if (userIds == null || !userIds.Any())
        {
            return (false, "No users selected for assignment.", null);
        }

        var distinctUserIds = userIds.Distinct().ToList();
        var users = await context.Set<User>()
            .IgnoreQueryFilters()
            .Where(u => distinctUserIds.Contains(u.Id) && u.TenantId == tenantId)
            .ToListAsync();

        if (users.Count != distinctUserIds.Count)
        {
            return (false, "One or more selected users were not found in this company.", null);
        }

        if (users.Any(u => u.Role == UserRole.TenantOwner || u.Role == UserRole.SuperAdmin))
        {
            return (false, "TenantOwner or SuperAdmin users cannot be explicitly assigned to projects.", null);
        }

        var existingMemberUserIds = await context.Set<ProjectMember>()
            .Where(pm => pm.ProjectId == projectId)
            .Select(pm => pm.UserId)
            .ToListAsync();

        var duplicateUserIds = distinctUserIds.Where(uid => existingMemberUserIds.Contains(uid)).ToList();
        if (distinctUserIds.Count == 1 && duplicateUserIds.Any())
        {
            return (false, "DUPLICATE_MEMBER: This user is already assigned to this project.", null);
        }

        var usersToInsert = distinctUserIds.Where(uid => !existingMemberUserIds.Contains(uid)).ToList();
        if (!usersToInsert.Any())
        {
            return (false, "All selected users are already assigned to this project.", null);
        }

        var addedEntities = new List<ProjectMember>();
        foreach (var uid in usersToInsert)
        {
            var pm = new ProjectMember
            {
                ProjectId = projectId,
                UserId = uid,
                TenantId = tenantId,
                AssignedAt = DateTime.UtcNow,
                AssignedByUserId = assignedByUserId
            };
            context.Set<ProjectMember>().Add(pm);
            addedEntities.Add(pm);
        }

        await context.SaveChangesAsync();

        var addedDtos = users
            .Where(u => usersToInsert.Contains(u.Id))
            .Select(u => new ProjectMemberDto
            {
                ProjectId = projectId,
                UserId = u.Id,
                FullName = $"{u.FirstName} {u.LastName}".Trim(),
                Email = u.Email,
                Role = u.Role.ToString(),
                PhoneNumber = u.PersonalPhone ?? u.WhatsAppPhone,
                AssignedAt = DateTime.UtcNow,
                AssignedByUserId = assignedByUserId
            }).ToList();

        return (true, "Members assigned successfully.", addedDtos);
    }

    public async Task<(bool Success, string Message)> RemoveProjectMemberAsync(Guid projectId, Guid userId, Guid tenantId)
    {
        var project = await context.Set<Project>().FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);
        if (project == null)
            return (false, "Project not found.");

        // Guard: Block if project is not Active
        if (project.Status != ProjectStatus.Active)
        {
            return (false, "لا يمكن تعديل فريق العمل — المشروع مجمّد أو مغلق / Cannot modify team members — project is frozen or closed.");
        }

        var member = await context.Set<ProjectMember>()
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId && pm.TenantId == tenantId);

        if (member == null)
        {
            return (false, "User is not a member of this project.");
        }

        context.Set<ProjectMember>().Remove(member);
        await context.SaveChangesAsync();

        return (true, "Member removed from project successfully.");
    }


    public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
    {
        var project = await context.Set<Project>().AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return null;
        return MapToDto(project);
    }

    public async Task<ProjectClientViewDto?> GetProjectClientViewAsync(Guid id)
    {
        var project = await context.Set<Project>()
            .AsNoTracking()
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
                .Where(sp => sp.Category == "SiteProgress" &&
                    !string.IsNullOrEmpty(sp.PhotoUrl) && 
                    !sp.PhotoUrl.Contains("/receipts/") && 
                    !sp.PhotoUrl.ToLower().Contains("receipt") &&
                    !sp.PhotoUrl.ToLower().Contains("invoice"))
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

        if (dto.NewBudget < 0)
            return (false, "Budget cannot be negative.");

        var totalSpentToDate = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == id && t.Type == TransactionType.Expense)
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        if (dto.NewBudget < totalSpentToDate)
        {
            return (false, $"Cannot revise budget to {dto.NewBudget:N2} as it is lower than current total expenses ({totalSpentToDate:N2}).");
        }

        decimal oldBudget = project.Budget;
        project.Budget = dto.NewBudget;

        var log = new ProjectBudgetLog
        {
            ProjectId = id,
            OldBudget = oldBudget,
            NewBudget = dto.NewBudget,
            ReasonForChange = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.ReasonForChange),
            BoqFileUrl = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.BoqFileUrl)
        };

        context.Set<ProjectBudgetLog>().Add(log);
        await context.SaveChangesAsync();

        return (true, "Project budget revised and logged successfully.");
    }

    public async Task<List<ProjectBudgetLog>> GetBudgetHistoryAsync(Guid id)
    {
        return await context.Set<ProjectBudgetLog>()
            .AsNoTracking()
            .Where(l => l.ProjectId == id)
            .OrderByDescending(l => l.ChangedAt)
            .ToListAsync();
    }

    // =====================================================================
    // CLOSEOUT WORKFLOW
    // =====================================================================

    public async Task<ProjectReconciliationReportDto?> GetReconciliationReportAsync(Guid id, Guid tenantId)
    {
        var project = await context.Set<Project>()
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId);
        if (project == null) return null;

        // Load all PettyCash for this project (not rejected)
        var pettyCashes = await context.Set<PettyCash>()
            .AsNoTracking()
            .Include(pc => pc.IssuedToUser)
            .Where(pc => pc.ProjectId == id && pc.Status != "Rejected")
            .ToListAsync();

        // Load all FinancialTransactions for this project
        var transactions = await context.Set<FinancialTransaction>()
            .AsNoTracking()
            .Where(t => t.ProjectId == id)
            .ToListAsync();

        var incomeTypes = new[] { TransactionType.Income };
        var expenseTypes = new[] { TransactionType.Expense, TransactionType.DirectProjectExpense };

        var totalIncome = transactions.Where(t => incomeTypes.Contains(t.Type)).Sum(t => t.Amount);
        var totalExpenses = transactions.Where(t => expenseTypes.Contains(t.Type)).Sum(t => t.Amount);

        var validStatuses = new[] { "Issued", "Settled", "ApprovedPendingRefund", "SettlePending" };

        var totalCustodyIssued = pettyCashes
            .Where(pc => validStatuses.Contains(pc.Status))
            .Sum(pc => pc.Amount);

        var totalCustodySettled = pettyCashes
            .Where(pc => pc.IsSettled && !pc.IsReimbursement)
            .Sum(pc => pc.SpentAmount);

        var totalCustodyReturned = pettyCashes
            .Where(pc => pc.IsSettled && !pc.IsReimbursement)
            .Sum(pc => pc.ReturnAmount);

        var unsettledCustody = pettyCashes
            .Where(pc => !pc.IsSettled && pc.Status != "Rejected")
            .ToList();

        // TotalCustodyPending = sum of amounts for non-settled, non-reimbursement custodies only
        var totalCustodyPending = pettyCashes
            .Where(pc => !pc.IsSettled && pc.Status != "Rejected" && !pc.IsReimbursement)
            .Sum(pc => pc.Amount);

        // Build per-employee balance ledger
        var employeeGroups = pettyCashes
            .GroupBy(pc => pc.IssuedToUserId)
            .Select(g =>
            {
                var first = g.First();
                var name = first.IssuedToUser != null
                    ? $"{first.IssuedToUser.FirstName} {first.IssuedToUser.LastName}"
                    : g.Key.ToString();

                var issued = g
                    .Where(pc => validStatuses.Contains(pc.Status))
                    .Sum(pc => pc.Amount);

                var settled = g
                    .Where(pc => pc.IsSettled && !pc.IsReimbursement)
                    .Sum(pc => pc.SpentAmount); // actual spent

                var returnAmount = g
                    .Where(pc => pc.IsSettled && !pc.IsReimbursement)
                    .Sum(pc => pc.ReturnAmount);

                var unsettledCount = g.Count(pc => !pc.IsSettled && pc.Status != "Rejected");
                var balance = Math.Round(issued - settled - returnAmount, 2);

                return new EmployeeBalanceDto
                {
                    UserId = g.Key,
                    FullName = name,
                    TotalIssued = issued,
                    TotalSettled = settled,
                    TotalReturnAmount = returnAmount,
                    Balance = balance,
                    UnsettledCount = unsettledCount
                };
            })
            .ToList();

        // Load cash pools to calculate remaining available cash pool balance
        var cashPools = await context.Set<ProjectCashPool>()
            .AsNoTracking()
            .Where(p => p.ProjectId == id)
            .ToListAsync();
        var remainingPoolBalance = cashPools.Sum(p => p.AvailableBalance);

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
            TotalCustodyPending = totalCustodyPending,
            TotalCustodyReturned = totalCustodyReturned,
            UnsettledCustodyCount = unsettledCustody.Count,
            RemainingPoolBalance = remainingPoolBalance,
            EmployeeBalances = employeeGroups,
            IsFullyReconciled = isFullyReconciled,
            GeneratedAt = DateTime.UtcNow
        };
    }

    public async Task<(bool Success, string Message)> FreezeProjectAsync(Guid id, Guid tenantId, string userRole, Guid? changedByUserId = null)
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

        // Trigger Informational Notification to all assigned project members + TenantOwner — best-effort
        try
        {
            await notificationEngine.RaiseProjectStatusChangedNotificationAsync(
                id,
                tenantId,
                ProjectStatus.FinancialFreeze,
                changedByUserId ?? Guid.Empty);
        }
        catch (Exception) { /* Notification failure must not block project freeze */ }

        return (true, $"Project frozen successfully. Public review token: {project.PublicReviewToken}");
    }

    public async Task<(bool Success, string Message)> FinalCloseoutAsync(Guid id, Guid tenantId, string userRole, Guid? changedByUserId = null, FinalCloseoutRequestDto? dto = null)
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
            return (false, $"RECONCILIATION_REQUIRED: لا يمكن إغلاق المشروع بشكل نهائي مع وجود عهد أو أرصدة معلقة. {detail}".Trim());
        }

        // Check the remaining balance in ProjectCashPool
        var cashPools = await context.Set<ProjectCashPool>()
            .Where(p => p.ProjectId == id && p.TenantId == tenantId)
            .ToListAsync();

        var remainingBalance = cashPools.Sum(p => p.AvailableBalance);

        if (remainingBalance > 0)
        {
            if (!dto?.Disposition.HasValue ?? true)
            {
                return (false, $"POOL_BALANCE_REMAINING: يوجد رصيد متبقي في سيولة المشروع بمبلغ {remainingBalance:N2} ج.م. يرجى تحديد وجهة تصفية الرصيد المتبقي (رد باقي الدفعة للعميل أو تحويل لأرباح الشركة).");
            }

            if (dto!.Disposition == CloseoutDisposition.RefundToClient)
            {
                foreach (var pool in cashPools.Where(p => p.AvailableBalance > 0))
                {
                    var refundTx = new FinancialTransaction
                    {
                        ProjectId = id,
                        TenantId = tenantId,
                        Type = TransactionType.Expense,
                        Amount = pool.AvailableBalance,
                        Description = "مصروف - رد باقي الدفعة للعميل",
                        PaymentMethod = PaymentMethod.BankTransfer,
                        SourceType = pool.SourceType,
                        TransactionDate = DateTime.UtcNow,
                        PaymentDate = DateTime.UtcNow,
                        IsSystemGenerated = true
                    };
                    context.Set<FinancialTransaction>().Add(refundTx);
                    pool.AvailableBalance = 0;
                }
            }
            else if (dto.Disposition == CloseoutDisposition.TransferToCompanyProfits)
            {
                foreach (var pool in cashPools.Where(p => p.AvailableBalance > 0))
                {
                    var profitTx = new FinancialTransaction
                    {
                        ProjectId = id,
                        TenantId = tenantId,
                        Type = TransactionType.RefundToTreasury,
                        Amount = pool.AvailableBalance,
                        Description = "تحويل المتبقي من سيولة المشروع إلى خزينة الشركة كأرباح مرحلة",
                        PaymentMethod = PaymentMethod.BankTransfer,
                        SourceType = pool.SourceType,
                        TransactionDate = DateTime.UtcNow,
                        PaymentDate = DateTime.UtcNow,
                        IsSystemGenerated = true
                    };
                    context.Set<FinancialTransaction>().Add(profitTx);
                    pool.AvailableBalance = 0;
                }
            }
        }

        project.Status = ProjectStatus.Closed;
        project.IsActive = false;

        await context.SaveChangesAsync();

        // Trigger Informational Notification to all assigned project members + TenantOwner — best-effort
        try
        {
            await notificationEngine.RaiseProjectStatusChangedNotificationAsync(
                id,
                tenantId,
                ProjectStatus.Closed,
                changedByUserId ?? Guid.Empty);
        }
        catch (Exception) { /* Notification failure must not block project closeout */ }

        return (true, "تم إغلاق المشروع نهائياً وتجميد جميع العمليات المالية وتصفية الصناديق بنجاح. سجل التدقيق محفوظ بشكل دائم.");
    }

    public async Task<(bool Success, string Message)> CloseProjectAsync(Guid id, Guid tenantId, string userRole, Guid? changedByUserId = null, FinalCloseoutRequestDto? dto = null)
    {
        return await FinalCloseoutAsync(id, tenantId, userRole, changedByUserId, dto);
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
        if (!string.IsNullOrWhiteSpace(dto.Notes)) project.ClientReviewNotes = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.Notes);

        await context.SaveChangesAsync();

        // Recalculate average rating for the tenant
        var ratings = await context.Set<Project>()
            .IgnoreQueryFilters()
            .Where(p => p.TenantId == project.TenantId && p.ClientRating.HasValue)
            .Select(p => p.ClientRating!.Value)
            .ToListAsync();

        double averageRating = ratings.Any() ? ratings.Average() : 0.0;

        var tenant = await context.Set<Tenant>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == project.TenantId);
        if (tenant != null)
        {
            tenant.Rating = averageRating;
            await context.SaveChangesAsync();
        }

        return (true, "شكراً لك! تم تسجيل تقييمك بنجاح.");
    }
}
