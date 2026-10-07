using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

/// <summary>
/// The one way to add paid projects to a tenant's quota: shared by the SuperAdmin manual upgrade and
/// InstaPay approvals so both apply the quota and record the transaction identically.
/// </summary>
public class TenantQuotaService(DbContext context) : ITenantQuotaService
{
    public async Task<QuotaTopUpResult?> AddProjectsAsync(QuotaTopUp topUp)
    {
        if (topUp.ExtraProjects <= 0)
            throw new ArgumentOutOfRangeException(nameof(topUp), "ExtraProjects must be greater than zero.");

        // Atomic increment in SQL: concurrent top-ups (webhook, admin, InstaPay) can never overwrite each other
        var extra = topUp.ExtraProjects;
        var updated = await context.Set<Tenant>()
            .IgnoreQueryFilters()
            .Where(t => t.Id == topUp.TenantId)
            .ExecuteUpdateAsync(s => s.SetProperty(
                t => t.MaxActiveProjects,
                t => t.MaxActiveProjects == -1 ? -1 : t.MaxActiveProjects + extra));

        if (updated == 0)
            return null;

        var tenant = await context.Set<Tenant>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(t => t.Id == topUp.TenantId)
            .Select(t => new { t.MaxActiveProjects, t.SubscriptionPlan })
            .FirstAsync();

        var txn = new SubscriptionTransaction
        {
            TenantId = topUp.TenantId,
            TransactionType = topUp.TransactionType,
            PlanName = tenant.SubscriptionPlan.ToString(),
            ExtraProjectsAdded = topUp.ExtraProjects,
            ResultingMaxProjects = tenant.MaxActiveProjects,
            Amount = topUp.Amount,
            TaxAmount = 0m,
            TotalAmount = topUp.Amount,
            PaymentGateway = topUp.PaymentGateway,
            PaymentMethod = topUp.PaymentMethod,
            Status = "Paid",
            ReferenceNumber = topUp.ReferenceNumber,
            CreatedAt = DateTime.UtcNow
        };
        context.Set<SubscriptionTransaction>().Add(txn);
        await context.SaveChangesAsync();

        return new QuotaTopUpResult(txn.Id, tenant.MaxActiveProjects, tenant.SubscriptionPlan.ToString());
    }

    public async Task<T> InTransactionAsync<T>(Func<Task<T>> work)
    {
        var strategy = context.Database.CreateExecutionStrategy();
        return await strategy.ExecuteAsync(async () =>
        {
            await using var transaction = await context.Database.BeginTransactionAsync();
            var result = await work();
            await transaction.CommitAsync();
            return result;
        });
    }
}
