using System;
using System.Threading.Tasks;
using Structo.Core.Enums;

namespace Structo.Core.Interfaces;

public interface INotificationEngine
{
    Task RaisePettyCashRequestedNotificationAsync(Guid requesterId, decimal amount, Guid pettyCashId, Guid tenantId, Guid projectId, bool isAutoApproved = false);
    Task RaisePettyCashResultNotificationAsync(Guid requesterId, decimal amount, Guid pettyCashId, Guid tenantId, Guid projectId, bool isApproved, string? comments = null);
    
    Task RaiseSettlementSubmittedNotificationAsync(Guid submitterId, decimal amount, Guid settlementId, Guid tenantId, Guid projectId, bool isAutoApproved = false);
    Task RaiseSettlementResultNotificationAsync(Guid submitterId, decimal amount, Guid settlementId, Guid tenantId, Guid projectId, SettlementStatus status, string? comments = null);
    
    Task RaiseProjectStatusChangedNotificationAsync(Guid projectId, Guid tenantId, ProjectStatus newStatus, Guid changedByUserId);
    Task RaiseSubscriptionUpgradedNotificationAsync(Guid tenantId, string planName, int newMaxProjects);
    
    Task RaiseNewAccountRegistrationNotificationAsync(string companyName);
    Task RaiseAccountActivationNotificationAsync(Guid tenantId);

    /// <summary>Notifies every SuperAdmin about a new InstaPay request, or a receipt uploaded for one.</summary>
    Task RaiseManualPaymentSubmittedNotificationAsync(string companyName, string referenceCode, decimal amountEgp, bool receiptUploaded);

    /// <summary>Notifies the tenant owner that their InstaPay request was approved or rejected.</summary>
    Task RaiseManualPaymentResultNotificationAsync(Guid tenantId, string referenceCode, int projectsAdded, bool approved, string? rejectReason);
}
