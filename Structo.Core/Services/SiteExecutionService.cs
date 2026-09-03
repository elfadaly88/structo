using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.SiteOperations;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class SiteExecutionService(
    DbContext context,
    IProjectAccessService projectAccessService) : ISiteExecutionService
{
    private static DateTime? AsUtc(DateTime? dt)
    {
        if (!dt.HasValue || dt.Value.Year <= 1) return null;
        return dt.Value.Kind == DateTimeKind.Utc ? dt.Value : DateTime.SpecifyKind(dt.Value, DateTimeKind.Utc);
    }

    private static DateTime? AsUtc(DateTime dt)
    {
        if (dt.Year <= 1) return null;
        return dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);
    }

    private static string GenerateShareToken()
    {
        return Convert.ToHexString(RandomNumberGenerator.GetBytes(16)).ToLowerInvariant();
    }

    public async Task<List<AssignedEngineerDto>> GetAssignedEngineersAsync(Guid projectId, Guid tenantId)
    {
        var engineers = await context.Set<ProjectMember>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Include(pm => pm.User)
            .Where(pm => pm.ProjectId == projectId && pm.TenantId == tenantId && pm.User != null && pm.User.IsActive)
            .Select(pm => new AssignedEngineerDto
            {
                Id = pm.UserId,
                FirstName = pm.User!.FirstName,
                LastName = pm.User.LastName,
                Email = pm.User.Email,
                Role = pm.User.Role.ToString(),
                IsOwner = pm.User.Role == UserRole.TenantOwner
            })
            .OrderBy(e => e.FirstName)
            .ThenBy(e => e.LastName)
            .ToListAsync();

        // 🚀 Owner-Operated Support: Always include TenantOwner(s) of this tenant as selectable execution leaders
        var owners = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.TenantId == tenantId && u.Role == UserRole.TenantOwner && u.IsActive)
            .Select(u => new AssignedEngineerDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Role = "TenantOwner",
                IsOwner = true
            })
            .ToListAsync();

        foreach (var owner in owners)
        {
            if (!engineers.Any(e => e.Id == owner.Id))
            {
                engineers.Insert(0, owner);
            }
        }

        return engineers;
    }

    public async Task<ProjectSiteTasksResponseDto> GetProjectSiteTasksAsync(Guid projectId, Guid tenantId)
    {
        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == projectId && p.TenantId == tenantId);

        if (project == null)
        {
            throw new KeyNotFoundException("المشروع غير موجود أو لا تملك صلاحية الوصول إليه.");
        }

        // Ensure Project has a PublicShareToken
        if (string.IsNullOrWhiteSpace(project.PublicShareToken))
        {
            project.PublicShareToken = GenerateShareToken();
            await context.SaveChangesAsync();
        }

        var tasks = await context.Set<SiteTask>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(t => t.ProjectId == projectId && t.TenantId == tenantId)
            .OrderBy(t => t.PlannedStartDate)
            .ThenBy(t => t.Title)
            .Select(t => new
            {
                Task = t,
                AssignedUser = context.Set<User>()
                    .IgnoreQueryFilters()
                    .Where(u => u.Id == t.AssignedEngineerId)
                    .Select(u => new { u.FirstName, u.LastName })
                    .FirstOrDefault(),
                Items = context.Set<SiteTaskSettlementItem>()
                    .IgnoreQueryFilters()
                    .Where(si => si.SiteTaskId == t.Id)
                    .Select(si => new LinkedSettlementItemDto
                    {
                        Id = si.Id,
                        SettlementItemId = si.SettlementItemId,
                        ExpenseDescription = si.ExpenseDescription,
                        AllocatedAmount = si.AllocatedAmount,
                        OriginalLineAmount = context.Set<SettlementLine>()
                            .IgnoreQueryFilters()
                            .Where(sl => sl.Id == si.SettlementItemId)
                            .Select(sl => sl.Amount)
                            .FirstOrDefault(),
                        Category = context.Set<SettlementLine>()
                            .IgnoreQueryFilters()
                            .Where(sl => sl.Id == si.SettlementItemId)
                            .Select(sl => sl.Category)
                            .FirstOrDefault(),
                        InvoiceUrl = context.Set<SettlementLine>()
                            .IgnoreQueryFilters()
                            .Where(sl => sl.Id == si.SettlementItemId)
                            .Select(sl => sl.InvoiceUrl)
                            .FirstOrDefault()
                    })
                    .ToList()
            })
            .ToListAsync();

        var taskDtos = tasks.Select(t => new SiteTaskDto
        {
            Id = t.Task.Id,
            ProjectId = t.Task.ProjectId,
            ProjectName = project.Name,
            AssignedEngineerId = t.Task.AssignedEngineerId,
            AssignedEngineerName = t.AssignedUser != null ? $"{t.AssignedUser.FirstName} {t.AssignedUser.LastName}".Trim() : "غير محدد",
            Title = t.Task.Title,
            Description = t.Task.Description,
            Weight = t.Task.Weight,
            ProgressPercentage = t.Task.ProgressPercentage,
            Status = t.Task.Status.ToString(),
            PlannedStartDate = AsUtc(t.Task.PlannedStartDate),
            PlannedEndDate = AsUtc(t.Task.PlannedEndDate),
            CompletedAt = AsUtc(t.Task.CompletedAt),
            EngineerNotes = t.Task.EngineerNotes,
            AttachmentUrls = t.Task.AttachmentUrls,
            TotalAllocatedExpenses = t.Items.Sum(i => i.AllocatedAmount),
            LinkedSettlementItems = t.Items
        }).ToList();

        decimal totalWeight = taskDtos.Sum(t => t.Weight);
        int weightedOverallProgress = 0;
        if (totalWeight > 0)
        {
            decimal sumWeightedProgress = taskDtos.Sum(t => t.Weight * t.ProgressPercentage);
            weightedOverallProgress = (int)Math.Round(sumWeightedProgress / totalWeight, MidpointRounding.AwayFromZero);
        }

        return new ProjectSiteTasksResponseDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            PublicShareToken = project.PublicShareToken,
            WeightedOverallProgress = Math.Clamp(weightedOverallProgress, 0, 100),
            TotalWeight = totalWeight,
            Tasks = taskDtos
        };
    }

    public async Task<List<AvailableSettlementLineDto>> GetAvailableSettlementLinesAsync(Guid projectId, Guid tenantId)
    {
        // Query approved settlements for this project
        var approvedSettlementIds = await context.Set<Settlement>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(s => s.ProjectId == projectId && s.TenantId == tenantId &&
                        (s.Status == SettlementStatus.Approved || s.Status == SettlementStatus.Refunded))
            .Select(s => new { s.Id, s.SubmittedAt })
            .ToListAsync();

        if (approvedSettlementIds.Count == 0)
            return [];

        var ids = approvedSettlementIds.Select(s => s.Id).ToList();
        var dateMap = approvedSettlementIds.ToDictionary(s => s.Id, s => s.SubmittedAt);

        var lines = await context.Set<SettlementLine>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(l => ids.Contains(l.SettlementId) && l.TenantId == tenantId)
            .ToListAsync();

        if (lines.Count == 0)
            return [];

        var lineIds = lines.Select(l => l.Id).ToList();
        var allocations = await context.Set<SiteTaskSettlementItem>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(si => lineIds.Contains(si.SettlementItemId) && si.TenantId == tenantId)
            .GroupBy(si => si.SettlementItemId)
            .Select(g => new { LineId = g.Key, Allocated = g.Sum(x => x.AllocatedAmount) })
            .ToDictionaryAsync(g => g.LineId, g => g.Allocated);

        return lines.Select(l =>
        {
            decimal allocated = allocations.TryGetValue(l.Id, out var val) ? val : 0m;
            return new AvailableSettlementLineDto
            {
                Id = l.Id,
                SettlementId = l.SettlementId,
                Category = l.Category,
                TotalAmount = l.Amount,
                TotalAllocatedAmount = allocated,
                Description = l.Description,
                InvoiceUrl = l.InvoiceUrl,
                SubmittedAt = dateMap.TryGetValue(l.SettlementId, out var d) ? d : DateTime.UtcNow
            };
        }).OrderByDescending(l => l.SubmittedAt).ToList();
    }

    public async Task<(bool Success, string Message, SiteTaskDto? Task)> CreateSiteTaskAsync(
        SiteTaskCreateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return (false, "عنوان البند التنفيذي مطلوب.", null);

        if (dto.Weight <= 0)
            return (false, "الوزن النسبي للبند يجب أن يكون أكبر من الصفر.", null);

        // 1. Tenant Context Check for Project
        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.TenantId == tenantId);

        if (project == null)
            return (false, "المشروع غير موجود ضمن نطاق مؤسستك.", null);

        // 2. Strict Project Assignment Wall (Allowed if assigned to project OR if user is TenantOwner of this tenant)
        var engineer = await context.Set<User>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u => u.Id == dto.AssignedEngineerId && u.TenantId == tenantId && u.IsActive);

        if (engineer == null)
            return (false, "المهندس أو المسؤول المختار غير موجود أو غير نشط.", null);

        var isOwner = engineer.Role == UserRole.TenantOwner;
        var isAssigned = isOwner || await projectAccessService.IsUserAssignedToProjectAsync(dto.AssignedEngineerId, dto.ProjectId);
        if (!isAssigned)
        {
            return (false, "لا يمكن إسناد المهمة لمهندس غير مسند رسمياً لهذا المشروع.", null);
        }

        var task = new SiteTask
        {
            TenantId = tenantId,
            ProjectId = dto.ProjectId,
            AssignedEngineerId = dto.AssignedEngineerId,
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            Weight = dto.Weight,
            ProgressPercentage = 0,
            Status = SiteTaskStatus.Pending,
            PlannedStartDate = AsUtc(dto.PlannedStartDate),
            PlannedEndDate = AsUtc(dto.PlannedEndDate)
        };

        context.Set<SiteTask>().Add(task);
        await context.SaveChangesAsync();

        var resultDto = new SiteTaskDto
        {
            Id = task.Id,
            ProjectId = task.ProjectId,
            ProjectName = project.Name,
            AssignedEngineerId = task.AssignedEngineerId,
            AssignedEngineerName = $"{engineer.FirstName} {engineer.LastName}".Trim(),
            Title = task.Title,
            Description = task.Description,
            Weight = task.Weight,
            ProgressPercentage = task.ProgressPercentage,
            Status = task.Status.ToString(),
            PlannedStartDate = AsUtc(task.PlannedStartDate),
            PlannedEndDate = AsUtc(task.PlannedEndDate),
            CompletedAt = AsUtc(task.CompletedAt),
            EngineerNotes = task.EngineerNotes,
            AttachmentUrls = task.AttachmentUrls,
            TotalAllocatedExpenses = 0,
            LinkedSettlementItems = []
        };

        return (true, "تم إنشاء البند التنفيذي بنجاح.", resultDto);
    }

    public async Task<(bool Success, string Message)> UpdateTaskProgressAsync(
        Guid taskId, 
        SiteTaskProgressUpdateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        var task = await context.Set<SiteTask>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == taskId && t.TenantId == tenantId);

        if (task == null)
            return (false, "البند التنفيذي غير موجود.");

        int clampedProgress = Math.Clamp(dto.ProgressPercentage, 0, 100);
        task.ProgressPercentage = clampedProgress;

        if (dto.Status.HasValue)
        {
            task.Status = dto.Status.Value;
        }
        else
        {
            if (clampedProgress == 100)
            {
                task.Status = SiteTaskStatus.Completed;
                task.CompletedAt ??= DateTime.UtcNow;
            }
            else if (clampedProgress > 0)
            {
                task.Status = SiteTaskStatus.InProgress;
                task.CompletedAt = null;
            }
            else
            {
                task.Status = SiteTaskStatus.Pending;
                task.CompletedAt = null;
            }
        }

        if (dto.CompletedAt.HasValue)
        {
            task.CompletedAt = dto.CompletedAt.Value;
        }

        if (dto.EngineerNotes != null)
        {
            task.EngineerNotes = dto.EngineerNotes.Trim();
        }

        if (dto.AttachmentUrls != null)
        {
            task.AttachmentUrls = dto.AttachmentUrls;
        }

        await context.SaveChangesAsync();
        return (true, "تم تحديث نسبة الإنجاز وحالة البند بنجاح.");
    }

    public async Task<(bool Success, string Message)> LinkSettlementItemsAsync(
        Guid taskId, 
        LinkSettlementItemsDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        var task = await context.Set<SiteTask>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == taskId && t.TenantId == tenantId);

        if (task == null)
            return (false, "البند التنفيذي غير موجود.");

        // Validate Over-Allocation Guard for each item
        foreach (var item in dto.Items)
        {
            if (item.AllocatedAmount <= 0)
                return (false, "يجب أن يكون المبلغ المخصص أكبر من الصفر.");

            var line = await context.Set<SettlementLine>()
                .IgnoreQueryFilters()
                .Include(l => l.Settlement)
                .FirstOrDefaultAsync(l => l.Id == item.SettlementItemId && l.TenantId == tenantId);

            if (line == null || line.Settlement == null || line.Settlement.ProjectId != task.ProjectId)
            {
                return (false, "بند التسوية غير موجود أو لا ينتمي لهذا المشروع.");
            }

            // Sum allocations on this line across all tasks EXCEPT current task
            var otherAllocated = await context.Set<SiteTaskSettlementItem>()
                .IgnoreQueryFilters()
                .Where(si => si.SettlementItemId == item.SettlementItemId && si.SiteTaskId != taskId)
                .SumAsync(si => si.AllocatedAmount);

            if (otherAllocated + item.AllocatedAmount > line.Amount)
            {
                decimal remaining = Math.Max(0, line.Amount - otherAllocated);
                return (false, $"المبلغ المخصص ({item.AllocatedAmount:N2} ج.م) يتجاوز الحد الأقصى المتبقي لبند التسوية '{line.Description}' (المتبقي: {remaining:N2} ج.م).");
            }
        }

        // Remove existing allocations for this task and replace with new ones
        var existingAllocations = await context.Set<SiteTaskSettlementItem>()
            .IgnoreQueryFilters()
            .Where(si => si.SiteTaskId == taskId && si.TenantId == tenantId)
            .ToListAsync();

        context.Set<SiteTaskSettlementItem>().RemoveRange(existingAllocations);

        foreach (var item in dto.Items)
        {
            context.Set<SiteTaskSettlementItem>().Add(new SiteTaskSettlementItem
            {
                TenantId = tenantId,
                SiteTaskId = taskId,
                SettlementItemId = item.SettlementItemId,
                AllocatedAmount = item.AllocatedAmount,
                ExpenseDescription = item.ExpenseDescription?.Trim()
            });
        }

        await context.SaveChangesAsync();
        return (true, "تم ربط بنود التسويات بالبند التنفيذي بنجاح.");
    }

    public async Task<PublicProjectTrackerDto?> GetPublicProjectTrackerAsync(string shareToken)
    {
        if (string.IsNullOrWhiteSpace(shareToken))
            return null;

        var normalizedToken = shareToken.Trim().ToLowerInvariant();

        // 1. [AllowAnonymous] Safety: Query project with IgnoreQueryFilters using shareToken
        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.PublicShareToken != null && p.PublicShareToken.ToLower() == normalizedToken);

        if (project == null || !project.IsActive)
            return null;

        // 2. Query Tasks strictly with .IgnoreQueryFilters() and .AsNoTracking()
        var tasks = await context.Set<SiteTask>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(t => t.ProjectId == project.Id)
            .OrderBy(t => t.PlannedStartDate)
            .ThenBy(t => t.Title)
            .Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                t.Weight,
                t.ProgressPercentage,
                Status = t.Status.ToString(),
                t.PlannedStartDate,
                t.PlannedEndDate,
                t.CompletedAt,
                t.AttachmentUrls
            })
            .ToListAsync();

        // 3. Compute weighted overall progress
        decimal totalWeight = tasks.Sum(t => t.Weight);
        int weightedOverallProgress = 0;
        if (totalWeight > 0)
        {
            decimal sumWeightedProgress = tasks.Sum(t => t.Weight * t.ProgressPercentage);
            weightedOverallProgress = (int)Math.Round(sumWeightedProgress / totalWeight, MidpointRounding.AwayFromZero);
        }

        // 4. Query Site Photos for public showcase
        var photos = await context.Set<SitePhoto>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(sp => sp.ProjectId == project.Id)
            .OrderByDescending(sp => sp.UploadedAt)
            .Take(12)
            .Select(sp => new PublicSitePhotoDto
            {
                Id = sp.Id,
                PhotoUrl = sp.PhotoUrl,
                Caption = sp.Caption,
                UploadedAt = sp.UploadedAt
            })
            .ToListAsync();

        var completionDate = (project.Status == ProjectStatus.Closed || project.EndDate.HasValue) && project.EndDate.HasValue && project.EndDate.Value.Year > 1
            ? AsUtc(project.EndDate)
            : null;
        var createdAt = project.CreatedAt.Year > 1 ? AsUtc(project.CreatedAt) : null;
        var displayDate = completionDate ?? createdAt;

        // 5. Strictly Return Public DTO (NO financial data, NO budgets, NO margins)
        return new PublicProjectTrackerDto
        {
            ProjectId = project.Id,
            ProjectName = project.Name,
            Category = project.Category,
            ClientName = project.ClientName,
            Governorate = project.Governorate,
            CityOrZone = project.CityOrZone,
            Status = project.Status.ToString(),
            WeightedOverallProgress = Math.Clamp(weightedOverallProgress, 0, 100),
            StartDate = AsUtc(project.StartDate),
            EndDate = AsUtc(project.EndDate),
            CompletionDate = completionDate,
            CreatedAt = createdAt,
            DisplayDate = displayDate,
            Tasks = tasks.Select(t => new PublicTaskProgressDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                ProgressPercentage = t.ProgressPercentage,
                Status = t.Status,
                PlannedStartDate = AsUtc(t.PlannedStartDate),
                PlannedEndDate = AsUtc(t.PlannedEndDate),
                CompletedAt = AsUtc(t.CompletedAt),
                AttachmentUrls = t.AttachmentUrls
            }).ToList(),
            SitePhotos = photos
        };
    }

    private static (Guid UserId, string Role, bool IsOwner, bool IsManager) GetCallerContext(ClaimsPrincipal user)
    {
        var uidClaim = user.FindFirst("sub")?.Value 
            ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value 
            ?? user.FindFirst("uid")?.Value;
        Guid.TryParse(uidClaim, out var userId);

        var roleClaim = user.FindFirst("role")?.Value 
            ?? user.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        var isOwner = string.Equals(roleClaim, "TenantOwner", StringComparison.OrdinalIgnoreCase);
        var isManager = string.Equals(roleClaim, "Manager", StringComparison.OrdinalIgnoreCase) || isOwner;

        return (userId, roleClaim, isOwner, isManager);
    }

    public async Task<List<SiteDailyLogDto>> GetDailyLogsAsync(Guid projectId, Guid tenantId)
    {
        var logs = await context.Set<SiteDailyLog>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(l => l.ProjectId == projectId && l.TenantId == tenantId)
            .OrderByDescending(l => l.LogDate)
            .ThenByDescending(l => l.CreatedAt)
            .Select(l => new SiteDailyLogDto
            {
                Id = l.Id,
                ProjectId = l.ProjectId,
                LogDate = l.LogDate,
                LoggedByUserId = l.LoggedByUserId,
                LoggedByUserName = context.Set<User>()
                    .IgnoreQueryFilters()
                    .Where(u => u.Id == l.LoggedByUserId)
                    .Select(u => (u.FirstName + " " + u.LastName).Trim())
                    .FirstOrDefault() ?? "غير محدد",
                WeatherCondition = l.WeatherCondition,
                WorkforceCount = l.WorkforceCount,
                WorkforceSummary = l.WorkforceSummary,
                MaterialsDelivered = l.MaterialsDelivered,
                GeneralObservations = l.GeneralObservations,
                CreatedAt = l.CreatedAt
            })
            .ToListAsync();

        return logs;
    }

    public async Task<(bool Success, string Message, SiteDailyLogDto? Log)> UpsertDailyLogAsync(
        SiteDailyLogUpsertDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        var (userId, role, isOwner, _) = GetCallerContext(user);
        if (userId == Guid.Empty)
            return (false, "هوية المستخدم غير صالحة.", null);

        // Project verification
        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.TenantId == tenantId);

        if (project == null)
            return (false, "المشروع غير موجود ضمن نطاق مؤسستك.", null);

        // Security check: Only assigned engineers or TenantOwner
        var isAssigned = isOwner || await projectAccessService.IsUserAssignedToProjectAsync(userId, dto.ProjectId);
        if (!isAssigned)
            return (false, "غير مصرح لك بتسجيل أو تعديل اليوميات الميدانية لهذا المشروع.", null);

        // Normalized date strictly as date without time in UTC
        var normalizedDate = DateTime.SpecifyKind(dto.LogDate.Date, DateTimeKind.Utc);

        var existingLog = await context.Set<SiteDailyLog>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(l => l.ProjectId == dto.ProjectId && l.TenantId == tenantId && l.LogDate == normalizedDate);

        SiteDailyLog logToReturn;

        if (existingLog != null)
        {
            // Upsert: Update existing daily log for the same date
            existingLog.LoggedByUserId = userId;
            existingLog.WeatherCondition = dto.WeatherCondition?.Trim();
            existingLog.WorkforceCount = Math.Max(0, dto.WorkforceCount);
            existingLog.WorkforceSummary = dto.WorkforceSummary?.Trim();
            existingLog.MaterialsDelivered = dto.MaterialsDelivered?.Trim();
            existingLog.GeneralObservations = dto.GeneralObservations?.Trim();
            logToReturn = existingLog;
        }
        else
        {
            // Create new daily log
            var newLog = new SiteDailyLog
            {
                TenantId = tenantId,
                ProjectId = dto.ProjectId,
                LogDate = normalizedDate,
                LoggedByUserId = userId,
                WeatherCondition = dto.WeatherCondition?.Trim(),
                WorkforceCount = Math.Max(0, dto.WorkforceCount),
                WorkforceSummary = dto.WorkforceSummary?.Trim(),
                MaterialsDelivered = dto.MaterialsDelivered?.Trim(),
                GeneralObservations = dto.GeneralObservations?.Trim(),
                CreatedAt = DateTime.UtcNow
            };
            context.Set<SiteDailyLog>().Add(newLog);
            logToReturn = newLog;
        }

        await context.SaveChangesAsync();

        var userName = await context.Set<User>()
            .IgnoreQueryFilters()
            .Where(u => u.Id == userId)
            .Select(u => (u.FirstName + " " + u.LastName).Trim())
            .FirstOrDefaultAsync() ?? "المستخدم الحالي";

        var resultDto = new SiteDailyLogDto
        {
            Id = logToReturn.Id,
            ProjectId = logToReturn.ProjectId,
            LogDate = logToReturn.LogDate,
            LoggedByUserId = logToReturn.LoggedByUserId,
            LoggedByUserName = userName,
            WeatherCondition = logToReturn.WeatherCondition,
            WorkforceCount = logToReturn.WorkforceCount,
            WorkforceSummary = logToReturn.WorkforceSummary,
            MaterialsDelivered = logToReturn.MaterialsDelivered,
            GeneralObservations = logToReturn.GeneralObservations,
            CreatedAt = logToReturn.CreatedAt
        };

        var actionText = existingLog != null ? "تحديث" : "حفظ";
        return (true, $"تم {actionText} التقرير اليومي بنجاح.", resultDto);
    }

    public async Task<List<SitePunchItemDto>> GetPunchListAsync(
        Guid projectId, 
        PunchItemStatus? status, 
        Guid tenantId)
    {
        var query = context.Set<SitePunchItem>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(p => p.ProjectId == projectId && p.TenantId == tenantId);

        if (status.HasValue)
        {
            query = query.Where(p => p.Status == status.Value);
        }

        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new SitePunchItemDto
            {
                Id = p.Id,
                ProjectId = p.ProjectId,
                SiteTaskId = p.SiteTaskId,
                SiteTaskTitle = p.SiteTaskId != null
                    ? context.Set<SiteTask>().IgnoreQueryFilters().Where(t => t.Id == p.SiteTaskId).Select(t => t.Title).FirstOrDefault()
                    : null,
                Title = p.Title,
                Severity = p.Severity.ToString(),
                Status = p.Status.ToString(),
                SubcontractorName = p.SubcontractorName,
                DefectPhotoUrl = p.DefectPhotoUrl,
                ResolutionPhotoUrl = p.ResolutionPhotoUrl,
                EngineerNotes = p.EngineerNotes,
                CreatedByUserId = p.CreatedByUserId,
                CreatedByUserName = context.Set<User>()
                    .IgnoreQueryFilters()
                    .Where(u => u.Id == p.CreatedByUserId)
                    .Select(u => (u.FirstName + " " + u.LastName).Trim())
                    .FirstOrDefault() ?? "غير محدد",
                CreatedAt = p.CreatedAt,
                ResolvedAt = p.ResolvedAt
            })
            .ToListAsync();

        return items;
    }

    public async Task<(bool Success, string Message, SitePunchItemDto? Item)> CreatePunchItemAsync(
        SitePunchItemCreateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        var (userId, _, isOwner, _) = GetCallerContext(user);
        if (userId == Guid.Empty)
            return (false, "هوية المستخدم غير صالحة.", null);

        if (string.IsNullOrWhiteSpace(dto.Title))
            return (false, "عنوان الملاحظة الفنية مطلوب.", null);

        if (string.IsNullOrWhiteSpace(dto.DefectPhotoUrl))
            return (false, "صورة العيب الفني قبل الإصلاح مطلوبة.", null);

        // Project verification
        var project = await context.Set<Project>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.TenantId == tenantId);

        if (project == null)
            return (false, "المشروع غير موجود ضمن نطاق مؤسستك.", null);

        // Security check: Only assigned engineers or TenantOwner
        var isAssigned = isOwner || await projectAccessService.IsUserAssignedToProjectAsync(userId, dto.ProjectId);
        if (!isAssigned)
            return (false, "غير مصرح لك بتسجيل ملاحظات استلام لهذا المشروع.", null);

        string? taskTitle = null;
        if (dto.SiteTaskId.HasValue)
        {
            var task = await context.Set<SiteTask>()
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(t => t.Id == dto.SiteTaskId.Value && t.ProjectId == dto.ProjectId && t.TenantId == tenantId);
            if (task == null)
                return (false, "البند التنفيذي المرتبط غير موجود بهذا المشروع.", null);
            taskTitle = task.Title;
        }

        var punchItem = new SitePunchItem
        {
            TenantId = tenantId,
            ProjectId = dto.ProjectId,
            SiteTaskId = dto.SiteTaskId,
            Title = dto.Title.Trim(),
            Severity = dto.Severity,
            Status = PunchItemStatus.Open,
            SubcontractorName = dto.SubcontractorName?.Trim(),
            DefectPhotoUrl = dto.DefectPhotoUrl.Trim(),
            EngineerNotes = dto.EngineerNotes?.Trim(),
            CreatedByUserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        context.Set<SitePunchItem>().Add(punchItem);
        await context.SaveChangesAsync();

        var userName = await context.Set<User>()
            .IgnoreQueryFilters()
            .Where(u => u.Id == userId)
            .Select(u => (u.FirstName + " " + u.LastName).Trim())
            .FirstOrDefaultAsync() ?? "المهندس المسجل";

        var resultDto = new SitePunchItemDto
        {
            Id = punchItem.Id,
            ProjectId = punchItem.ProjectId,
            SiteTaskId = punchItem.SiteTaskId,
            SiteTaskTitle = taskTitle,
            Title = punchItem.Title,
            Severity = punchItem.Severity.ToString(),
            Status = punchItem.Status.ToString(),
            SubcontractorName = punchItem.SubcontractorName,
            DefectPhotoUrl = punchItem.DefectPhotoUrl,
            ResolutionPhotoUrl = punchItem.ResolutionPhotoUrl,
            EngineerNotes = punchItem.EngineerNotes,
            CreatedByUserId = punchItem.CreatedByUserId,
            CreatedByUserName = userName,
            CreatedAt = punchItem.CreatedAt,
            ResolvedAt = null
        };

        return (true, "تم تسجيل ملاحظة الاستلام الفني بنجاح.", resultDto);
    }

    public async Task<(bool Success, string Message)> UpdatePunchItemStatusAsync(
        Guid punchItemId, 
        SitePunchItemStatusUpdateDto dto, 
        Guid tenantId, 
        ClaimsPrincipal user)
    {
        var (userId, role, isOwner, isManager) = GetCallerContext(user);
        if (userId == Guid.Empty)
            return (false, "هوية المستخدم غير صالحة.");

        var punchItem = await context.Set<SitePunchItem>()
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == punchItemId && p.TenantId == tenantId);

        if (punchItem == null)
            return (false, "ملاحظة الاستلام الفني غير موجودة.");

        var isAssigned = isOwner || await projectAccessService.IsUserAssignedToProjectAsync(userId, punchItem.ProjectId);
        if (!isAssigned)
            return (false, "غير مصرح لك بالوصول لهذا المشروع.");

        // Strict role check:
        // ApprovedAndClosed is strictly restricted to Manager or TenantOwner
        if (dto.Status == PunchItemStatus.ApprovedAndClosed)
        {
            if (!isManager && !isOwner)
            {
                return (false, "اعتماد وإغلاق الملاحظة محصور بمديري المشاريع أو مالك المنشأة حصراً.");
            }
            punchItem.ResolvedAt = DateTime.UtcNow;
        }

        if (dto.Status == PunchItemStatus.FixedPendingReview)
        {
            if (!string.IsNullOrWhiteSpace(dto.ResolutionPhotoUrl))
            {
                punchItem.ResolutionPhotoUrl = dto.ResolutionPhotoUrl.Trim();
            }
        }

        punchItem.Status = dto.Status;

        if (!string.IsNullOrWhiteSpace(dto.ResolutionPhotoUrl))
        {
            punchItem.ResolutionPhotoUrl = dto.ResolutionPhotoUrl.Trim();
        }

        if (!string.IsNullOrWhiteSpace(dto.EngineerNotes))
        {
            punchItem.EngineerNotes = dto.EngineerNotes.Trim();
        }

        await context.SaveChangesAsync();
        return (true, "تم تحديث حالة الملاحظة بنجاح.");
    }
}
