using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Notifications;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

public class NotificationEngine(DbContext context, INotificationService notificationService) : INotificationEngine
{
    public async Task RaiseFinancialRequestNotificationAsync(Guid requesterId, decimal amount, Guid pettyCashId, Guid tenantId)
    {
        var requester = await context.Set<User>().AsNoTracking().FirstOrDefaultAsync(u => u.Id == requesterId);
        var requesterName = requester != null ? $"{requester.FirstName} {requester.LastName}" : "An engineer";

        // WORKFLOW A: Broadcast to Accountant and TenantOwner (Admin equivalent) inside specific TenantId
        // Send to Accountant
        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = tenantId,
            TargetRole = UserRole.Accountant,
            Title = "New Petty Cash Request",
            Message = $"Engineer {requesterName} requested {amount:N0} EGP.",
            Type = NotificationType.PettyCash,
            DeepLink = $"/dashboard/financial-requests/details/{pettyCashId}"
        });

        // Send to TenantOwner
        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = tenantId,
            TargetRole = UserRole.TenantOwner,
            Title = "New Petty Cash Request",
            Message = $"Engineer {requesterName} requested {amount:N0} EGP.",
            Type = NotificationType.PettyCash,
            DeepLink = $"/dashboard/financial-requests/details/{pettyCashId}"
        });
    }

    public async Task RaiseNewAccountRegistrationNotificationAsync(string companyName)
    {
        // WORKFLOW B: New Account Registration (Guest -> SuperAdmin)
        await notificationService.SendAsync(new SendNotificationDto
        {
            TenantId = null,
            TargetRole = UserRole.SuperAdmin,
            Title = "New Account Pending Approval",
            Message = $"Company {companyName} has registered and requires validation.",
            Type = NotificationType.Registration,
            DeepLink = "/dashboard/admin/approvals"
        });
    }

    public async Task RaiseAccountActivationNotificationAsync(Guid tenantId)
    {
        // WORKFLOW C: Account Activation (Admin -> User)
        // Find the TenantOwner for this tenant to notify
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
                Title = "Account Activated! 🎉",
                Message = "Your registration has been approved. Welcome to Structo!",
                Type = NotificationType.System,
                DeepLink = "/login"
            });
        }
    }
}
