using System;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface INotificationEngine
{
    Task RaiseFinancialRequestNotificationAsync(Guid requesterId, decimal amount, Guid pettyCashId, Guid tenantId);
    Task RaiseNewAccountRegistrationNotificationAsync(string companyName);
    Task RaiseAccountActivationNotificationAsync(Guid tenantId);
}
