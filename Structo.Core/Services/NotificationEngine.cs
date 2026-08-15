using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;

namespace Structo.Core.Services;

public class NotificationEngine(
    DbContext context,
    INotificationService notificationService,
    INotificationRecipientResolver recipientResolver) : INotificationEngine
{
    public async Task RaisePettyCashRequestedNotificationAsync(
        Guid requesterId,
        decimal amount,
        Guid pettyCashId,
        Guid tenantId,
        Guid projectId,
        bool isAutoApproved = false)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        var projectName = project?.Name ?? "المشروع";

        if (isAutoApproved)
        {
            // Auto-approved path (e.g. submitted by TenantOwner directly from pool)
            // Recipients: Assigned Accountants + ProjectManagers (NOT the TenantOwner themselves)
            var recipients = await recipientResolver.GetFinancialActionRecipientsAsync(projectId, tenantId, excludeUserId: requesterId);

            foreach (var recipientId in recipients)
            {
                await notificationService.SendAsync(new SendNotificationDto
                {
                    TenantId = tenantId,
                    ReceiverId = recipientId,
                    ProjectId = projectId,
                    Title = "صرف عهدة تلقائي 💰",
                    Message = $"تم إصدار عهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}' تلقائياً.",
                    Type = NotificationType.PettyCash,
                    DeepLink = $"/dashboard/projects/{projectId}"
                });
            }
        }
        else
        {
            // Pending request submitted by an Engineer
            // Recipients: Assigned Accountants + Assigned ProjectManagers + TenantOwner
            var requester = await context.Set<User>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(u => u.Id == requesterId);
            var requesterName = requester != null ? $"{requester.FirstName} {requester.LastName}".Trim() : "المهندس";

            var recipients = await recipientResolver.GetFinancialActionRecipientsAsync(projectId, tenantId, excludeUserId: requesterId);

            foreach (var recipientId in recipients)
            {
                await notificationService.SendAsync(new SendNotificationDto
                {
                    TenantId = tenantId,
                    ReceiverId = recipientId,
                    ProjectId = projectId,
                    Title = "طلب صرف عهدة جديد 🔔",
                    Message = $"طلب {requesterName} صرف عهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'.",
                    Type = NotificationType.PettyCash,
                    DeepLink = $"/dashboard/projects/{projectId}"
                });
            }
        }
    }

    public async Task RaisePettyCashResultNotificationAsync(
        Guid requesterId,
        decimal amount,
        Guid pettyCashId,
        Guid tenantId,
        Guid projectId,
        bool isApproved,
        string? comments = null)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        var projectName = project?.Name ?? "المشروع";

        string title;
        string message;

        if (isApproved)
        {
            title = "تمت الموافقة على صرف العهدة 💰";
            message = $"تمت الموافقة على طلب صرف العهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'.";
        }
        else
        {
            title = "تم رفض طلب صرف العهدة ❌";
            message = string.IsNullOrWhiteSpace(comments)
                ? $"تم رفض طلب صرف العهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'."
                : $"تم رفض طلب صرف العهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'. ملاحظات: {comments}";
        }

        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = tenantId,
            ReceiverId = requesterId,
            ProjectId = projectId,
            Title = title,
            Message = message,
            Type = NotificationType.PettyCash,
            DeepLink = $"/dashboard/projects/{projectId}"
        });
    }

    public async Task RaiseSettlementSubmittedNotificationAsync(
        Guid submitterId,
        decimal amount,
        Guid settlementId,
        Guid tenantId,
        Guid projectId,
        bool isAutoApproved = false)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        var projectName = project?.Name ?? "المشروع";

        if (isAutoApproved)
        {
            // Informational notification to assigned financial staff, excluding TenantOwner
            var recipients = await recipientResolver.GetFinancialActionRecipientsAsync(projectId, tenantId, excludeUserId: submitterId);

            foreach (var recipientId in recipients)
            {
                await notificationService.SendAsync(new SendNotificationDto
                {
                    TenantId = tenantId,
                    ReceiverId = recipientId,
                    ProjectId = projectId,
                    Title = "تسوية عهدة معتمدة ℹ️",
                    Message = $"تم اعتماد تسوية عهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}' تلقائياً.",
                    Type = NotificationType.PettyCash,
                    DeepLink = $"/dashboard/projects/{projectId}"
                });
            }
        }
        else
        {
            var submitter = await context.Set<User>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(u => u.Id == submitterId);
            var submitterName = submitter != null ? $"{submitter.FirstName} {submitter.LastName}".Trim() : "المهندس";

            var recipients = await recipientResolver.GetFinancialActionRecipientsAsync(projectId, tenantId, excludeUserId: submitterId);

            foreach (var recipientId in recipients)
            {
                await notificationService.SendAsync(new SendNotificationDto
                {
                    TenantId = tenantId,
                    ReceiverId = recipientId,
                    ProjectId = projectId,
                    Title = "طلب تسوية عهدة جديد للمراجعة 🔔",
                    Message = $"قام {submitterName} بتقديم تسوية عهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'.",
                    Type = NotificationType.PettyCash,
                    DeepLink = $"/dashboard/projects/{projectId}"
                });
            }
        }
    }

    public async Task RaiseSettlementResultNotificationAsync(
        Guid submitterId,
        decimal amount,
        Guid settlementId,
        Guid tenantId,
        Guid projectId,
        SettlementStatus status,
        string? comments = null)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        var projectName = project?.Name ?? "المشروع";

        string title;
        string message;

        switch (status)
        {
            case SettlementStatus.Approved:
                title = "تم اعتماد تسوية العهدة بنجاح ✅";
                message = $"تمت الموافقة على تسوية العهدة بقيمة {amount:N0} ج.م لمشروع '{projectName}'.";
                break;

            case SettlementStatus.ApprovedPendingRefund:
                title = "تمت مراجعة التسوية (بانتظار توريد المتبقي) ⚠️";
                message = $"تمت الموافقة على فواتير التسوية لمشروع '{projectName}'. يرجى تسليم المبلغ المتبقي للمحاسب لتصفية العهدة بالكامل.";
                break;

            case SettlementStatus.Refunded:
                title = "تم تأكيد استلام المتبقي وإغلاق التسوية ✅";
                message = $"تم تأكيد استلام المبلغ المتبقي وتصفية العهدة نهائياً لمشروع '{projectName}'.";
                break;

            case SettlementStatus.Rejected:
                title = "تم رفض تسوية العهدة ❌";
                message = string.IsNullOrWhiteSpace(comments)
                    ? $"تم رفض تسوية العهدة المقدمة لمشروع '{projectName}'."
                    : $"تم رفض تسوية العهدة لمشروع '{projectName}'. ملاحظات: {comments}";
                break;

            default:
                title = "تحديث على حالة تسوية العهدة ℹ️";
                message = $"تم تحديث حالة تسوية العهدة لمشروع '{projectName}' إلى {status}.";
                break;
        }

        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = tenantId,
            ReceiverId = submitterId,
            ProjectId = projectId,
            Title = title,
            Message = message,
            Type = NotificationType.PettyCash,
            DeepLink = $"/dashboard/projects/{projectId}"
        });
    }

    public async Task RaiseProjectStatusChangedNotificationAsync(
        Guid projectId,
        Guid tenantId,
        ProjectStatus newStatus,
        Guid changedByUserId)
    {
        var project = await context.Set<Project>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        var projectName = project?.Name ?? "المشروع";

        var recipients = await recipientResolver.GetProjectMembersRecipientsAsync(projectId, tenantId, excludeUserId: changedByUserId);

        string title;
        string message;

        if (newStatus == ProjectStatus.FinancialFreeze)
        {
            title = "تجميد الحسابات المالية للمشروع ❄️";
            message = $"تم تجميد العمليات المالية لمشروع '{projectName}'. لا يمكن تقديم طلبات عهد جديدة حتى مراجعة الحسابات.";
        }
        else if (newStatus == ProjectStatus.Closed)
        {
            title = "تم إغلاق المشروع نهائياً 🔒";
            message = $"تم إغلاق مشروع '{projectName}' نهائياً بعد مطابقة الحسابات وتصفية كافة العهد.";
        }
        else
        {
            title = "تحديث حالة المشروع 📋";
            message = $"تم تغيير حالة مشروع '{projectName}' إلى {newStatus}.";
        }

        foreach (var recipientId in recipients)
        {
            await notificationService.SendAsync(new SendNotificationDto
            {
                TenantId = tenantId,
                ReceiverId = recipientId,
                ProjectId = projectId,
                Title = title,
                Message = message,
                Type = NotificationType.Project,
                DeepLink = $"/dashboard/projects/{projectId}"
            });
        }
    }

    public async Task RaiseSubscriptionUpgradedNotificationAsync(
        Guid tenantId,
        string planName,
        int newMaxProjects)
    {
        var ownerId = await recipientResolver.GetTenantOwnerIdAsync(tenantId);
        if (!ownerId.HasValue) return;

        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = tenantId,
            ReceiverId = ownerId.Value,
            ProjectId = null,
            Title = "تمت ترقية باقة الاشتراك بنجاح 🚀",
            Message = $"تم تفعيل باقة ({planName}) بنجاح. سعة مشاريعك النشطة الحالية: {newMaxProjects} مشاريع.",
            Type = NotificationType.System,
            DeepLink = "/dashboard/subscription"
        });
    }

    public async Task RaiseNewAccountRegistrationNotificationAsync(string companyName)
    {
        var superAdminIds = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(u => u.Role == UserRole.SuperAdmin)
            .Select(u => u.Id)
            .ToListAsync();

        foreach (var superAdminId in superAdminIds)
        {
            await notificationService.SendAsync(new SendNotificationDto
            {
                TenantId = null,
                ReceiverId = superAdminId,
                ProjectId = null,
                Title = "منشأة جديدة بانتظار التفعيل 🏢",
                Message = $"سجلت شركة ({companyName}) حساباً جديداً وتتطلب مراجعة التفعيل.",
                Type = NotificationType.Registration,
                DeepLink = "/dashboard/tenants"
            });
        }
    }

    public async Task RaiseAccountActivationNotificationAsync(Guid tenantId)
    {
        var owner = await context.Set<User>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.TenantId == tenantId && u.Role == UserRole.TenantOwner);

        if (owner != null)
        {
            await notificationService.SendAsync(new SendNotificationDto
            {
                TenantId = tenantId,
                ReceiverId = owner.Id,
                ProjectId = null,
                Title = "تم تفعيل حساب منشأتك بنجاح 🎉",
                Message = "تمت مراجعة واعتماد حساب شركتك. مرحباً بك في منصة ستراكتو ERP!",
                Type = NotificationType.System,
                DeepLink = "/login"
            });
        }
    }
}
