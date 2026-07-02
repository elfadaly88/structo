# Project Master Blueprint

## 1) Executive Overview
Structo is a multi-tenant SaaS platform for construction/interior execution teams, combining:
- Internal project operations (projects, petty cash, transactions, budgets, photos)
- Tenant/company profile management
- Public directory and public portfolio exposure
- Real-time notifications (SignalR + OneSignal)

The solution follows a layered architecture:
- `Structo.API`: Web API, auth, middleware, controllers, SignalR hub, static hosting fallback
- `Structo.Core`: Domain entities, DTOs, validators, business services, interfaces, enums
- `Structo.Infrastructure`: EF Core DbContext, migrations, JWT provider, R2 storage implementation
- `Structo.Client`: Angular SPA (built to API `wwwroot`) with Tailwind CSS UI

---

## 2) Tech Stack & Runtime Environments

### Backend Runtime
- .NET runtime: **.NET 9**
- ASP.NET Core Web API target framework: `net9.0`
- SignalR: enabled with JWT bearer support and `/hubs/notifications`
- FluentValidation: automatic model validation integrated in API pipeline
- Swagger/OpenAPI: enabled with Bearer auth scheme

### Data Layer
- Database: **PostgreSQL**
- ORM: **EF Core 9** with `Npgsql.EntityFrameworkCore.PostgreSQL`
- Migrations: code-first under `Structo.Infrastructure/Data/Migrations`
- Connection behavior:
  - Reads `DATABASE_URL` when present (Railway-style URL parsing)
  - Fallback to `ConnectionStrings:DefaultConnection`
  - Npgsql retry policy enabled (`EnableRetryOnFailure`)

### Frontend Runtime
- Framework: **Angular** (standalone components, reactive forms)
- Angular packages currently pinned to major **22.x** in `package.json`
- Styling system: **Tailwind CSS v4** + custom dark UI patterns
- Internationalization: `@ngx-translate/core`
- Real-time client: `@microsoft/signalr`

### Storage & External Integrations
- Object storage: **Cloudflare R2** via AWS S3 SDK
- Push notifications: **OneSignal**
- DataProtection key persistence: EF-backed table `DataProtectionKeys`

### Deployment Context
- API is configured for Railway-hosted environment (`https://structo-production.up.railway.app` appears in CORS and frontend environment)
- Dockerfile uses .NET 9 SDK/runtime images, exposes port 8080
- Frontend build toolchain depends on Node/npm (Angular CLI + Tailwind packages)
- Current operational context reflects .NET API hosting on Railway with Angular assets served from API `wwwroot`

---

## 3) Solution Structure (Structural Map)

### Structo.API
Primary responsibilities:
- App bootstrap (`Program.cs`)
- Authentication/authorization config
- Controller endpoint surface
- Global exception handling middleware
- Validation filter
- SignalR notification hub
- Static file hosting + SPA fallback

Main modules:
- `Controllers/`
  - `AuthController`
  - `ProjectsController`
  - `FinancialTransactionsController`
  - `PettyCashController`
  - `SitePhotosController`
  - `ImageUploadController`
  - `TenantProfileController`
  - `TenantsController`
  - `UsersController`
  - `NotificationsController`
  - `PublicDirectoryController`
- `Hubs/NotificationHub.cs`
- `Services/NotificationService.cs`, `TenantContextAccessor.cs`, API-level petty cash helper

### Structo.Core
Primary responsibilities:
- Domain entities and contracts
- Business rules and use cases
- DTOs and validators

Key domains:
- Auth and users
- Tenants and profile
- Projects and budget revisions
- Financial transactions and cash pools
- Petty cash lifecycle
- Site photos and notifications

### Structo.Infrastructure
Primary responsibilities:
- Persistence and tenancy filtering (`StructoDbContext`)
- JWT issuance (`JwtTokenProvider`)
- Cloudflare R2 upload/delete implementation

### Structo.Client (Angular)
Primary responsibilities:
- Role-aware dashboard experience
- Project operations UI (including admin and gallery tabs)
- Tenant registration/login flows
- Notification center with SignalR subscription
- Public marketplace/directory browsing

Build linkage:
- Angular production output path is `../Structo.API/wwwroot`
- API serves built frontend via static files + fallback to `index.html`

---

## 4) Security, Identity, and Access Control

### JWT Token Composition
Token claims include:
- `sub`: user id
- `role` and `ClaimTypes.Role`: user role
- `name` and `ClaimTypes.Name`: display/email name mapping
- `tenantId`: tenant identifier (nullable for SuperAdmin)

### JWT Validation Setup
- `NameClaimType = "name"`
- `RoleClaimType = "role"`
- `MapInboundClaims = false`
- SignalR token extraction from query string `access_token` for `/hubs/*`

### Roles in Active Use
- `SuperAdmin`
- `TenantOwner`
- `Manager`
- `Accountant`
- `SiteEngineer`
- `DesignEngineer`

Role checks appear at controller class/method level and in frontend UI behavior gates.

---

## 5) Multi-Tenancy & Isolation (Behavioral Architecture)

### Core Isolation Model
Isolation is based on `TenantId` and enforced natively through:
1. JWT claim extraction (`tenantId`) from authenticated context
2. `ITenantContextAccessor.GetCurrentTenantId()` resolving tenant scope
3. EF Core global query filters in `StructoDbContext`
4. Automatic tenant stamping on insert (`SaveChanges` override)

### EF Core Global Query Filters
`StructoDbContext` applies filters to tenant-scoped entities:
- `User`
- `Project`
- `FinancialTransaction`
- `PettyCash`
- `SitePhoto`
- `ProjectCashPool`
- `ProjectBudgetLog` (through project tenant relation)
- `Notification` (special handling for tenant/global visibility)

Filter pattern:
- Entity visible when `CurrentTenantId == null` (global context / super admin bypass)
- Otherwise only rows where `Entity.TenantId == CurrentTenantId`

### SuperAdmin Bypass
`TenantContextAccessor` returns `null` when current user is in role `SuperAdmin`. This intentionally disables tenant scoping via global filters for platform-level operations.

### Write-Side Tenant Safety
`SetTenantIdOnSave()` inside `StructoDbContext`:
- Enumerates added entities implementing `ITenantEntity`
- If `CurrentTenantId` exists, it injects `TenantId` automatically

This enforces tenant consistency even when higher layers omit explicit assignment.

### Important Operational Rule
Repository/business code is designed to rely on global query filters rather than manual tenant `WHERE` clauses everywhere, reducing accidental cross-tenant leakage.

---

## 6) Completed Stable Features (Verified)

### 6.1 Custody Request Validation (Petty Cash Request Guard)
Implemented in Angular `ProjectDetailsComponent` via custom `insufficientBalanceValidator`:
- Compares requested petty cash amount against:
  - Selected cash pool available balance (if source chosen)
  - Or aggregate available pool balance
- Sets control error `insufficientBalance` when over limit
- Submit button remains disabled due to invalid form state
- User gets immediate red warning message

Backend reinforcement:
- `PettyCashService.CreatePettyCashAsync` validates selected pool availability
- Rejects insufficient funds with explicit business message

### 6.2 Payment Date Picker UX + Control Stability
- Payment date input is bound to `paymentDate` FormControl in capital injection flow
- Field defaults to current date and is required
- Existing strict rule preserved: no renaming/breaking of `paymentDate`
- Dark-theme compatible styling is applied through Tailwind classes in component

### 6.3 Company Admin Dashboard Controls
Implemented under project "admin settings" tab for tenant owner:
- Tenant profile management form:
  - Company name
  - Region
  - Company description
  - Logo upload
  - Banner upload
- Save flow wired to `tenant-profile/update` endpoint
- Success state and profile refresh logic included

Project visibility management:
- Toggle `Show on Public Portfolio Gallery`
- Persists through project update flow by embedding visibility flags in legacy JSON payload
- Mapped server-side to entity-level `Project.IsPublicPortfolio`

### 6.4 Project Gallery Constraints (5 images / 2MB)
Frontend constraints in `onGalleryFileSelected`:
- Hard limit: max 5 images per project
- File size guard: max 2 MB per image
- Alerts displayed when limit exceeded

Backend support:
- Upload endpoint stores image to R2 and creates `SitePhoto` row
- Delete endpoint removes photo record and refreshes gallery state client-side

### 6.5 Cloudflare R2 Storage Infrastructure + SSL Bypass Strategy
Infrastructure is stable and implemented as:
- AWS S3 SDK-based R2 integration
- Object key tenant structure:
  - `{tenantId}/profile/logo.ext`
  - `{tenantId}/profile/banner.ext`
  - `{tenantId}/projects/{projectId}/images/{guid}.ext`
  - `{tenantId}/projects/{projectId}/files/{guid}.ext`

SSL/handshake hardening:
- `CustomAwsHttpClientFactory` configured in API S3 client setup
- Custom `HttpClientHandler` allows certificate callback + TLS12/TLS13
- Direct upload path uses tuned HTTP/1.1 + explicit host header for Cloudflare compatibility on Linux/container environments

---

## 7) Domain Behavior Map (Core Workflows)

### Auth + Tenant Onboarding
- Tenant registration creates:
  - Pending-approval tenant
  - TenantOwner user
- Login validates credentials and tenant activation state
- JWT issued with role + tenant claim context

### Tenant Activation
- SuperAdmin activation paths:
  - `POST /api/tenants/{id}/provision`
  - `POST /api/users/approve-tenant/{id}`
- Activation sets tenant `Status = Active` and computes `MaxActiveProjects` by subscription plan

### Projects
- Create/update operations role-gated
- SuperAdmin can pass explicit tenant; tenant users scoped to their own tenant
- Budget revisions logged to `ProjectBudgetLog`
- Client-view endpoint exposes public-facing projection with recent photos

### Finance + Cash Pools
- Capital injections create/extend per-source cash pools
- Income/expense transactions paged for mobile/table views
- System-generated transaction locking prevents tampering with audited records

### Petty Cash Lifecycle
- Create request (pending or directly issued for owner with source pool)
- Approve/reject flow (owner/accountant)
- Settlement creates linked expense transaction and return amount
- Deletion/update restrictions protect settled/audited items

### Notifications
- `NotificationService` pipeline:
  1. Persist notification to DB
  2. Broadcast via SignalR (tenant/user/role/superadmin groups)
  3. Send OneSignal push (best effort, non-blocking failures)
- Hub group strategy enforces tenant + role delivery isolation

### Public Directory
- Anonymous listings of tenants with optional filters (region/category/min rating)
- Public portfolio endpoint returns only projects flagged public

---

## 8) Complete API Route Registry

Base host examples:
- Local: `http://localhost:5000`
- Hosted: `https://structo-production.up.railway.app`

### AuthController (`/api/auth`)
- `POST /api/auth/login`
- `POST /api/auth/register-tenant` (anonymous)

### ProjectsController (`/api/projects`)
- `GET /api/projects`
- `POST /api/projects` (SuperAdmin, TenantOwner, Manager)
- `GET /api/projects/{id}`
- `GET /api/projects/{id}/client-view`
- `POST /api/projects/{id}/budget-revision` (TenantOwner, Accountant)
- `GET /api/projects/{id}/budget-history`
- `PUT /api/projects/{id}` (SuperAdmin, TenantOwner, Manager)

### FinancialTransactionsController (`/api/projects/{projectId}/financialtransactions`)
- `POST /api/projects/{projectId}/financialtransactions`
- `GET /api/projects/{projectId}/financialtransactions/mobile`
- `POST /api/projects/{projectId}/financialtransactions/inject-capital` (TenantOwner, Accountant)
- `GET /api/projects/{projectId}/financialtransactions/cash-pools`
- `PUT /api/projects/{projectId}/financialtransactions/{id}` (TenantOwner, Accountant)
- `DELETE /api/projects/{projectId}/financialtransactions/{id}` (TenantOwner, Accountant)

### PettyCashController (`/api/projects/{projectId}/pettycash`)
- `POST /api/projects/{projectId}/pettycash`
- `POST /api/projects/{projectId}/pettycash/{id}/approve` (TenantOwner, Accountant)
- `POST /api/projects/{projectId}/pettycash/{id}/reject` (TenantOwner, Accountant)
- `POST /api/projects/{projectId}/pettycash/{id}/settle`
- `GET /api/projects/{projectId}/pettycash/mobile`
- `PUT /api/projects/{projectId}/pettycash/{id}` (TenantOwner, Accountant)
- `DELETE /api/projects/{projectId}/pettycash/{id}` (TenantOwner, Accountant)

### SitePhotosController (`/api/projects/{projectId}/sitephotos`)
- `POST /api/projects/{projectId}/sitephotos`
- `GET /api/projects/{projectId}/sitephotos/mobile`
- `DELETE /api/projects/{projectId}/sitephotos/{id}`

### ImageUploadController (`/api/imageupload`)
- `POST /api/imageupload/tenant-logo`
- `POST /api/imageupload/tenant-banner`
- `POST /api/imageupload/project-gallery/{projectId}`
- `POST /api/imageupload/project-document/{projectId}`

### NotificationsController (`/api/notifications`)
- `GET /api/notifications`
- `POST /api/notifications/{id}/mark-read`
- `POST /api/notifications/send` (SuperAdmin)
- `DELETE /api/notifications/clear-all`

### TenantProfileController (`/api/tenant-profile`)
- `GET /api/tenant-profile`
- `PUT /api/tenant-profile/update` (TenantOwner)

### TenantsController (`/api/tenants`)
- `POST /api/tenants` (SuperAdmin)
- `GET /api/tenants` (SuperAdmin)
- `POST /api/tenants/{id}/provision` (SuperAdmin)

### UsersController (`/api/users`)
- `GET /api/users`
- `POST /api/users` (TenantOwner, SuperAdmin)
- `POST /api/users/approve-tenant/{id}` (SuperAdmin)

### PublicDirectoryController (`/api/public`)
- `GET /api/public/tenants`
- `GET /api/public/tenants/{id}/portfolio`

### Real-Time Hub
- SignalR Hub endpoint: `GET/WS /hubs/notifications`
- Auth token transport: query parameter `access_token`

---

## 9) Data Model & Key Entities Snapshot

Tenant-scoped entities:
- `User`
- `Project`
- `FinancialTransaction`
- `PettyCash`
- `SitePhoto`
- `ProjectCashPool`
- `ProjectBudgetLog`
- `Notification`

Special entity:
- `Tenant` (platform-level anchor for tenant definitions)

Notable fields:
- `Project.IsPublicPortfolio` drives public visibility
- `FinancialTransaction.IsSystemGenerated` locks audited/system records
- `PettyCash` tracks issue/settlement lifecycle (`Status`, `IsSettled`, `SpentAmount`, `ReturnAmount`)

---

## 10) Frontend-Backend Integration Map

### Frontend Services -> API
- `ProjectService` -> `/api/projects/*`
- `FinancialService` -> `/api/projects/{projectId}/financialtransactions/*`
- `PettyCashService` -> `/api/projects/{projectId}/pettycash/*`
- `ImageUploadService` -> `/api/imageupload/*` and `/api/projects/{projectId}/sitephotos/*`
- `TenantProfileService` -> `/api/tenant-profile/*`
- `NotificationService` -> `/api/notifications/*` + `/hubs/notifications`

### Hosting Integration
- Angular production build outputs directly to API static root
- API serves SPA and routes fallback with `MapFallbackToFile("index.html")`

---

## 11) Platform Invariants (Must-Not-Break Rules)

1. Tenant isolation is mandatory and enforced at DbContext/query-filter level.
2. `paymentDate` control contract is active in financial injection flow and should remain stable.
3. Petty cash request must fail fast when requested amount exceeds available funds.
4. Project gallery hard caps are product requirements:
   - Max 5 images per project
   - Max 2MB per uploaded image
5. Cloudflare R2 key schema must remain tenant/project namespaced.
6. SuperAdmin is the only role with global cross-tenant visibility semantics.

---

## 12) Operational Notes

- API seeds super admin + sample tenants/users/projects if absent during startup.
- `context.Database.EnsureCreated()` + `Migrate()` are both called during startup scope.
- CORS policy currently allows:
  - `http://localhost:4200`
  - `https://structo-production.up.railway.app`
- SignalR keepalive/client timeout tuned for proxy resilience.

---

## 13) Current Blueprint Status
This file is the consolidated master context for the current codebase and is intended to be the authoritative architectural and behavioral reference for future development, refactors, and AI-assisted changes.
