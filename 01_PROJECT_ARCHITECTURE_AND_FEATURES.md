# 01 — Structo: Project Architecture & Feature Specification

> **Document Version:** 1.0 — Generated from deep codebase audit  
> **Date:** 2026-07-25  
> **Stack:** ASP.NET Core 8 (PostgreSQL) + Angular 19 (Standalone, Signals)

---

## 1. Executive Summary & Core Philosophy

### Platform Identity

**Structo** (branded internally as _Ousos_) is a **Multi-Tenant Construction & Interior Design Financial Management Platform** targeting the Egyptian market. It enables construction companies, architectural offices, and freelance engineers to:

- **Register & onboard** as a multi-tenant SaaS company with SuperAdmin approval gates.
- **Manage multiple projects** with geolocation, client info, and budget tracking.
- **Operate a complete financial ledger** (capital injection → custody → settlement → reconciliation → closeout).
- **Present a public portfolio directory** for client acquisition and trust-building.
- **Receive real-time notifications** via SignalR + OneSignal email integration.

### Multi-Tenant Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     SuperAdmin Layer                     │
│  (Global oversight, approval gates, review moderation)   │
├──────────────────────┬──────────────────────────────────┤
│     Tenant A         │          Tenant B                │
│  ┌──────────────┐    │    ┌──────────────┐              │
│  │ TenantOwner  │    │    │ TenantOwner  │              │
│  │ Accountant   │    │    │ Engineers... │              │
│  │ Engineers... │    │    │ Projects...  │              │
│  │ Projects...  │    │    └──────────────┘              │
│  └──────────────┘    │                                  │
├──────────────────────┴──────────────────────────────────┤
│              EF Core Global Query Filters                │
│  .HasQueryFilter(e => TenantId == null || e.TenantId)    │
│  Applied to: Project, User, PettyCash, Settlement,       │
│  FinancialTransaction, SitePhoto, ProjectCashPool,       │
│  SettlementLine, Notification, ProjectBudgetLog          │
└─────────────────────────────────────────────────────────┘
```

Every tenant-scoped entity implements `ITenantEntity` and is automatically filtered via `StructoDbContext.CurrentTenantId`, which reads from the JWT `tenantId` claim via `TenantContextAccessor`. The `SetTenantIdOnSave()` interceptor auto-stamps `TenantId` on every new entity. Public endpoints (`/api/public/*`) explicitly call `.IgnoreQueryFilters()`.

### Technology Stack

| Layer | Technology |
|---|---|
| **Backend API** | ASP.NET Core 8, Minimal Hosting (`Program.cs`) |
| **ORM** | Entity Framework Core 9 + Npgsql (PostgreSQL) |
| **Auth** | JWT Bearer Tokens + Refresh Token rotation (7-day expiry) |
| **Social Auth** | Google OAuth via `Google.Apis.Auth` |
| **Rate Limiting** | ASP.NET Core Fixed Window (5 req/min on login) |
| **File Storage** | Cloudflare R2 (S3-compatible) with `LocalNoOpStorageService` fallback |
| **Real-Time** | SignalR Hub (`/hubs/notifications`) |
| **Email** | OneSignal transactional email API |
| **Validation** | FluentValidation auto-validation pipeline |
| **Frontend** | Angular 19 (Standalone components, Signals, no NgModules) |
| **CSS** | TailwindCSS utility classes + custom design tokens |
| **Deployment** | Docker + Railway (dynamic PORT binding, TLS at edge) |

---

## 2. Complete Feature Breakdown

### Module 1: Authentication & Registration

| Feature | Endpoint(s) | Description |
|---|---|---|
| Email/Password Login | `POST /api/auth/login` | BCrypt verification, JWT + Refresh token issuance, tenant/suspension checks |
| Google OAuth Login | `POST /api/google-auth/google-login` | Auto-creates Tenant + TenantOwner if new email; auto-merges names for pre-registered employees |
| Tenant Registration | `POST /api/auth/register-tenant` | Password strength scoring (≥3/5 criteria), creates Tenant (PendingApproval) + TenantOwner user |
| Token Refresh | `POST /api/auth/refresh` | Silent 401 → refresh → retry flow via Angular JWT interceptor |
| Profile Completion Gate | Login response `isProfileComplete` | Checks `ManualAddress` + `Latitude`/`Longitude` for Company; `NationalId` + address for Freelancer |

### Module 2: Multi-Tenancy & Subscription

| Feature | Endpoint(s) | Description |
|---|---|---|
| Tenant CRUD | `POST/GET /api/tenants` | SuperAdmin creates/lists all tenants with owner lookup |
| Tenant Provisioning | `POST /api/tenants/{id}/provision` | Activates tenant, sets `MaxActiveProjects` by plan, auto-approves TenantOwner, sends activation email |
| Tenant Suspend/Unsuspend | `POST /api/tenants/{id}/toggle-status` | Toggles between `Active` ↔ `Suspended`; suspended tenants block all logins |
| Tenant Profile | `GET/PUT /api/tenant-profile` | TenantOwner updates company info, logo/banner URLs, geolocation |
| Tenant Quota | `GET /api/tenant-profile/quota` | Returns `usedProjects` / `allowedProjects` for quota enforcement |
| Tenant Audit Profile | `GET /api/superadmin/tenants/{id}/profile` | SuperAdmin-only: project count, user count, estimated storage usage, global rating |

**Subscription Plans & Quotas:**

| Plan | Max Active Projects | Auto-Set On |
|---|---|---|
| Free | 2 | Provision / Approve |
| Standard | 10 | Provision / Approve |
| Premium | 50 | Provision / Approve |

### Module 3: Project Management

| Feature | Endpoint(s) | Description |
|---|---|---|
| Create Project | `POST /api/projects` | Tenant quota enforcement → `PendingActivation` if exceeded; HTML sanitization; legacy JSON `description` parsing |
| Update Project | `PUT /api/projects/{id}` | Tenant ownership check; `PendingActivation` projects blocked for non-SuperAdmin |
| List Projects | `GET /api/projects` | SuperAdmin sees all (with optional `tenantId` filter); others see only own tenant |
| Get Single Project | `GET /api/projects/{id}` | `PendingActivation` → 403 for non-SuperAdmin; SuperAdmin gets empty description |
| Client View | `GET /api/projects/{id}/client-view` | Public-facing project snapshot with last 5 site photos (progress mocked at 45%) |
| Budget Revision | `POST /api/projects/{id}/budget-revision` | TenantOwner/Accountant; creates `ProjectBudgetLog` audit trail with BOQ file URL |
| Budget History | `GET /api/projects/{id}/budget-history` | Ordered chronological log of all budget changes |

**Project Properties:**
- Geographic: `Governorate`, `CityOrZone`, `SiteAddress`
- Client: `ClientName`, `ClientWhatsApp`
- Classification: `PropertyType` (Residential/Administrative), `Category`, `IsPublicPortfolio`
- Lifecycle: `Status` (Active → FinancialFreeze → Closed → PendingActivation)
- Review: `PublicReviewToken`, `ClientRating` (1-5), `ClientReviewNotes`, `IsReviewHidden`

### Module 4: Financial Ledger & Treasury

| Feature | Endpoint(s) | Description |
|---|---|---|
| Capital Injection | `POST /api/projects/{id}/financialtransactions/inject-capital` | Creates/updates `ProjectCashPool` by source type; creates Income transaction |
| Cash Pools | `GET /api/projects/{id}/financialtransactions/cash-pools` | Lists all pools for a project (ClientDeposit, OwnerCapital, ExternalLoan) |
| Manual Transaction | `POST /api/projects/{id}/financialtransactions` | Income/Expense with budget overrun guard (TenantOwner can force via `ForceOverrun`) |
| Transaction List | `GET /api/projects/{id}/financialtransactions/mobile` | Paginated, date-sorted, Egypt timezone conversion |
| Update Transaction | `PUT /api/projects/{id}/financialtransactions/{id}` | Blocked for system-generated transactions; old receipt cleanup |
| Delete Transaction | `DELETE /api/projects/{id}/financialtransactions/{id}` | Blocked for system-generated (non-capital); auto-restores pool balance for capital |
| Direct Disbursement | `POST /api/projects/{id}/financialtransactions/direct-disbursement` | TenantOwner/Accountant deducts from pool → creates PettyCash (Issued) + DirectDisbursement transaction |

**Financial Freeze Guard:** All financial creation endpoints check `project.Status != FinancialFreeze && != Closed`.

**Budget Overrun Protection:**
```
totalExpenses + newAmount > project.Budget
  → if ForceOverrun && role == TenantOwner → allow (marked IsOverrun)
  → else → return BUDGET_EXCEEDED
```

### Module 5: Site Custody Management (Petty Cash)

| Feature | Endpoint(s) | Description |
|---|---|---|
| Request Custody | `POST /api/projects/{id}/pettycash` | Engineer submits request (auto-assigns `IssuedToUserId` for engineers, IDOR guard); triggers notification to Accountant + TenantOwner |
| Approve Custody | `POST /api/projects/{id}/pettycash/{id}/approve` | Deducts from selected cash pool; auto-settles reimbursement requests |
| Reject Custody | `POST /api/projects/{id}/pettycash/{id}/reject` | Adds rejection comments |
| Quick Settle | `POST /api/projects/{id}/pettycash/{id}/settle` | Legacy direct settle (TenantOwner/Accountant only); creates expense transaction |
| Update Custody | `PUT /api/projects/{id}/pettycash/{id}` | Only for non-settled records |
| Delete Custody | `DELETE /api/projects/{id}/pettycash/{id}` | Restores pool balance if Issued; deletes receipt from cloud storage |

**Custody Lifecycle:**
```
Pending → [Approve] → Issued → [Settlement] → SettlePending → Settled
                  ↘ [Reject] → Rejected
```

### Module 6: Settlements & Reimbursements

| Feature | Endpoint(s) | Description |
|---|---|---|
| Create Settlement | `POST /api/projects/{id}/settlements` | Line items with invoices; draft or pending mode; replaces existing draft; TenantOwner auto-approves |
| Approve Settlement | `POST /api/projects/{id}/settlements/{id}/approve` | Calculates `NetDifference = custody - spent`; see logic matrix below |
| Confirm Refund | `POST /api/projects/{id}/settlements/{id}/confirm-refund` | Accountant confirms receipt of returned cash; restores pool + budget |
| Reject Settlement | `POST /api/projects/{id}/settlements/{id}/reject` | Returns PettyCash to `Issued` status for re-submission |
| List Settlements | `GET /api/projects/{id}/settlements` | Engineers see only their own; TenantOwner/Accountant see all |

**Settlement Approval Logic Matrix:**

| Condition | Status Transition | Actions |
|---|---|---|
| `spent < custody` (underspend) | → `ApprovedPendingRefund` | Registers spent as Expense; awaits refund confirmation |
| `spent == custody` (exact match) | → `Approved` | Marks PettyCash as Settled; registers Expense |
| `spent > custody` (overspend) | → `Approved` | Marks PettyCash as Settled; registers Expense; **creates new PettyCash reimbursement request** (Pending, `IsReimbursement = true`) |

**Double-Counting Prevention:** The expense for `settlement.TotalAmount` is registered exactly once during `ApproveSettlementAsync`. The `ConfirmRefundAsync` only creates a `RefundToTreasury` transaction for the returned amount.

### Module 7: Project Closeout & Reviews

| Feature | Endpoint(s) | Description |
|---|---|---|
| Reconciliation Report | `GET /api/projects/{id}/reconciliation-report` | Per-employee balance ledger, unsettled custody count, full/partial reconciliation status |
| Financial Freeze | `POST /api/projects/{id}/freeze` | Generates `PublicReviewToken`; blocks all new financial operations |
| Final Closeout | `POST /api/projects/{id}/final-closeout` | TenantOwner only; requires `IsFullyReconciled`; sets `Status = Closed`, `IsActive = false` |
| Client Review (Public) | `POST /api/public/projects/review/{token}` | Anonymous; validates rating 1-5; recalculates tenant average rating |
| Toggle Review Visibility | `POST /api/superadmin/reviews/{id}/toggle-visibility` | SuperAdmin hides/shows specific reviews from public directory |

### Module 8: Public Directory & Portfolio

| Feature | Endpoint(s) | Description |
|---|---|---|
| Tenant Directory | `GET /api/public/tenants` | Filters: `region`, `category`, `minRating`; only `Active` tenants; live rating recalculation |
| Tenant Portfolio | `GET /api/public/tenants/{id}/portfolio` | Public projects with site photos; `IsPublicPortfolio` filter |
| Tenant Reviews | `GET /api/public/directory/{tenantId}/reviews` | Only non-hidden (`!IsReviewHidden`) rated projects |

### Module 9: Employee Management

| Feature | Endpoint(s) | Description |
|---|---|---|
| Add Employee | `POST /api/employees` | TenantOwner/SuperAdmin; pre-approved with hardcoded temp password (`Password@123`); sends OneSignal invitation email |
| List Users | `GET /api/users` | TenantOwner/Accountant/SuperAdmin |
| Toggle User Status | `PUT /api/users/{id}/toggle-status` | Cannot self-deactivate; tenant isolation enforced |
| Create User (Legacy) | `POST /api/users` | Via `UserService`; sanitization + email normalization |

### Module 10: Notifications

| Feature | Description |
|---|---|
| **Workflow A:** Financial Request | Engineer submits custody → broadcasts to Accountant + TenantOwner within tenant |
| **Workflow B:** New Registration | Guest registers → broadcasts to all SuperAdmins |
| **Workflow C:** Account Activation | SuperAdmin approves → direct notification to TenantOwner |
| **Workflow D:** Financial Approval | Accountant approves custody → direct notification to requesting engineer |
| **Real-Time Delivery** | SignalR Hub at `/hubs/notifications` with JWT query-string auth for WebSocket handshake |
| **Email Channel** | OneSignal: Welcome, Tenant Activated, Invitation emails |

### Module 11: Image Upload & Cloud Storage

| Feature | Endpoint(s) | Description |
|---|---|---|
| Tenant Logo | `POST /api/ImageUpload/tenant-logo` | Overwrites previous; Cloudflare R2 keyed `{tenantId}/profile/logo{ext}` |
| Tenant Banner | `POST /api/ImageUpload/tenant-banner` | Same pattern as logo |
| Project Gallery | `POST /api/ImageUpload/project-gallery/{id}` | Creates `SitePhoto` entity; R2 keyed `{tenantId}/projects/{projectId}/images/{guid}{ext}` |
| Project Document | `POST /api/ImageUpload/project-document/{id}` | Returns URL only; no DB record (stateless document hosting) |
| Site Photo CRUD | `POST/GET/DELETE /api/projects/{id}/sitephotos` | Legacy local upload to `wwwroot/uploads/` |
| File Validation | `FileValidator.ValidateUploadedFile()` | Size limits, MIME type validation, security logging |

---

## 3. Practical Scenarios & Concrete Examples

### Scenario A: Full Custody-Settlement-Reimbursement Lifecycle

> **Actors:** Eng. Ahmed (SiteEngineer), Mr. Khaled (TenantOwner/Accountant)

```
Step 1: Capital Injection
  Mr. Khaled → POST /inject-capital { amount: 500,000, sourceType: "ClientDeposit" }
  Result: Pool "ClientDeposit" → TotalInjected: 500K, Available: 500K
          Income transaction recorded.

Step 2: Custody Request
  Eng. Ahmed → POST /pettycash { amount: 250,000, reason: "مستلزمات سباكة" }
  Result: PettyCash (Pending, 250K). Notification → Accountant + TenantOwner.

Step 3: Custody Approval
  Mr. Khaled → POST /pettycash/{id}/approve { sourcePoolId: "pool-guid" }
  Result: PettyCash (Issued). Pool Available: 250K. Notification → Eng. Ahmed.

Step 4: Settlement Submission (Overspend: spent 270K on 250K custody)
  Eng. Ahmed → POST /settlements {
    pettyCashId: "custody-guid",
    lines: [
      { category: "Plumbing", amount: 150000, invoiceUrl: "..." },
      { category: "Fittings",  amount: 120000, invoiceUrl: "..." }
    ]
  }
  Result: Settlement (Pending). TotalAmount: 270K. NetDifference: -20K.

Step 5: Settlement Approval
  Mr. Khaled → POST /settlements/{id}/approve
  Result:
    1. Settlement → Approved.
    2. PettyCash → Settled (SpentAmount: 270K, ReturnAmount: 0).
    3. Expense transaction: 270K registered.
    4. NEW PettyCash reimbursement created:
       { amount: 20K, reason: "تعويض مصاريف زائدة...",
         status: "Pending", isReimbursement: true }

Step 6: Reimbursement Approval
  Mr. Khaled → POST /pettycash/{reimb-id}/approve { sourcePoolId: "pool-guid" }
  Result: Reimbursement marked as Settled (auto-settle for isReimbursement).
          Pool deducted by 20K → Available: 230K.

Step 7: Project Closeout
  Mr. Khaled → POST /projects/{id}/freeze
  Result: Status → FinancialFreeze. PublicReviewToken generated.
          All future financial operations blocked.

Step 8: Client Review
  Client receives link: /public/project-review/{token}
  Submits rating: 4 stars + notes.
  Result: Tenant average rating recalculated.

Step 9: Final Closeout
  Mr. Khaled → POST /projects/{id}/final-closeout
  Reconciliation check passes → Status → Closed. IsActive = false.
```

### Scenario B: Underspend & Refund Flow

```
Custody: 100K | Spent: 70K | Return: 30K

Step 1: Settlement submitted with total 70K.
Step 2: Approved → Status: ApprovedPendingRefund.
        Expense 70K registered.
Step 3: Accountant confirms refund → POST /confirm-refund
        Pool.AvailableBalance += 30K.
        Project.Budget += 30K.
        RefundToTreasury transaction: 30K.
        PettyCash → Settled (SpentAmount: 70K, ReturnAmount: 30K).
```

### Scenario C: Quota Exceeded Project Creation

```
Tenant on Free plan (MaxActiveProjects: 2), already has 2 projects.

POST /api/projects → Response:
  { success: true, message: "QUOTA_EXCEEDED: Project created under PendingActivation status." }
  
Project created with Status: PendingActivation, IsActive: false.
Non-SuperAdmin cannot view or modify PendingActivation projects (returns 403).
```

---

## 4. User Roles & Permissions Matrix

### Role Definitions

| Role | Scope | Description |
|---|---|---|
| `SuperAdmin` | Global | Platform operator; approves tenants, moderates reviews, sees all tenants but NOT financial records |
| `TenantOwner` | Tenant | Company owner; full access to own tenant's projects, finances, employees |
| `Accountant` | Tenant | Financial administrator; approves/rejects custody and settlements |
| `Manager` | Tenant (Project) | Project manager; can create projects, request custody for own assignments |
| `SiteEngineer` | Tenant (Project) | On-site engineer; custody requests + settlements for assigned projects only |
| `DesignEngineer` | Tenant (Project) | Design engineer; same as SiteEngineer |

### Endpoint Permissions Matrix

| Endpoint / Action | SuperAdmin | TenantOwner | Accountant | Manager | SiteEngineer | DesignEngineer |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Auth: Login/Register/Refresh** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Tenants: CRUD** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Tenants: Provision/Toggle** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Tenant Profile: Get** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Tenant Profile: Update** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Projects: Create** | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Projects: List** | ✅ (all) | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) |
| **Projects: Update** | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Projects: Budget Revision** | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Projects: Freeze** | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Projects: Final Closeout** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Financial Transactions: All** | ❌ (BLOCKED) | ✅ | ✅ | ✅ (read) | ✅ (read) | ✅ (read) |
| **Capital Injection** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Direct Disbursement** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Transaction Create** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Transaction Update/Delete** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Petty Cash: Request** | ❌ (BLOCKED) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Petty Cash: Approve/Reject** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Petty Cash: List** | ❌ (BLOCKED) | ✅ (all) | ✅ (all) | ✅ (own) | ✅ (own) | ✅ (own) |
| **Settlements: Create** | ❌ (BLOCKED) | ✅ | ✅ | ✅ (own) | ✅ (own) | ✅ (own) |
| **Settlements: Approve/Reject** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Settlements: Confirm Refund** | ❌ (BLOCKED) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Users: List** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Users: Create/Toggle** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Employees: Add** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Approve Tenant** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Pending Users** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Site Photos: CRUD** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Image Upload** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Notifications: Get/Read** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Notifications: Send** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Public Directory** | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous |
| **Client Review** | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous | 🌐 Anonymous |
| **Toggle Review Visibility** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### SuperAdmin Financial Firewall

SuperAdmin is **explicitly blocked** from accessing any internal financial records via `throw new UnauthorizedAccessException("SuperAdmin is strictly blocked from accessing internal financial records.")` in:
- `FinancialTransactionService` (all methods)
- `PettyCashService` (all methods)
- `SettlementService` (all methods)

This is a deliberate design decision: SuperAdmin manages the platform infrastructure but must never see individual tenant financial data.

### Project-Level Access Control (BOLA Prevention)

The `UserHasAccessToProjectAsync()` method enforces:
- **TenantOwner / Accountant:** Can access any project within their own tenant.
- **Manager / SiteEngineer / DesignEngineer:** Can only access projects where `project.ManagerId == userId`.
- **SuperAdmin:** Blocked entirely from financial project access.

---

## 5. Frontend Architecture

### Angular Component Structure

```
app/
├── app.routes.ts            — Lazy-loaded route definitions
├── app.ts                   — Root component
├── core/
│   ├── guards/auth.guard.ts — Role-based route protection
│   ├── interceptors/jwt.interceptor.ts — Silent 401 → refresh → retry
│   ├── services/             — 18 injectable services
│   │   ├── auth.service.ts   — Signals-based auth state
│   │   ├── notification.service.ts — SignalR + OneSignal
│   │   ├── financial.service.ts
│   │   ├── settlement.service.ts
│   │   ├── petty-cash.service.ts
│   │   ├── project.service.ts
│   │   ├── public-directory.service.ts
│   │   ├── toast.service.ts
│   │   └── ...
│   ├── models/               — TypeScript interfaces
│   └── components/           — Shared UI (ConfirmModal, NotificationBell, ToastContainer)
└── features/
    ├── auth/                 — Registration
    ├── login/                — Login page
    ├── landing-page/         — Public landing
    ├── public/               — Project review (anonymous)
    └── dashboard/
        ├── dashboard-layout.component.ts — Sidebar + routing shell
        ├── overview/         — SuperAdmin analytics
        ├── projects/         — Project list + details
        ├── financials/       — Financial ledger UI
        ├── tenants/          — Tenant management (SuperAdmin)
        └── pending-users/    — User approval queue
```

### Key Frontend Patterns

1. **Signals-Based State:** `AuthService.currentUser` is a writable signal; `isAuthenticated` is a computed signal.
2. **JWT Interceptor:** Attaches Bearer token to all API requests; handles 401 with queued refresh (prevents multiple concurrent refreshes).
3. **Role-Based Guards:** `authGuard` checks `route.data.roles` array; redirects unauthorized users to appropriate defaults.
4. **DashboardRedirectComponent:** Routes `/dashboard` to `/dashboard/overview` for SuperAdmin, `/dashboard/financials` for others.
