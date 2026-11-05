# Osos / أسس — Launch Readiness Audit

**Updated:** 2026-10-06 (second pass, re-verified against the code) · **Scope:** .NET backend (Core, Infrastructure, API) + Angular client · **Method:** code review plus local runtime tests of the auth and rate-limit fixes

---

## 1. Decision in one minute

**Verdict: still NO-GO for public launch. Three blockers remain. GO for a private demo / presentation.**

| | Open | Fixed since first audit |
|---|---|---|
| 🔴 Blockers | **3** (B1 payments, B2 petty cash, N1 self-approval) | 3 (B3 JWT, B4 rate limit*, B5 SuperAdmin) |
| 🟠 High | 5 | 0 |
| 🟡 Medium | 4 | 0 |

\* B4 is done and tested locally but **not committed yet** (see section 2).

**Remaining effort to clear the blockers: about 1.5 developer-days.** B1 ≈ 1 day, B2 ≈ 2–3 hours, N1 ≈ 1 hour.

**What is solid**
- Tenant isolation: all 16 tenant-scoped tables are filtered, and every manual filter bypass re-applies the tenant check. No cross-tenant leak found.
- Login security: one JWT secret source that refuses to start when it is missing or weak; no default SuperAdmin password; no login aliases.
- Brute-force protection: per-IP and per-account login limits, with safe client-IP detection behind Railway (uncommitted).
- The payment webhook rejects calls without a valid Paymob signature.

---

## 2. Progress since the first audit

| Item | Status | Where |
|---|---|---|
| B3 — One JWT secret source, no defaults, fail fast | ✅ Committed (`3bb2694`) | [JwtSecret.cs](Structo.Infrastructure/Auth/JwtSecret.cs) |
| B5 — No default SuperAdmin; seed only when none exists | ✅ Committed (`3bb2694`) | [Program.cs](Structo.API/Program.cs) |
| Login alias `superadmin` / `superadmin@admin.com` removed | ✅ Committed (`3bb2694`) | [AuthService.cs:21](Structo.Core/Services/AuthService.cs#L21) |
| `.dockerignore`; secret-free `appsettings.json` now tracked | ✅ Committed (`3bb2694`) | [.dockerignore](.dockerignore) |
| B4 — Per-client rate limits, Railway-safe client IP, 429 + Retry-After, translated client message, no logout on refresh 429 | ⏳ **Done and tested, not committed** | `Program.cs`, `AuthController.cs`, `PublicDirectoryController.cs`, client interceptors, i18n |

**Rate limits in place (uncommitted):** login 10/min per IP plus 5 per 5 min per account · registration 5/hour per IP · token refresh 30/min per IP · public review 10/hour per IP · the Paymob webhook is deliberately not limited.

---

## 3. Blockers 🔴 (must fix before launch)

### B1. Customers can grant themselves extra projects for free — OPEN
| | |
|---|---|
| **Where** | [PaymentsController.cs:173-247](Structo.API/Controllers/PaymentsController.cs#L173-L247) |
| **What happens** | After payment, the server takes *how many projects to add* and *which tenant to credit* from fields Paymob does **not** sign (`extras.extra_projects`, `extras.tenant_id`). It never checks the amount paid against what was ordered at checkout. |
| **Scenario** | A user pays 250 EGP for +1 project, copies the valid signature from their browser redirect, and resends it to `/api/payments/callback` with `extra_projects: 500`. If this arrives before Paymob's own webhook, they get +500 projects. |
| **Also** | Two webhooks arriving at the same time can both credit the tenant (no unique index on `ReferenceNumber`). |
| **Fix** | Save Paymob's numeric `order.id` on the `PaymentAttempt` at checkout. In the webhook, find the attempt by that signed `order.id`, take tenant + quantity from the database, require `amount_cents` to match, and add a unique index on `ReferenceNumber`. |
| **Effort** | ~1 day, including a test payment in Paymob's sandbox |

### B2. An accountant or manager can create money out of nothing in a cash pool — OPEN
| | |
|---|---|
| **Where** | [PettyCashService.cs](Structo.Core/Services/PettyCashService.cs) — `UpdatePettyCashAsync` / `DeletePettyCashAsync` |
| **What happens** | Editing an advance that was already issued changes its amount but not the pool. Deleting it then refunds the *new* amount. Negative amounts are also accepted. |
| **Scenario** | Issue 1,000 EGP (pool −1,000) → edit to 10,000 → delete (pool +10,000). The pool now shows **9,000 EGP that never existed**. |
| **Fix** | Either lock the amount once an advance is issued (cancel and reissue instead), or apply the difference to the pool, and require `Amount > 0`. |
| **Effort** | ~2–3 hours |

### N1. A manager can approve their own spending — NEW, caused by an uncommitted change
| | |
|---|---|
| **Where** | Uncommitted edit to [SettlementService.cs](Structo.Core/Services/SettlementService.cs) (approve, reject, confirm refund) |
| **What happens** | Managers can now approve, reject and confirm refunds on settlements. There is no check that the approver is not the person who received the advance. |
| **Scenario** | A manager is issued 5,000 EGP of custody, submits receipts for it, and approves their own settlement. Nobody else reviews the spending. (This was already possible for an accountant holding custody; widening it to managers makes it common.) |
| **Fix** | Reject approval, rejection or refund confirmation when `resolvedByUserId == pettyCash.IssuedToUserId`. Keep the Manager permission if that is the business rule. |
| **Effort** | ~1 hour |

---

## 4. High 🟠 (first week after launch) — all still open

| # | Issue | Where | Risk | Fix | Effort |
|---|---|---|---|---|---|
| H1 | SSL certificate check disabled on R2 uploads; new HttpClient per upload | [CloudflareR2StorageService.cs:64-69](Structo.Infrastructure/Storage/CloudflareR2StorageService.cs#L64-L69) | Uploads can be intercepted; socket exhaustion under load | Remove the bypass, use `IHttpClientFactory` | 1–2 h |
| H2 | Public tracker may show receipt photos to clients | `SiteExecutionService.GetPublicProjectTrackerAsync` (photo query) | Client sees supplier prices/invoices | Add a `Category != "Receipt"` filter (the portfolio already has one) | 30 min |
| H3 | Startup runs raw SQL before migrations and swallows the failure | [Program.cs](Structo.API/Program.cs) schema guard before `Migrate()` | **Confirmed by test:** on an empty database the guard fails, no tables are created, and the app still starts with a broken schema. Blocks disaster recovery and new environments. | Move the SQL into EF migrations; let `Migrate()` be the only schema path; stop startup if it fails | ½–1 day |
| H4 | Pool balance updates have no concurrency protection | `ProjectCashPool.AvailableBalance` | Two approvals at the same moment → one is lost → wrong balance | Add a concurrency token (`xmin`) and retry | 2–3 h |
| H5 | Internal error text sent to users; Swagger open in production | [ExceptionHandlingMiddleware.cs:53](Structo.API/Middleware/ExceptionHandlingMiddleware.cs#L53), [Program.cs](Structo.API/Program.cs) `UseSwagger()` | Leaks database structure; maps the whole API for attackers | Generic message on 500 errors; Swagger only in Development | 1 h |

---

## 5. Medium 🟡 (next sprint) — all still open

| # | Topic | Finding | Recommendation |
|---|---|---|---|
| M1 | **Tests** | Still zero automated tests (no .NET test project, no Angular specs). | Start with pool balance (issue/edit/delete/settle/refund), settlement math, settlement approval rules (incl. N1), weighted progress, webhook verification, tenant isolation. |
| M2 | **Link previews & SEO** | No `og:image`, `og:url` or canonical tag; no per-page titles/meta; no server rendering. Every shared tracker link shows the same image-less card. The contractor portfolio has no URL of its own. Unknown links silently go to the home page. | Add `og:image` now (quick win). Then: per-link meta for `/track/:token`, a shareable portfolio route, a 404 page. |
| M3 | **Frontend structure** | [project-details.component.ts](Structo.Client/src/app/features/dashboard/projects/project-details.component.ts) is 7,362 lines; 48 manual change-detection calls; no `OnPush`. Signals are otherwise widely adopted. The main bundle is 146 kB over budget. | Split by tab; adopt `OnPush` gradually. |
| M4 | **Cleanup** | Empty stub files ([API PettyCashService](Structo.API/Services/PettyCashService.cs), [Core GoogleAuthService](Structo.Core/Services/GoogleAuthService.cs)); tenant-specific data patches in startup; `replace.py`, `temp_dotnet/`, root SQL files; 19 `Console.WriteLine` debug lines; docs that still quote old default passwords; page reload while rate-limited logs the user out ([auth.service.ts](Structo.Client/src/app/core/services/auth.service.ts) `hydrateAuthState`). | One cleanup PR. |

---

## 6. Recommended plan

| Step | Work | Outcome |
|---|---|---|
| **Now** | Commit the rate-limit work (B4); decide N1 and fix it with the Manager-approval change | Brute-force protection live; settlement approvals stay trustworthy |
| **Day 1** | B2 (petty cash), H2 (tracker photos), H5 (error text/Swagger), H1 (R2) | All quick fixes done |
| **Day 2** | B1 (payment webhook) + sandbox payment test | Revenue protected → **launch** |
| **Week 2** | H3 (migrations), H4 (concurrency), M1 (financial tests) | Safe to grow and redeploy |
| **Later** | M2–M4 | Better sharing, faster pages, cleaner code |

**Decisions needed from you**
1. **Settlement approvals (N1):** should Managers approve settlements at all? If yes, confirm that nobody may approve a settlement for an advance issued to themselves.
2. **Issued advances (B2):** *editable with pool adjustment*, or *locked* (cancel and reissue)? Locking is simpler and gives a cleaner audit trail.
3. **Launch with payments?** Fix B1 first (≈1 day), or launch with upgrades done manually by SuperAdmin and fix B1 after.

---

## Appendix A — Feature inventory

| Module | What it does | API → Data |
|---|---|---|
| Auth & onboarding | Email/Google login, company self-registration, SuperAdmin approval, 7-day token + 30-day rotating refresh token | `AuthController`, `GoogleAuthController` → `Users`, `Tenants` |
| Projects | Create, edit, freeze, final close-out, budget revisions with history, team members | `ProjectsController` → `Projects`, `ProjectBudgetLogs`, `ProjectMembers` |
| Cash pools & capital | Inject capital, direct payouts, transaction ledger | `FinancialTransactionsController` → `ProjectCashPools`, `FinancialTransactions` |
| Advances (petty cash) | Request → approve (pool deducted) → settle / reject | `PettyCashController` → `PettyCashes` |
| Line-by-line settlements | Engineer submits receipt lines → approve / reject / confirm refund (Owner, Accountant, and — uncommitted — Manager) | `SettlementsController` → `Settlements`, `SettlementLines` |
| Site execution | Weighted tasks with progress %, linked to settlement lines | `SiteOperationsController` → `SiteTasks`, `SiteTaskSettlementItems` |
| Daily logs & punch list | One daily log per project per day; snagging items | `SiteExecutionService` → `SiteDailyLogs`, `SitePunchItems` |
| Photos & documents | Upload to Cloudflare R2 (gallery, receipts, documents, logos) | `ImageUploadController`, `SitePhotosController` → `SitePhotos` |
| Financial reports | Per-project and company-wide reports | `FinancialReportsController` |
| Public client tracker | Client follows progress via secret link `/track/:token` — no financial data | `api/public/project-tracker/{token}` |
| Public directory & reviews | Contractor directory, portfolio, client ratings | `PublicDirectoryController` |
| Payments & quota | Paymob checkout → webhook adds projects to quota (2 free; +1 = 250 EGP; +5 = 950 EGP) | `SubscriptionController`, `PaymentsController` → `PaymentAttempts`, `SubscriptionTransactions` |
| Notifications | Real-time (SignalR), push and email (OneSignal) | `NotificationsController`, `/hubs/notifications` |
| SuperAdmin | Tenant lifecycle, approvals, manual upgrades, purge, payment audit | `SuperAdminController`, `TenantsController` |

## Appendix B — Items verified as OK

- **Tenant isolation:** query filters on all 16 tenant-scoped entities ([StructoDbContext.cs:48-63](Structo.Infrastructure/Data/StructoDbContext.cs#L48-L63)); every manual bypass re-applies the tenant check, is SuperAdmin-only, or is a public token lookup.
- **JWT:** signing and validation share one secret source; startup fails if the secret is missing, a placeholder, or under 32 bytes (tested).
- **SuperAdmin seed:** created only when none exists, from explicit env vars with a 12+ character password; an existing account is never modified (tested).
- **Rate limiting (uncommitted):** per-IP and per-account limits; a spoofed `X-Forwarded-For` does not bypass them behind Railway (tested).
- **Webhook signature:** required; requests without a valid HMAC are rejected.
- **Validation:** a global filter enforces DTO validation on every endpoint.
- **Public tracker data:** returns progress, tasks and photos only; no budgets or amounts.
- **Share/review tokens:** random GUID-based, unique-indexed.
- **Docker image:** builds; contains only the secret-free `appsettings.json`; Development settings excluded (tested).
- **Secrets in git:** no real API keys committed; `appsettings.Development.json` is untracked. Old default passwords remain in git history and some docs (M4).
