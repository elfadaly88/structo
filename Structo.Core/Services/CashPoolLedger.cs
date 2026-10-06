using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

/// <summary>
/// The single definition of a cash pool's balance, mirrored by docs/sql/reconcile_cash_pools.sql:
/// AvailableBalance = I − D + R − C
///   I: capital injected (Income transactions of the pool's SourceType)
///   D: advances paid out of the pool (Issued, ApprovedPendingRefund, Settled)
///   R: unused cash returned to the pool (PettyCash.ReturnAmount, set by confirm-refund)
///   C: final close-out drains (the two system transactions written by FinalCloseoutAsync)
/// </summary>
public static class CashPoolLedger
{
    public const string CloseoutRefundToClientDescription = "مصروف - رد باقي الدفعة للعميل";
    public const string CloseoutTransferToProfitsDescription = "تحويل المتبقي من سيولة المشروع إلى خزينة الشركة كأرباح مرحلة";

    public const string ConcurrencyRetryMessage =
        "POOL_BUSY: The cash pool was changed by another operation at the same moment. Please try again.";

    private const int MaxOperationAttempts = 5;
    private const int MaxRecomputeAttempts = 5;

    private static readonly string[] DeductedAdvanceStatuses = { "Issued", "ApprovedPendingRefund", "Settled" };

    /// <summary>
    /// Runs an operation whose single SaveChanges changes a pool balance. ProjectCashPool carries an xmin
    /// concurrency token, so a parallel change makes that SaveChanges fail with nothing saved; the tracked
    /// state is then cleared and the whole operation re-runs on fresh data. After the last attempt the
    /// caller gets a clear "please retry" message instead of an error.
    /// </summary>
    public static async Task<(bool Success, string Message)> RunWithRetryAsync(
        DbContext context, Func<Task<(bool Success, string Message)>> operation)
    {
        for (var attempt = 1; ; attempt++)
        {
            try
            {
                return await operation();
            }
            catch (DbUpdateConcurrencyException)
            {
                context.ChangeTracker.Clear();
                if (attempt >= MaxOperationAttempts)
                    return (false, ConcurrencyRetryMessage);

                // Randomized, growing pause so colliding requests don't retry in lockstep
                await Task.Delay(Random.Shared.Next(20, 80) * attempt);
            }
        }
    }

    /// <summary>
    /// Recomputes a pool from saved records and saves it, retrying on a concurrency conflict.
    /// Safe to repeat: the result depends only on saved source records, never on the previous balance.
    /// </summary>
    public static async Task RecomputeAndSaveAsync(DbContext context, Guid poolId)
    {
        for (var attempt = 1; ; attempt++)
        {
            var pool = await context.Set<ProjectCashPool>().FirstAsync(p => p.Id == poolId);
            await RecomputeAsync(context, pool);
            try
            {
                await context.SaveChangesAsync();
                return;
            }
            catch (DbUpdateConcurrencyException) when (attempt < MaxRecomputeAttempts)
            {
                context.ChangeTracker.Clear();
            }
        }
    }

    /// <summary>
    /// Recomputes TotalInjected and AvailableBalance from saved records. Call after SaveChanges of the
    /// change that triggered it; the caller saves the pool afterwards.
    /// </summary>
    public static async Task RecomputeAsync(DbContext context, ProjectCashPool pool)
    {
        var injected = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == pool.ProjectId && t.Type == TransactionType.Income && t.SourceType == pool.SourceType)
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        var paidOut = await context.Set<PettyCash>()
            .Where(p => p.SourcePoolId == pool.Id && DeductedAdvanceStatuses.Contains(p.Status))
            .SumAsync(p => (decimal?)p.Amount) ?? 0m;

        var returned = await context.Set<PettyCash>()
            .Where(p => p.SourcePoolId == pool.Id && p.Status == "Settled" && p.ReturnAmount > 0)
            .SumAsync(p => (decimal?)p.ReturnAmount) ?? 0m;

        var closedOut = await context.Set<FinancialTransaction>()
            .Where(t => t.ProjectId == pool.ProjectId && t.SourceType == pool.SourceType
                && t.SettlementId == null && t.IsSystemGenerated
                && ((t.Type == TransactionType.Expense && t.Description == CloseoutRefundToClientDescription)
                    || (t.Type == TransactionType.RefundToTreasury && t.Description == CloseoutTransferToProfitsDescription)))
            .SumAsync(t => (decimal?)t.Amount) ?? 0m;

        pool.TotalInjected = injected;
        pool.AvailableBalance = injected - paidOut + returned - closedOut;
    }
}
