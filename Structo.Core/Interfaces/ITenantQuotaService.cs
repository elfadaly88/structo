using System;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public record QuotaTopUp(
    Guid TenantId,
    int ExtraProjects,
    decimal Amount,
    string TransactionType,
    string PaymentGateway,
    string PaymentMethod,
    string ReferenceNumber);

public record QuotaTopUpResult(Guid TransactionId, int NewMaxActiveProjects, string PlanName);

public interface ITenantQuotaService
{
    /// <summary>
    /// Adds projects to a tenant's quota (unlimited -1 stays unlimited) with an atomic SQL increment, and
    /// records a paid SubscriptionTransaction. Must run inside a transaction (see <see cref="InTransactionAsync{T}"/>).
    /// Returns null if the tenant does not exist.
    /// </summary>
    Task<QuotaTopUpResult?> AddProjectsAsync(QuotaTopUp topUp);

    /// <summary>Runs work in one database transaction, compatible with the retrying execution strategy.</summary>
    Task<T> InTransactionAsync<T>(Func<Task<T>> work);
}
