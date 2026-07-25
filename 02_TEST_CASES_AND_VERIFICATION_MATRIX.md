# 02 — Structo: Test Cases & Verification Matrix

> **Document Version:** 1.0 — Generated from deep codebase audit  
> **Date:** 2026-07-25  
> **Scope:** Manual QA + Automated API testing matrix for all system paths

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🟢 | Happy path (expected success) |
| 🔴 | Negative path (expected failure/guard) |
| 🟡 | Edge case (boundary condition) |
| ⚡ | Security test (penetration/auth bypass) |
| 🔄 | Concurrency / race condition |

---

## Section 1: Authentication & Authorization

### TC-AUTH-001 — Email/Password Login

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Valid credentials, active user | `{ email: "owner1", password: "Owner@123" }` | 200 + JWT + RefreshToken | 🟢 |
| 2 | Wrong password | `{ email: "owner1", password: "wrong" }` | 401 `Invalid credentials` | 🔴 |
| 3 | Non-existent email | `{ email: "ghost@x.com", password: "any" }` | 401 `Invalid credentials` | 🔴 |
| 4 | Deactivated user | User with `IsActive = false` | 401 `ACCOUNT_DEACTIVATED` | 🔴 |
| 5 | Unapproved tenant owner | User with `IsApproved = false` | 401 `ACCOUNT_PENDING_APPROVAL` | 🔴 |
| 6 | Rate limiting (>5 req/min) | 6 rapid login attempts | 429 Too Many Requests | 🔴 |
| 7 | Suspended tenant login | Login as user whose `Tenant.Status = Suspended` | 401 `Your organization account has been suspended` | 🔴 |
| 8 | Empty body | `{}` | 400 Validation error | 🔴 |
| 9 | SQL injection in email | `{ email: "'; DROP TABLE Users;--" }` | 401 (no injection) | ⚡ |

### TC-AUTH-002 — Token Refresh

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Valid refresh token | Valid `refreshToken` for active user | 200 + new JWT + new RefreshToken | 🟢 |
| 2 | Expired refresh token | Token with `RefreshTokenExpiryTime` in past | 401 `REFRESH_TOKEN_EXPIRED` | 🔴 |
| 3 | Token belonging to deactivated user | Valid token, `IsActive = false` | 401 `ACCOUNT_DEACTIVATED` | 🔴 |
| 4 | Token mismatch (reuse attack) | Old rotated token (user has new one) | 401 `INVALID_REFRESH_TOKEN` | ⚡ |
| 5 | Null/empty refresh token | `{ refreshToken: "" }` | 401 | 🔴 |
| 6 | Concurrent refresh (race) | Two clients fire refresh simultaneously | One succeeds, other gets 401 (token rotated) | 🔄 |

### TC-AUTH-003 — Tenant Registration

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Valid registration | Complete dto with strong password | 200 + tenantId + user created (unapproved) | 🟢 |
| 2 | Duplicate email | Email already in DB | 400 `Email is already registered` | 🔴 |
| 3 | Weak password (score < 3) | `{ password: "123" }` | 400 `كلمة المرور ضعيفة...` | 🔴 |
| 4 | XSS in company name | `<script>alert(1)</script>` in Name | Sanitized; no script execution | ⚡ |
| 5 | Missing required fields | Omit `firstName` | 400 FluentValidation error | 🔴 |

### TC-AUTH-004 — Google OAuth Login

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | New Google user | Valid `idToken`, no existing user | Creates Tenant + User; returns 401 `ACCOUNT_PENDING_APPROVAL` | 🟢 |
| 2 | Existing approved Google user | Valid `idToken`, approved user exists | 200 + JWT + auto-merged Google names | 🟢 |
| 3 | Existing unapproved Google user | Second login before approval | 401 `ACCOUNT_PENDING_APPROVAL` | 🔴 |
| 4 | Invalid Google token | Tampered/expired `idToken` | 401 `INVALID_GOOGLE_TOKEN` | ⚡ |
| 5 | Google token with no email | Token where `payload.Email` is null | 400 `Google account does not provide email` | 🔴 |
| 6 | Pre-registered employee + Google | Employee registered by owner, logs in via Google | Auto-merge names; existing role preserved | 🟡 |

---

## Section 2: Multi-Tenancy & Tenant Management

### TC-TENANT-001 — Tenant CRUD (SuperAdmin)

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Create tenant + owner | Valid `tenantName`, `ownerEmail` | 200 + Tenant (PendingApproval) + User created | 🟢 |
| 2 | Duplicate owner email | Email already exists | 400 `Email is already registered` | 🔴 |
| 3 | Non-SuperAdmin creates tenant | Bearer token of TenantOwner | 403 Forbidden | ⚡ |
| 4 | List all tenants | SuperAdmin GET | Returns all tenants with user counts | 🟢 |

### TC-TENANT-002 — Tenant Provisioning

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Provision PendingApproval tenant | Valid tenantId | 200; Status → Active; MaxProjects set by plan; Owner approved; activation email sent | 🟢 |
| 2 | Re-provision already Active | Already active tenant | 400 `already active` | 🔴 |
| 3 | Provision sets correct quota (Free) | Free plan tenant | MaxActiveProjects = 2 | 🟢 |
| 4 | Provision sets correct quota (Premium) | Premium plan tenant | MaxActiveProjects = 50 | 🟢 |

### TC-TENANT-003 — Tenant Profile Update

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Update all profile fields | New name, phone, description | 200 + updated dto returned | 🟢 |
| 2 | Geo-coordinate preservation | Update name only (no lat/lng in dto) | Previous lat/lng preserved (not wiped) | 🟢 |
| 3 | Set lat/lng to 0 | `{ latitude: 0, longitude: 0 }` | Values NOT overwritten (guard: `!= 0`) | 🟡 |
| 4 | XSS in description | `<img onerror=alert(1)>` | Sanitized by `HtmlSanitizer.Sanitize()` | ⚡ |
| 5 | Non-TenantOwner updates | Accountant tries PUT | 403 Forbidden | ⚡ |

### TC-TENANT-004 — Tenant Quota

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Check quota (under limit) | Tenant with 1/2 projects | `{ usedProjects: 1, allowedProjects: 2 }` | 🟢 |
| 2 | Check quota (at limit) | Tenant with 2/2 projects | `{ usedProjects: 2, allowedProjects: 2 }` | 🟢 |
| 3 | Missing tenant claim | No `tenantId` in JWT | 401 | 🔴 |

---

## Section 3: Project Management

### TC-PROJ-001 — Project Creation

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Create project (within quota) | Valid dto | 200 + Project (Active) | 🟢 |
| 2 | Create project (over quota) | Tenant at max projects | 200 + Project (PendingActivation) + quota warning message | 🟡 |
| 3 | Manager creates project | Manager role token | 200 (allowed for Manager) | 🟢 |
| 4 | Engineer creates project | SiteEngineer token | 403 Forbidden | ⚡ |
| 5 | XSS in project name/description | Script tags | Sanitized | ⚡ |
| 6 | Missing required fields | No `name` | 400 FluentValidation error | 🔴 |

### TC-PROJ-002 — Project Retrieval

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Get own project | Project within tenant | 200 + full project dto | 🟢 |
| 2 | Get other tenant's project | Cross-tenant project ID | 404 (query filter blocks) | ⚡ |
| 3 | SuperAdmin views project | SuperAdmin token | 200 but `Description = ""` (redacted) | 🟡 |
| 4 | Non-SuperAdmin views PendingActivation | TenantOwner views own PA project | 403 Forbidden | 🔴 |
| 5 | Client view endpoint | Valid project ID | 200 with last 5 photos, 45% progress | 🟢 |

### TC-PROJ-003 — Budget Revision

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Revise budget up | New budget > old budget | 200 + BudgetLog created + project.Budget updated | 🟢 |
| 2 | Revise budget down | New budget < old budget | 200 (no guard against reduction) | 🟡 |
| 3 | Non-owner/accountant revises | Manager token | 403 | ⚡ |

---

## Section 4: Financial Ledger & Treasury

### TC-FIN-001 — Capital Injection

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | First injection (creates pool) | `{ amount: 500000, sourceType: "ClientDeposit" }` | 200; Pool created; Income transaction; Budget += amount | 🟢 |
| 2 | Subsequent injection (updates pool) | Same sourceType, amount 200K | 200; Pool.TotalInjected += 200K; AvailableBalance += 200K | 🟢 |
| 3 | Inject into frozen project | Project in FinancialFreeze status | 400 `PROJECT_FROZEN` (if guard exists) or silent success (see audit) | 🟡 |
| 4 | Zero/negative amount | `{ amount: 0 }` or `{ amount: -100 }` | 400 Validation error | 🔴 |
| 5 | SuperAdmin injects capital | SuperAdmin token | Blocked by `UserHasAccessToProjectAsync` | ⚡ |
| 6 | BOLA: inject into other tenant's project | Different tenant's projectId | 403 Forbidden (access check) | ⚡ |

### TC-FIN-002 — Transaction CRUD

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Create expense (within budget) | Amount < remaining budget | 200 | 🟢 |
| 2 | Create expense (exceeds budget) | Amount > remaining budget, no ForceOverrun | 400 `BUDGET_EXCEEDED` | 🔴 |
| 3 | Force overrun (TenantOwner) | ForceOverrun = true, TenantOwner role | 200 + IsOverrun = true | 🟢 |
| 4 | Force overrun (non-TenantOwner) | ForceOverrun = true, Accountant role | 400 `Only TenantOwner can force overrun` | ⚡ |
| 5 | Update system-generated transaction | Edit a capital-injection transaction | 400 `Cannot edit system-generated transactions` | 🔴 |
| 6 | Delete capital transaction | Delete CapitalInjection type | 200; Pool restored; Budget reduced | 🟢 |
| 7 | Delete non-capital system transaction | Delete settlement-generated expense | 400 `Cannot delete system-generated transactions` | 🔴 |
| 8 | BOLA: CRUD on other tenant's project | Cross-tenant projectId | 403 (UserHasAccessToProject) | ⚡ |
| 9 | Paginated mobile query | pageNumber=2, pageSize=5 | Correct offset, correct total count | 🟢 |

### TC-FIN-003 — Direct Disbursement

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Valid disbursement | Amount ≤ pool.AvailableBalance | 200; PettyCash created (Issued); Expense transaction; Pool deducted | 🟢 |
| 2 | Insufficient pool balance | Amount > pool.AvailableBalance | 400 `Insufficient pool balance` | 🔴 |
| 3 | Missing tenant claim | No tenantId in JWT | 401 `Tenant ID claim missing` | 🔴 |
| 4 | Invalid pool ID | Non-existent sourcePoolId | 400 | 🔴 |

---

## Section 5: Petty Cash (Custody)

### TC-PC-001 — Custody Request

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Engineer requests custody | Valid amount + reason | 200; PettyCash (Pending); Notification sent | 🟢 |
| 2 | IDOR: engineer requests for another user | Engineer sets `issuedToUserId` to other | `issuedToUserId` auto-overwritten to self (IDOR guard) | ⚡ |
| 3 | TenantOwner requests for specific user | `issuedToUserId = engineer-guid` | Allowed; not overwritten | 🟢 |
| 4 | Request on frozen project | FinancialFreeze status | 400 `PROJECT_FROZEN` | 🔴 |
| 5 | Zero amount | `{ amount: 0 }` | 400 | 🔴 |

### TC-PC-002 — Custody Approval/Rejection

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Approve with valid pool | Pending custody + pool with sufficient balance | 200; Status → Issued; Pool deducted; Notification → engineer | 🟢 |
| 2 | Approve with insufficient pool | Pool balance < custody amount | 400 `INSUFFICIENT_POOL_BALANCE` | 🔴 |
| 3 | Approve already-approved | Custody status = Issued | 400 `Only pending custody can be approved` | 🔴 |
| 4 | Reject pending custody | Valid rejection comments | 200; Status → Rejected; Comments saved | 🟢 |
| 5 | Engineer approves custody | SiteEngineer token | 403 | ⚡ |
| 6 | Approve reimbursement custody | IsReimbursement = true | 200 + auto-settled immediately | 🟢 |

### TC-PC-003 — Custody Settle (Legacy Quick Settle)

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Quick settle issued custody | `{ spentAmount: 50000, returnAmount: 10000 }` | PettyCash → Settled; Expense registered | 🟢 |
| 2 | Settle non-issued custody | Status = Pending | 400 `Only Issued petty cash can be settled` | 🔴 |

### TC-PC-004 — Custody Delete

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Delete pending custody | Status = Pending | 200; Removed from DB | 🟢 |
| 2 | Delete issued custody | Status = Issued | 200; Pool balance restored; receipt deleted from cloud | 🟢 |
| 3 | Delete settled custody | Status = Settled | 400 `Cannot delete settled petty cash` | 🔴 |

---

## Section 6: Settlements

### TC-SET-001 — Settlement Creation

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Create with line items | Valid pettyCashId + 3 lines | 200; Settlement (PendingAccountantApproval); PettyCash → SettlePending | 🟢 |
| 2 | TenantOwner auto-approves | TenantOwner creates non-draft | 200; Settlement created AND approved in one step | 🟢 |
| 3 | Duplicate settlement | Create for PettyCash already settled | 400 | 🔴 |
| 4 | Draft settlement | `isDraft: true` | 200; Status = Draft (does NOT change PettyCash status) | 🟢 |
| 5 | Replace existing draft | New settlement for same PettyCash with existing Draft | Old draft deleted; new one created | 🟡 |
| 6 | Engineer visibility check | SiteEngineer lists settlements | Only sees own settlements | ⚡ |

### TC-SET-002 — Settlement Approval

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Exact match (spent == custody) | Spent 100K on 100K custody | Settlement → Approved; PettyCash → Settled; Expense 100K | 🟢 |
| 2 | Underspend (spent < custody) | Spent 70K on 100K custody | Settlement → ApprovedPendingRefund; PettyCash → SettlePending; Expense 70K | 🟢 |
| 3 | Overspend (spent > custody) | Spent 130K on 100K custody | Settlement → Approved; PettyCash → Settled; Expense 130K; New reimbursement PettyCash 30K (Pending) | 🟢 |
| 4 | Approve non-pending settlement | Status = Draft | 400 | 🔴 |
| 5 | Double approve | Settlement already Approved | 400 | 🔴 |

### TC-SET-003 — Refund Confirmation

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Confirm refund on ApprovedPendingRefund | Valid settlement | 200; Pool += returnAmount; Budget += returnAmount; PettyCash → Settled; RefundToTreasury transaction | 🟢 |
| 2 | Confirm refund on non-pending-refund | Status = Approved | 400 `not in ApprovedPendingRefund status` | 🔴 |
| 3 | Missing source pool | PettyCash has no sourcePoolId | 400 `Source pool not found` | 🔴 |

### TC-SET-004 — Settlement Rejection

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Reject pending settlement | Valid rejectionComments | 200; Status → RejectedByAccountant; PettyCash → Issued (reset) | 🟢 |
| 2 | Reject non-pending | Status = Approved | 400 | 🔴 |
| 3 | Engineer rejects | SiteEngineer token | 403 | ⚡ |

---

## Section 7: Project Closeout

### TC-CLOSE-001 — Reconciliation Report

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Fully reconciled project | All custody settled, balances = 0 | Report with `isFullyReconciled = true` | 🟢 |
| 2 | Partial reconciliation | 1 custody still Issued | Report with `isFullyReconciled = false`, unsettled count = 1 | 🟢 |
| 3 | Empty project (no custody) | No petty cash records | Report with `isFullyReconciled = true`, empty employee list | 🟡 |

### TC-CLOSE-002 — Project Freeze

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Freeze active project | Active project | 200; Status → FinancialFreeze; PublicReviewToken generated (Base58, 10 chars) | 🟢 |
| 2 | Freeze already frozen | Status = FinancialFreeze | 400 `Project is not in Active status` | 🔴 |
| 3 | Freeze by Accountant | Accountant token | 200 (allowed) | 🟢 |
| 4 | Freeze by Engineer | SiteEngineer token | 403 | ⚡ |

### TC-CLOSE-003 — Final Closeout

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Close fully reconciled frozen project | FinancialFreeze + IsFullyReconciled | 200; Status → Closed; IsActive = false | 🟢 |
| 2 | Close non-reconciled project | Outstanding balances | 400 `Cannot close: outstanding balances` | 🔴 |
| 3 | Close non-frozen project | Status = Active | 400 `Only frozen projects can be closed` | 🔴 |
| 4 | Non-TenantOwner closes | Accountant token | 403 | ⚡ |

### TC-CLOSE-004 — Client Review

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Submit valid review | Rating 4, notes "Excellent work" | 200; Rating saved; tenant average recalculated | 🟢 |
| 2 | Invalid token | Random/non-existent token | 404 | 🔴 |
| 3 | Rating out of range | Rating = 0 or 6 | 400 validation error | 🔴 |
| 4 | Already reviewed project | Token already used | 400 `already reviewed` | 🔴 |
| 5 | XSS in review notes | `<script>` tags | Sanitized | ⚡ |

---

## Section 8: Public Directory

### TC-PUB-001 — Tenant Directory

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | List all active tenants | No filters | All tenants with Status = Active | 🟢 |
| 2 | Filter by region | `?region=Cairo` | Only Cairo-based tenants | 🟢 |
| 3 | Filter by minRating | `?minRating=4` | Only tenants with ≥ 4 stars | 🟢 |
| 4 | PendingApproval tenant hidden | Tenant not yet approved | Not in results | ⚡ |
| 5 | Suspended tenant hidden | Tenant suspended by SuperAdmin | Not in results | ⚡ |

### TC-PUB-002 — Tenant Portfolio

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | View portfolio | Valid active tenantId | Public projects with site photos | 🟢 |
| 2 | Hidden review excluded | Project with `IsReviewHidden = true` | Review not in results | 🟢 |
| 3 | Non-public project excluded | Project with `IsPublicPortfolio = false` | Not in results | 🟢 |

---

## Section 9: Employee Management

### TC-EMP-001 — Add Employee

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Add new employee | Valid email + role | 200; User created (pre-approved); temp password; invitation email triggered | 🟢 |
| 2 | Duplicate email | Email already in DB (cross-tenant) | 400 `Email is already registered` | 🔴 |
| 3 | Accountant adds employee | Accountant token | 403 | ⚡ |
| 4 | Add SuperAdmin role employee | `role: SuperAdmin` | Should be blocked (validation gap — see audit) | ⚡ |

### TC-EMP-002 — User Status Toggle

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Deactivate employee | Valid employee ID | 200; `IsActive = false` | 🟢 |
| 2 | Self-deactivation | Own user ID | 400 `CANNOT_DISABLE_SELF` | 🔴 |
| 3 | Cross-tenant toggle | Employee from different tenant | 404 (tenant isolation) | ⚡ |
| 4 | TenantOwner toggles SuperAdmin | SuperAdmin user ID | 403 Forbidden | ⚡ |

---

## Section 10: Notifications

### TC-NOTIF-001 — Notification Lifecycle

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Get my notifications | Authenticated user | Latest 50 notifications for user's tenant + role | 🟢 |
| 2 | Mark as read | Valid notification ID | 200; IsRead = true | 🟢 |
| 3 | Clear all | Authenticated user | 200; All user's notifications cleared | 🟢 |
| 4 | Send notification (SuperAdmin) | Valid SendNotificationDto | 200; Notification created | 🟢 |
| 5 | Send notification (non-SuperAdmin) | TenantOwner token | 403 | ⚡ |

### TC-NOTIF-002 — SignalR Real-Time

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Connect with JWT | `?access_token=<jwt>` | Connection established | 🟢 |
| 2 | Connect without token | No access_token param | Connection rejected | 🔴 |
| 3 | Receive notification | Another user triggers workflow | Real-time `ReceiveNotification` event fires | 🟢 |

---

## Section 11: Image Upload & File Storage

### TC-IMG-001 — File Upload

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Upload tenant logo | Valid image file | 200; Cloudflare R2 URL returned; old logo deleted | 🟢 |
| 2 | Upload invalid file type | `.exe` file | 400 `Invalid file type` | ⚡ |
| 3 | Upload oversized file | File > max limit | 400 `File too large` | 🔴 |
| 4 | Upload project gallery | Valid image + valid projectId | 200; SitePhoto entity created; R2 URL | 🟢 |
| 5 | Upload to other tenant's project | Cross-tenant projectId | 404 (tenant query filter) | ⚡ |
| 6 | Upload without auth | No Bearer token | 401 | ⚡ |
| 7 | Null file | No file in form-data | 400 `No file uploaded` | 🔴 |

### TC-IMG-002 — Site Photo CRUD

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Upload via legacy endpoint | Form with file + description | 200; saved to `wwwroot/uploads/` | 🟢 |
| 2 | List photos (paginated) | `?pageNumber=1&pageSize=5` | Correct slice with total count | 🟢 |
| 3 | Delete existing photo | Valid photo ID within project | 200; DB record removed | 🟢 |
| 4 | Delete non-existent photo | Random GUID | 404 | 🔴 |

---

## Section 12: Cross-Cutting Concerns

### TC-CROSS-001 — Tenant Isolation (Data Leakage)

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Tenant A reads Tenant B's projects | Tenant A's JWT + Tenant B's projectId | 404 Not Found (query filter) | ⚡ |
| 2 | Tenant A reads Tenant B's custody | Cross-tenant pettyCashId | 404 | ⚡ |
| 3 | Tenant A reads Tenant B's settlements | Cross-tenant settlementId | 404 | ⚡ |
| 4 | Tenant A reads Tenant B's transactions | Cross-tenant transactionId | 404 or 403 | ⚡ |
| 5 | SuperAdmin reads financial transactions | SuperAdmin JWT | 403 / `UnauthorizedAccessException` | ⚡ |

### TC-CROSS-002 — Input Sanitization

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | XSS in project name | `<script>alert('xss')</script>` | HTML stripped/sanitized | ⚡ |
| 2 | XSS in settlement line description | Script tags | Sanitized | ⚡ |
| 3 | XSS in review notes | `<img onerror=alert(1)>` | Sanitized | ⚡ |
| 4 | XSS in employee name | `<b onmouseover=alert('xss')>name</b>` | Sanitized | ⚡ |

### TC-CROSS-003 — BOLA (Broken Object Level Auth)

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Engineer accesses unassigned project finances | Project where `ManagerId ≠ userId` | 403 Forbidden | ⚡ |
| 2 | Engineer updates other's transaction | Transaction belonging to different project | 403 | ⚡ |
| 3 | Manager accesses all projects in tenant | No ManagerId filter applied for Manager | Depends on implementation (see audit findings) | ⚡ |

### TC-CROSS-004 — Financial Integrity

| # | Scenario | Input | Expected | Type |
|---|----------|-------|----------|------|
| 1 | Verify budget after injection | Initial budget 0, inject 500K | Budget = 500K | 🟢 |
| 2 | Verify pool after approval | Pool 500K, approve custody 100K | Pool = 400K | 🟢 |
| 3 | Verify budget after refund confirm | 30K returned | Budget += 30K; Pool += 30K | 🟢 |
| 4 | Verify no double-count | Approve settlement twice (rapid) | Second attempt → 400 | 🔄 |
| 5 | Verify pool after capital delete | Delete 200K capital | Pool -= 200K; Budget -= 200K | 🟢 |

---

## Section 13: Frontend E2E Tests

### TC-FE-001 — Login Flow

| # | Scenario | Steps | Expected |
|---|----------|-------|----------|
| 1 | Standard login | Navigate to `/login` → enter credentials → submit | Redirects to `/dashboard/financials` |
| 2 | SuperAdmin login | SuperAdmin credentials | Redirects to `/dashboard/overview` |
| 3 | Failed login | Wrong password | Error toast shown |
| 4 | Token expiry handling | Wait for token expiry → make API call | Silent refresh → no logout |
| 5 | Refresh failure | Expire refresh token → make API call | Redirect to `/login` |

### TC-FE-002 — Route Guards

| # | Scenario | Steps | Expected |
|---|----------|-------|----------|
| 1 | Unauthenticated → dashboard | Navigate to `/dashboard` | Redirect to `/login?returnUrl=/dashboard` |
| 2 | TenantOwner → /dashboard/overview | Navigate to SuperAdmin-only route | Redirect to `/dashboard/projects` |
| 3 | SuperAdmin → /dashboard/projects | Navigate to TenantOwner route | Redirect to `/dashboard/overview` |

### TC-FE-003 — Placeholder Routes

| # | Scenario | Steps | Expected |
|---|----------|-------|----------|
| 1 | `/dashboard/users` loads ProjectsComponent | Navigate to `/dashboard/users` | Should show user management (BUG: shows projects) |
| 2 | `/dashboard/profile` loads ProjectsComponent | Navigate to `/dashboard/profile` | Should show profile (BUG: shows projects) |

---

## Automation Strategy

### Recommended Test Framework Stack

| Tool | Purpose |
|---|---|
| **xUnit + WebApplicationFactory** | Backend integration tests (in-memory PostgreSQL via Testcontainers) |
| **Bogus / AutoFixture** | Test data generation |
| **FluentAssertions** | Assertion readability |
| **Playwright / Cypress** | Frontend E2E tests |
| **k6 / Artillery** | Load / stress testing (rate limiter verification) |

### Priority Test Suites

| Priority | Suite | Estimated Tests |
|---|---|---|
| **P0 (Critical)** | Auth, Tenant Isolation, Financial Integrity, BOLA | ~45 |
| **P1 (High)** | Custody Lifecycle, Settlement Matrix, Closeout | ~35 |
| **P2 (Medium)** | CRUD operations, Pagination, File Upload | ~25 |
| **P3 (Low)** | UI E2E, Public Directory, Notifications | ~15 |
| | **Total** | **~120** |
