-- Repairs ProjectCashPools.AvailableBalance where it differs from the expected value
-- (I − D + R − C, the same formula as reconcile_cash_pools.sql and CashPoolLedger.RecomputeAsync).
--
-- Review the output of reconcile_cash_pools.sql first.
-- Runs in one transaction and prints the pools before and after.
-- Dry run: change the final COMMIT to ROLLBACK.
-- A pool whose balance the app changes while this runs is skipped (reported as SKIPPED) - just rerun.
-- Only AvailableBalance is touched; TotalInjected and all source records are left as they are.
--
-- Run with: psql "<connection string>" -v ON_ERROR_STOP=1 -f repair_cash_pools.sql

BEGIN;

CREATE TEMP TABLE pool_repair ON COMMIT DROP AS
WITH income AS (
    SELECT t."ProjectId", t."SourceType", SUM(t."Amount") AS amount
    FROM "FinancialTransactions" t
    WHERE t."Type" = 'Income' AND t."SourceType" IS NOT NULL
    GROUP BY t."ProjectId", t."SourceType"
),
advances_out AS (
    SELECT p."SourcePoolId" AS pool_id, SUM(p."Amount") AS amount
    FROM "PettyCashes" p
    WHERE p."SourcePoolId" IS NOT NULL
      AND p."Status" IN ('Issued', 'ApprovedPendingRefund', 'Settled')
    GROUP BY p."SourcePoolId"
),
refunds_in AS (
    SELECT p."SourcePoolId" AS pool_id, SUM(p."ReturnAmount") AS amount
    FROM "PettyCashes" p
    WHERE p."SourcePoolId" IS NOT NULL AND p."Status" = 'Settled' AND p."ReturnAmount" > 0
    GROUP BY p."SourcePoolId"
),
closeout_out AS (
    SELECT t."ProjectId", t."SourceType", SUM(t."Amount") AS amount
    FROM "FinancialTransactions" t
    WHERE t."SourceType" IS NOT NULL
      AND t."SettlementId" IS NULL
      AND t."IsSystemGenerated"
      AND ((t."Type" = 'Expense' AND t."Description" = 'مصروف - رد باقي الدفعة للعميل')
        OR (t."Type" = 'RefundToTreasury' AND t."Description" = 'تحويل المتبقي من سيولة المشروع إلى خزينة الشركة كأرباح مرحلة'))
    GROUP BY t."ProjectId", t."SourceType"
),
recon AS (
    SELECT
        cp."Id"         AS pool_id,
        cp."TenantId"   AS tenant_id,
        cp."ProjectId"  AS project_id,
        cp."SourceType" AS source_type,
        COALESCE(i.amount, 0) - COALESCE(d.amount, 0) + COALESCE(r.amount, 0) - COALESCE(c.amount, 0) AS expected_balance,
        cp."AvailableBalance" AS balance_before
    FROM "ProjectCashPools" cp
    LEFT JOIN income       i ON i."ProjectId" = cp."ProjectId" AND i."SourceType" = cp."SourceType"
    LEFT JOIN advances_out d ON d.pool_id = cp."Id"
    LEFT JOIN refunds_in   r ON r.pool_id = cp."Id"
    LEFT JOIN closeout_out c ON c."ProjectId" = cp."ProjectId" AND c."SourceType" = cp."SourceType"
)
SELECT * FROM recon WHERE balance_before <> expected_balance;

\echo '--- BEFORE: pools to repair'
SELECT pool_id, tenant_id, project_id, source_type, balance_before, expected_balance,
       expected_balance - balance_before AS correction
FROM pool_repair
ORDER BY ABS(expected_balance - balance_before) DESC;

UPDATE "ProjectCashPools" cp
SET "AvailableBalance" = r.expected_balance
FROM pool_repair r
WHERE cp."Id" = r.pool_id
  AND cp."AvailableBalance" = r.balance_before;  -- skip a pool the app changed meanwhile

\echo '--- AFTER'
SELECT r.pool_id, r.project_id, r.source_type, r.balance_before, cp."AvailableBalance" AS balance_after,
       CASE WHEN cp."AvailableBalance" = r.expected_balance THEN 'fixed'
            ELSE 'SKIPPED (changed during repair, rerun)' END AS result
FROM pool_repair r
JOIN "ProjectCashPools" cp ON cp."Id" = r.pool_id
ORDER BY r.pool_id;

COMMIT;
