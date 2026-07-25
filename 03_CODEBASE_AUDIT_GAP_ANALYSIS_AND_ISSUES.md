# 03 — Structo: Codebase Audit, Gap Analysis & Issues Registry

> **Document Version:** 1.0 — Deep Technical Audit  
> **Date:** 2026-07-25  
> **Severity Scale:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low · ⚪ Informational

---

## Table of Contents

1. [Critical Security Vulnerabilities](#1-critical-security-vulnerabilities)
2. [Architectural & Design Issues](#2-architectural--design-issues)
3. [Business Logic Defects](#3-business-logic-defects)
4. [Code Quality & Maintainability](#4-code-quality--maintainability)
5. [Frontend Issues](#5-frontend-issues)
6. [Performance Concerns](#6-performance-concerns)
7. [DevOps & Configuration Issues](#7-devops--configuration-issues)
8. [Missing Features & Gaps](#8-missing-features--gaps)
9. [Summary Heatmap](#9-summary-heatmap)

---

## 1. Critical Security Vulnerabilities

### SEC-001 🔴 Hardcoded Employee Default Password

**File:** [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs#L76)

```csharp
var secureTempPassword = "Password@123"; // Line 76
```

**Impact:** Every employee is pre-registered with the same known password. If the OneSignal invitation email fails (no guaranteed delivery), any attacker who knows an employee's email can log in with `Password@123`.

**Remediation:**
```csharp
var randomBytes = RandomNumberGenerator.GetBytes(16);
var secureTempPassword = Convert.ToBase64String(randomBytes) + "!1a";
```
Must also be included in the invitation email body and force a password change on first login.

---

### SEC-002 🔴 Hardcoded JWT Fallback Secret Key

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L233)

```csharp
?? "SuperSecretKeyThatShouldBeAtLeast32BytesLongForHS256ToWorkProperly!"; // Line 233
```

**Impact:** If `JWT_SECRET` env var and config are both missing (common in local dev or misconfigured deploy), every JWT is signed with this publicly visible key. Any attacker can forge valid admin tokens.

**Remediation:** Replace with `throw new InvalidOperationException("JWT_SECRET must be configured.")` for non-Development environments.

---

### SEC-003 🔴 Hardcoded SuperAdmin Credentials in Seed Data

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L302-L313)

```csharp
Email = "superadmin",                              // Line 307
PasswordHash = BCrypt.Net.BCrypt.HashPassword("SuperAdmin@123"),  // Line 308
```

**Impact:** Default SuperAdmin account `superadmin / SuperAdmin@123` exists on every fresh deployment. This is a well-known credential attack vector.

**Remediation:** Generate random SuperAdmin password on first boot, print to console/logs once, then require immediate change. Or use environment variables.

---

### SEC-004 🔴 Hardcoded Google Client ID Fallback

**File:** [GoogleAuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/GoogleAuthController.cs#L56)

```csharp
var googleClientId = _configuration["Authentication:Google:ClientId"]
  ?? "752236038625-sfuglkls4icf5loo8to6gaes9b3kt1h6.apps.googleusercontent.com";
```

**Impact:** Hardcoded client ID is exposed in source code; if the Google Cloud project is compromised, all OAuth flows are vulnerable.

**Remediation:** Remove fallback; require explicit configuration.

---

### SEC-005 🟠 SSL Certificate Validation Disabled (AWS S3 Client)

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L494)

```csharp
ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true, // Line 494
```

**Impact:** All Cloudflare R2 API calls skip SSL verification. Enables man-in-the-middle attacks on file uploads in production.

**Remediation:** Remove the callback entirely, or pin to specific Cloudflare certificates.

---

### SEC-006 🟠 No File Content-Type Verification (MIME Sniffing)

**File:** [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L47-L58)

The `FileValidator.ValidateUploadedFile()` validates extension and size, but the upload endpoint trusts `file.ContentType` from the client. A malicious user could upload an `.exe` renamed to `.jpg` with a spoofed MIME type.

**Remediation:** Add magic-byte / file-header verification (e.g., check JPEG starts with `0xFF 0xD8`, PNG with `0x89 0x50`).

---

### SEC-007 🟠 `ToggleReviewVisibility` Route Collision

**File:** [ProjectsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ProjectsController.cs#L174)

```csharp
[HttpPost("/api/superadmin/reviews/{reviewId}/toggle-visibility")]
```

This absolute route (`/api/superadmin/...`) is defined inside `ProjectsController` (route: `api/projects`), bypassing the controller's `[Authorize]` attribute pattern. While `[Authorize(Roles = "SuperAdmin")]` is applied at the method level, the route lives in an unexpected location, making security audits harder.

**Remediation:** Move to `SuperAdminController` or create a dedicated `ReviewsController`.

---

### SEC-008 🟠 `SitePhotosController` — Missing Tenant Isolation on Delete

**File:** [SitePhotosController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/SitePhotosController.cs#L100-L111)

```csharp
var photo = await context.SitePhotos.FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
```

The query checks `projectId` match but does **not** verify tenant ownership. If the EF query filter is bypassed (e.g., if `CurrentTenantId` is null due to a bug), any user could delete any photo.

**Remediation:** Add explicit `&& p.TenantId == tenantId` check or validate via `UserHasAccessToProjectAsync`.

---

### SEC-009 🟡 No CSRF Protection on State-Changing Endpoints

The API relies entirely on Bearer token auth (no cookies). However, the `[AllowAnonymous]` refresh endpoint and the public review endpoint accept POST without CSRF tokens. If cookies are ever introduced, this becomes exploitable.

**Remediation:** Document as "by design" for pure API mode, but add `SameSite` cookie policy if cookies are ever used.

---

### SEC-010 🟡 Exception Messages Leaked to Client

**File:** [AuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/AuthController.cs#L45-L52)

```csharp
catch (UnauthorizedAccessException ex)
{
    return Unauthorized(new ApiResponse<LoginResponseDto>
    {
        Success = false,
        Message = ex.Message  // ← Stack trace details possible
    });
}
```

**Impact:** Internal exception messages may reveal implementation details.

**Remediation:** Return generic messages; log the actual exception.

---

## 2. Architectural & Design Issues

### ARCH-001 🟠 Fat Controllers — Direct DbContext in Controllers

**Files:**
- [TenantProfileController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/TenantProfileController.cs) — 159 lines of raw EF queries
- [SitePhotosController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/SitePhotosController.cs) — 114 lines of raw EF queries
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs) — 274 lines mixing storage, DB, and business logic
- [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs) — Direct context operations + background email
- [UsersController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/UsersController.cs#L117-L172) — `ApproveTenant` method has full business logic in controller
- [ProjectsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ProjectsController.cs#L174-L193) — `ToggleReviewVisibility` directly manipulates entities

**Impact:** Violates separation of concerns. Business logic in controllers is untestable, unreusable, and creates maintenance burden.

**Remediation:** Extract to service classes: `TenantProfileService`, `SitePhotoService`, `ImageUploadService`, `EmployeeService`.

---

### ARCH-002 🟠 `SetTenantIdOnSave()` Relies on ChangeTracker for Cascading

**File:** [StructoDbContext.cs](file:///e:/private/structo/structo/Structo.Infrastructure/Data/StructoDbContext.cs#L281-L310)

```csharp
// The Settlement → SettlementLine cascade explicitly sets TenantId
foreach (var line in entry.Entity.Lines)
{
    line.TenantId = entry.Entity.TenantId;
}
```

**Impact:** This works only when Settlement + Lines are tracked in the same `SaveChanges()` call. If lines are added in a separate context or transaction, they get `TenantId = Guid.Empty`, breaking query filters silently.

**Remediation:** Add `BEFORE INSERT` database trigger as a safety net, or validate in `SaveChangesAsync` that all `ITenantEntity` objects have non-empty `TenantId`.

---

### ARCH-003 🟡 No Repository Pattern / Unit of Work

The codebase directly injects `StructoDbContext` into both services and controllers, with no abstraction layer. This makes:
- **Testing difficult** — No mock boundary for DB access.
- **Transaction management** implicit — Multiple `SaveChangesAsync()` calls in a single request can leave partial state on failure.

**Remediation:** Consider at minimum a `IUnitOfWork` wrapper for critical multi-step financial operations.

---

### ARCH-004 🟡 Global Service Provider Anti-Pattern

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L462-L485)

```csharp
Structo.API.Program.AppServices = app.Services;  // Line 462

namespace Structo.API
{
    public partial class Program
    {
        public static IServiceProvider AppServices { get; set; } = default!;
    }
}
```

**Impact:** Service Locator anti-pattern. Enables untracked DI resolution from anywhere, bypassing scope lifetimes. Can cause `ObjectDisposedException` if scoped services are resolved from the root provider.

**Remediation:** Remove and inject services through proper DI channels.

---

### ARCH-005 🟡 Fire-and-Forget Background Emails

**Files:**
- [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs#L105-L126)
- [NotificationEngine.cs](file:///e:/private/structo/structo/Structo.Core/Services/NotificationEngine.cs) — `Task.Run` for email delivery

```csharp
_ = Task.Run(async () => {
    using var scope = _scopeFactory.CreateScope();
    var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
    await emailService.SendInvitationEmailAsync(...);
});
```

**Impact:** While `IServiceScopeFactory` correctly handles scoped services, `Task.Run` fire-and-forget means:
- No retry on failure
- No dead-letter queue
- Failed emails are silently logged and lost
- `_ = Task.Run` suppresses unobserved task exceptions

**Remediation:** Use `IHostedService` / `BackgroundService` with a channel/queue, or a library like Hangfire.

---

### ARCH-006 🟡 `EnsureCreated()` + `Migrate()` Called Sequentially

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L290-L292)

```csharp
context.Database.EnsureCreated();
context.Database.Migrate();
```

**Impact:** `EnsureCreated()` creates the schema without migration history. If any subsequent migration tries to create a table/column that `EnsureCreated` already made, it throws. EF Core docs explicitly warn against using both.

**Remediation:** Use only `Migrate()` for production. `EnsureCreated()` is for testing only.

---

## 3. Business Logic Defects

### BUG-001 🟠 Budget Revision Does Not Validate Against Spent Amount

**File:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `ReviseBudgetAsync`

A budget can be revised **downward** below the total already spent. This creates an inconsistent state where `Budget < TotalExpenses`, causing budget overrun calculations to be permanently triggered.

**Remediation:** Add guard: `if (newBudget < totalSpentToDate) return (false, "Cannot set budget below total expenses")`.

---

### BUG-002 🟠 Financial Freeze Bypass via Capital Injection

**File:** [FinancialTransactionService.cs](file:///e:/private/structo/structo/Structo.Core/Services/FinancialTransactionService.cs) — `InjectCapitalAsync`

The freeze check (`Status != FinancialFreeze && != Closed`) exists in `CreateTransactionAsync` but may not be applied consistently in `InjectCapitalAsync`. If the injection creates its own transaction path that bypasses the freeze guard, capital can still be injected into a frozen project.

**Remediation:** Add explicit `project.Status` check at the start of `InjectCapitalAsync`.

---

### BUG-003 🟠 Concurrent Settlement Approval Race Condition

**File:** [SettlementService.cs](file:///e:/private/structo/structo/Structo.Core/Services/SettlementService.cs) — `ApproveSettlementAsync`

The approval flow:
1. Reads settlement → checks status is `PendingAccountantApproval`
2. Creates expense transaction
3. Updates pool balance
4. Marks as Approved

No optimistic concurrency (`RowVersion`) or `SELECT FOR UPDATE` lock. Two concurrent approvals could both read "Pending" and both execute, causing double expense registration and double pool deduction.

**Remediation:** Add `[ConcurrencyCheck]` / `[Timestamp]` on `Settlement.Status`, or use database-level `FOR UPDATE` locking.

---

### BUG-004 🟡 Pool Balance Can Go Negative

**File:** [FinancialTransactionService.cs](file:///e:/private/structo/structo/Structo.Core/Services/FinancialTransactionService.cs)

When deleting a capital-injection transaction, the pool's `AvailableBalance` is reduced. If custody has already been issued against that pool, the balance can become negative:
```
Pool: Injected 500K, Available 200K (300K already issued)
Delete injection → Available = 200K - 500K = -300K
```

**Remediation:** Add guard: `if (pool.TotalInjected - deleteAmount < pool.TotalInjected - pool.AvailableBalance) return error`.

---

### BUG-005 🟡 Reconciliation Report Counts Rejected Custody as Unsettled

**File:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `GetReconciliationReportAsync`

Rejected petty cash requests may be counted in the unsettled balance, preventing closeout even though rejected items require no further action.

**Remediation:** Filter to `Status not in (Rejected, Settled)` for unsettled count.

---

### BUG-006 🟡 Quota Check Does Not Exclude Closed Projects

**File:** [TenantProfileController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/TenantProfileController.cs#L147-L148)

```csharp
var usedProjects = await context.Projects.CountAsync(p => p.TenantId == tenantId);
```

Counts ALL projects including Closed ones. A tenant who closes old projects never frees up quota slots.

**Remediation:** Add `.Where(p => p.Status != "Closed")` or count only `IsActive == true` projects.

---

### BUG-007 🟡 `ProjectCreateDto` Legacy JSON Description Parsing

**File:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `CreateProjectAsync`

The code attempts to parse `dto.Description` as JSON and extract nested properties. If the description is plain text, the JSON parse fails and falls through to the raw string. This dual-format handling adds complexity with no clear benefit.

**Remediation:** Document if JSON descriptions are still used. If deprecated, remove the JSON parsing branch.

---

## 4. Code Quality & Maintainability

### QUAL-001 🟡 Inconsistent Constructor Injection Styles

The codebase mixes:
- **Primary constructors** (C# 12): `ProjectsController(IProjectService projectService, ...)` 
- **Traditional constructors**: `FinancialTransactionsController` with `_field = param` pattern

While both work, inconsistency reduces readability.

**Remediation:** Standardize on one style project-wide.

---

### QUAL-002 🟡 Arabic Comments in Source Code

**Files:** Multiple controllers and services contain Arabic-language comments:

```csharp
// 🚨 Security Warn: Refused file upload attempt  ← English
// 🔒 صمام الأمان لمنع اختراق الـ BOLA            ← Arabic
// DevSecOps IDOR Guard                             ← English
```

**Impact:** Non-Arabic developers cannot understand code intent. Comments should be in the project's lingua franca (English).

**Remediation:** Translate all comments to English.

---

### QUAL-003 🟡 DTO Definition in Controller File

**File:** [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L18-L21)

```csharp
public class UploadResultDto
{
    public string Url { get; set; } = string.Empty;
}
```

And [GoogleAuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/GoogleAuthController.cs#L251-L255):

```csharp
public class GoogleLoginRequestDto
{
    public string IdToken { get; set; } = string.Empty;
    public string? SubscriptionPlan { get; set; }
}
```

**Impact:** DTOs co-located with controllers break the DTO discovery pattern. Other developers won't find them in the `Core/DTOs` directory.

**Remediation:** Move to `Structo.Core.DTOs.Auth` and `Structo.Core.DTOs.Common`.

---

### QUAL-004 🟡 Duplicated Tenant Claim Extraction Logic

Every controller extracts `tenantId` from JWT claims with slightly different code:

```csharp
// Pattern A: Via ITenantContextAccessor
var tenantId = tenantContextAccessor.GetCurrentTenantId();

// Pattern B: Manual claim reading
var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
Guid? tenantId = tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var parsedId) ...

// Pattern C: Direct FindFirstValue
var raw = User.FindFirstValue("tenantId");
```

**Impact:** 4+ different implementations of the same logic. Each can silently fail differently.

**Remediation:** Standardize on `ITenantContextAccessor.GetCurrentTenantId()` everywhere.

---

### QUAL-005 🟡 Missing Input Validation on Several Endpoints

| Endpoint | Missing Validation |
|---|---|
| `POST /api/employees` | No role whitelist — could set `Role = SuperAdmin` |
| `POST /pettycash/{id}/approve` | `PettyCashApproveDto` could have `Amount = 0` for pool source |
| `PUT /tenant-profile/update` | No max-length on `CompanyDescription` beyond DB constraint |
| `POST /projects/{id}/budget-revision` | New budget can be 0 or negative |

---

### QUAL-006 🟢 Magic Strings for Status Values

Throughout the codebase, project status comparisons use string literals:

```csharp
if (project.Status == "PendingActivation" && CurrentUserRole != "SuperAdmin")
```

While `Status` has a `HasConversion<string>()` in EF, the controller code compares against raw strings instead of the enum.

**Remediation:** Use `ProjectStatus.PendingActivation` enum comparisons consistently.

---

### QUAL-007 🟢 Unused `IServiceScopeFactory` in `EmployeeManagementController`

The `_scopeFactory` is injected and used only for background email. Consider extracting to a dedicated `IEmailBackgroundService` to reduce controller complexity.

---

### QUAL-008 🟢 Dead Commented-Out Code

**Files:**
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L81): `//await DeleteFileAsync(tenant.LogoUrl);`
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L136): `//await DeleteFileAsync(tenant.BannerUrl);`

**Remediation:** Remove dead code.

---

## 5. Frontend Issues

### FE-001 🟠 Placeholder Routes Loading Wrong Components

**File:** [app.routes.ts](file:///e:/private/structo/structo/Structo.Client/src/app/app.routes.ts#L72-L81)

```typescript
{
  path: 'users',
  loadComponent: () => import('./features/dashboard/projects/projects.component')
    .then(m => m.ProjectsComponent),  // ← WRONG: Should be UsersComponent
},
{
  path: 'profile',
  loadComponent: () => import('./features/dashboard/projects/projects.component')
    .then(m => m.ProjectsComponent),  // ← WRONG: Should be ProfileComponent
},
```

**Impact:** `/dashboard/users` and `/dashboard/profile` both render the Projects page instead of their intended components.

**Remediation:** Create proper `UsersComponent` and `ProfileComponent` and update imports.

---

### FE-002 🟡 Tokens Stored in LocalStorage (XSS Risk)

**File:** [auth.service.ts](file:///e:/private/structo/structo/Structo.Client/src/app/core/services/auth.service.ts#L151)

```typescript
localStorage.setItem(this.tokenKey, token);
```

**Impact:** Any XSS vulnerability in the Angular app (or a compromised third-party script) can steal the JWT and refresh token from localStorage.

**Remediation:** Consider `HttpOnly` cookies for token storage (requires CORS/CSRF changes), or use session storage + in-memory for access tokens with httpOnly refresh cookies.

---

### FE-003 🟡 No Route-Level Role Checking for Child Routes

**File:** [app.routes.ts](file:///e:/private/structo/structo/Structo.Client/src/app/app.routes.ts#L44-L91)

The `authGuard` checks `route.data.roles` only for routes that define it. Several child routes don't have `data: { roles: [...] }`, allowing any authenticated user to access them.

Example: `/dashboard` (empty path child) just redirects — no role check needed. But if new routes are added without the `data.roles` array, they'll be unprotected by default.

**Remediation:** Add `data.roles` to all dashboard children, or implement a default-deny pattern in the guard.

---

### FE-004 🟡 JWT Interceptor — No Redirect After Logout

**File:** [jwt.interceptor.ts](file:///e:/private/structo/structo/Structo.Client/src/app/core/interceptors/jwt.interceptor.ts#L54-L60)

When refresh fails, `authService.logout()` is called but there's no `router.navigate(['/login'])`. The user stays on the current page with a logged-out state, potentially seeing stale data.

**Remediation:** Inject `Router` and navigate to `/login` after logout in the interceptor.

---

### FE-005 🟢 Hardcoded Progress Percentage

The client view endpoint returns `Progress = 45` as a hardcoded value. This should be calculated from actual project milestones or manual entry.

---

## 6. Performance Concerns

### PERF-001 🟡 N+1 Query Potential in Reconciliation Report

**File:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `GetReconciliationReportAsync`

The reconciliation report iterates over petty cash records and may load user navigation properties lazily, causing N+1 queries per employee.

**Remediation:** Eager load with `.Include(pc => pc.IssuedToUser)`.

---

### PERF-002 🟡 No Pagination on Notification Retrieval

**File:** [NotificationsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/NotificationsController.cs#L33-L37)

Returns "latest 50 notifications" with a hardcoded limit. High-activity tenants may need configurable pagination.

---

### PERF-003 🟡 Live Rating Recalculation on Every Directory Request

**File:** [PublicDirectoryController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/PublicDirectoryController.cs)

Tenant ratings are recalculated by averaging all project ratings on every directory GET request. For tenants with many projects, this is an unbounded aggregation.

**Remediation:** Precompute and cache `Tenant.Rating` on review submission. Already partially done — verify the `SaveChangesAsync` updates `Tenant.Rating`.

---

### PERF-004 🟢 No Database Indexes Beyond Primary Keys

The codebase defines only primary keys and one unique index on `PublicReviewToken`. Missing indexes:
- `Projects.TenantId` (heavily filtered)
- `PettyCashes.ProjectId + Status` (used in reconciliation)
- `FinancialTransactions.ProjectId + Type` (used in budget calculations)
- `Users.Email` (used in login, duplicate checks)
- `Tenants.Status` (used in directory queries)

**Remediation:** Add composite indexes for common query patterns.

---

## 7. DevOps & Configuration Issues

### DEV-001 🟠 Hardcoded CORS Origins

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L48)

```csharp
policy.WithOrigins("http://localhost:4500", "https://structo-production.up.railway.app")
```

**Impact:** Adding new environments (staging, QA) requires code changes and redeployment.

**Remediation:** Read from `appsettings.json` or environment variables: `"Cors:AllowedOrigins": ["...", "..."]`.

---

### DEV-002 🟠 Hardcoded Database Patch in Startup

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L358-L385)

```csharp
var targetProj = context.Projects.IgnoreQueryFilters()
    .FirstOrDefault(p => p.Id == Guid.Parse("436abb4b-529f-4a9a-b559-e2f5c66e071f"));
if (targetProj != null)
{
    targetProj.TenantId = Guid.Parse("65ea11dc-d7cd-48fe-917c-508d1be80632");
    // ...patches pools, petty cashes, settlements
}
```

**Impact:** Data-fix logic embedded in application startup that runs on every boot. If the target entities are already correct, this is wasted work. If deleted, the patch is irreversible.

**Remediation:** Move to a one-time database migration or delete if the patch has already been applied.

---

### DEV-003 🟡 Swagger Exposed in Production

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L398-L403)

```csharp
// Swagger (always enabled for this project)
app.UseSwagger();
app.UseSwaggerUI(...)
```

**Impact:** Full API surface documentation visible to anyone at `/swagger`.

**Remediation:** Guard with `if (app.Environment.IsDevelopment())` or require authentication for Swagger in production.

---

### DEV-004 🟡 Seed Data Inserted on Every Startup

**File:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L299-L356)

The seed logic checks `!context.Users.Any(u => u.Role == UserRole.SuperAdmin)` and `!context.Tenants.Any(t => t.Name == "Tenant 1")`, so it won't duplicate. However, if the SuperAdmin user is deleted, it will be re-created with the hardcoded password on next restart.

**Remediation:** Move to proper EF Core `HasData()` seeding with migration tracking.

---

### DEV-005 🟢 Missing Health Check Endpoint

No `/health` or `/healthz` endpoint. Railway and other container platforms need this for liveness/readiness probes.

**Remediation:** Add `builder.Services.AddHealthChecks().AddNpgSql(...)` and `app.MapHealthChecks("/health")`.

---

### DEV-006 🟢 No Structured Logging Configuration

Logging uses `ILogger` correctly but there's no structured logging sink (Serilog, Seq, etc.) configured. Logs go to console only.

**Remediation:** Add Serilog with structured output for production observability.

---

## 8. Missing Features & Gaps

### GAP-001 🟠 No Audit Trail / Activity Log

Financial operations (approvals, deletions, status changes) have no immutable audit log. The `ProjectBudgetLog` exists for budget changes only. A malicious Accountant could delete transactions and the action would be untracked.

**Remediation:** Implement `AuditLog` entity with: `Action`, `EntityType`, `EntityId`, `UserId`, `Timestamp`, `OldValue`, `NewValue`.

---

### GAP-002 🟠 No Password Change / Reset Endpoint

Users cannot change their password after initial registration. There's no forgot-password flow.

**Remediation:** Add `POST /api/auth/change-password` and `POST /api/auth/forgot-password` with email-based OTP.

---

### GAP-003 🟡 No Soft Delete

All delete operations are hard deletes. Financial records (transactions, custody, settlements) should never be physically deleted in an accounting system.

**Remediation:** Add `IsDeleted` / `DeletedAt` fields and override query filters.

---

### GAP-004 🟡 No Pagination on User Listing

`GET /api/users` returns all users with no pagination. For tenants with hundreds of employees, this is a scalability concern.

---

### GAP-005 🟡 No Email Uniqueness Constraint at Database Level

Email uniqueness is checked via code (`Users.AnyAsync(u => u.Email == ...)`) but there's no `UNIQUE` index on `Users.Email` in the schema. Race conditions could create duplicate emails.

**Remediation:** Add `entity.HasIndex(e => e.Email).IsUnique()` in `OnModelCreating`.

---

### GAP-006 🟡 No Project Assignment to Engineers

The `ManagerId` field on `Project` is used for access control (engineers can only access projects where `ManagerId == userId`), but there's no concept of assigning multiple engineers to a project. A SiteEngineer can only access projects where they are the manager.

**Remediation:** Implement `ProjectMember` join table for multi-engineer assignment.

---

### GAP-007 🟡 No API Versioning

All endpoints are at `/api/...` with no version prefix (`/api/v1/...`). Breaking changes will affect all clients simultaneously.

---

### GAP-008 🟢 No Automated Test Suite

The solution has zero test projects. No unit tests, integration tests, or E2E tests exist.

---

### GAP-009 🟢 No Request/Response Logging Middleware

Beyond the `ExceptionHandlingMiddleware`, there's no request/response logging for debugging or compliance.

---

### GAP-010 🟢 No Rate Limiting Beyond Login

Only the login endpoint has rate limiting (`loginPolicy`: 5 req/min). Financial endpoints, file uploads, and registration have no rate limits, enabling abuse.

---

## 9. Summary Heatmap

### By Severity

| Severity | Count | Items |
|---|:---:|---|
| 🔴 **Critical** | 4 | SEC-001, SEC-002, SEC-003, SEC-004 |
| 🟠 **High** | 13 | SEC-005, SEC-006, SEC-007, SEC-008, ARCH-001, ARCH-002, ARCH-005, BUG-001, BUG-002, BUG-003, DEV-001, DEV-002, GAP-001, GAP-002 |
| 🟡 **Medium** | 22 | SEC-009, SEC-010, ARCH-003 to ARCH-006, BUG-004 to BUG-007, QUAL-001 to QUAL-005, FE-001 to FE-004, PERF-001 to PERF-003, DEV-003 to DEV-004, GAP-003 to GAP-007 |
| 🟢 **Low** | 10 | QUAL-006 to QUAL-008, FE-005, PERF-004, DEV-005, DEV-006, GAP-008 to GAP-010 |

### By Category

| Category | 🔴 | 🟠 | 🟡 | 🟢 | Total |
|---|:---:|:---:|:---:|:---:|:---:|
| **Security** | 4 | 4 | 2 | — | **10** |
| **Architecture** | — | 3 | 3 | — | **6** |
| **Business Logic** | — | 3 | 4 | — | **7** |
| **Code Quality** | — | — | 5 | 3 | **8** |
| **Frontend** | — | 1 | 3 | 1 | **5** |
| **Performance** | — | — | 3 | 1 | **4** |
| **DevOps** | — | 2 | 2 | 2 | **6** |
| **Missing Features** | — | 2 | 5 | 3 | **10** |
| **Total** | **4** | **15** | **27** | **10** | **56** |

### Priority Remediation Order

1. **Immediate (Pre-Production):** SEC-001 through SEC-004 — all hardcoded credentials and keys
2. **Sprint 1:** SEC-005, SEC-006, BUG-003 (concurrency), GAP-002 (password reset), GAP-005 (unique email)
3. **Sprint 2:** ARCH-001 (fat controllers), BUG-001 (budget validation), FE-001 (wrong routes), DEV-001 (CORS)
4. **Sprint 3:** GAP-001 (audit trail), GAP-003 (soft delete), ARCH-006 (EnsureCreated), DEV-002 (startup patch)
5. **Ongoing:** Code quality items, performance indexes, missing tests
