-- READ-ONLY cash pool reconciliation (SELECT only; no UPDATE/DELETE).
-- Recomputes each pool's expected AvailableBalance from the records that move pool money,
-- and lists pools whose stored AvailableBalance differs.
WITH income AS (
    -- (I) Capital injections: InjectCapitalAsync adds dto.Amount to the pool of that SourceType
    --     and records an Income transaction with the same SourceType. Deleting an injection removes
    --     both the transaction and the amount from the pool.
    SELECT t."ProjectId", t."SourceType", SUM(t."Amount") AS amount
    FROM "FinancialTransactions" t
    WHERE t."Type" = 'Income' AND t."SourceType" IS NOT NULL
    GROUP BY t."ProjectId", t."SourceType"
),
advances_out AS (
    -- (D) Money paid out of the pool: owner auto-issued advances, approved advances,
    --     direct disbursements and approved overspend reimbursements all subtract Amount from
    --     SourcePoolId and leave the advance Issued, ApprovedPendingRefund or Settled.
    --     Pending (not yet deducted) and Rejected advances are excluded. Deleted advances are gone
    --     from the table and their deduction was returned on delete.
    SELECT p."SourcePoolId" AS pool_id, SUM(p."Amount") AS amount
    FROM "PettyCashes" p
    WHERE p."SourcePoolId" IS NOT NULL
      AND p."Status" IN ('Issued', 'ApprovedPendingRefund', 'Settled')
    GROUP BY p."SourcePoolId"
),
refunds_in AS (
    -- (R) Unused cash returned: ConfirmRefundAsync adds (Amount - settlement total) back to the
    --     pool and stores that value in PettyCash.ReturnAmount. Nothing else sets ReturnAmount > 0.
    SELECT p."SourcePoolId" AS pool_id, SUM(p."ReturnAmount") AS amount
    FROM "PettyCashes" p
    WHERE p."SourcePoolId" IS NOT NULL AND p."Status" = 'Settled' AND p."ReturnAmount" > 0
    GROUP BY p."SourcePoolId"
),
closeout_out AS (
    -- (C) Final close-out drains each pool to 0 with one system transaction per pool:
    --     refund to client (Expense) or transfer to company profits (RefundToTreasury).
    --     Matched on the exact descriptions written by ProjectService.FinalCloseoutAsync.
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
        cp."Id"               AS pool_id,
        cp."TenantId"         AS tenant_id,
        cp."ProjectId"        AS project_id,
        cp."SourceType"       AS source_type,
        COALESCE(i.amount, 0) AS income,
        COALESCE(d.amount, 0) AS advances_out,
        COALESCE(r.amount, 0) AS refunds_in,
        COALESCE(c.amount, 0) AS closeout_out,
        COALESCE(i.amount, 0) - COALESCE(d.amount, 0) + COALESCE(r.amount, 0) - COALESCE(c.amount, 0) AS expected_balance,
        cp."AvailableBalance" AS stored_balance
    FROM "ProjectCashPools" cp
    LEFT JOIN income       i ON i."ProjectId" = cp."ProjectId" AND i."SourceType" = cp."SourceType"
    LEFT JOIN advances_out d ON d.pool_id = cp."Id"
    LEFT JOIN refunds_in   r ON r.pool_id = cp."Id"
    LEFT JOIN closeout_out c ON c."ProjectId" = cp."ProjectId" AND c."SourceType" = cp."SourceType"
)
SELECT
    pool_id, tenant_id, project_id, source_type,
    income, advances_out, refunds_in, closeout_out,
    expected_balance, stored_balance,
    stored_balance - expected_balance AS difference
FROM recon
WHERE stored_balance <> expected_balance
ORDER BY ABS(stored_balance - expected_balance) DESC;
