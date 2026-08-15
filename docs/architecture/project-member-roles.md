# Two-Way Flexible User-Project Assignment System Architecture

## Overview

The Structo ERP system decouples **Global Role** (job function) from **Project Scope** (assigned projects via junction table `ProjectMembers`).

### Core Principle
```
Access to Project Operations = Tenant Membership + Global Role + (Implicit Ownership OR Explicit Project Assignment)
```

---

## 1. Role Definitions & Scopes

| Role | Global Scope | Project Assignment Required? | Capabilities on Assigned Projects |
|---|---|---|---|
| **`TenantOwner`** | All projects in Tenant | **No** (Implicit company-wide access) | Full management, financial control, project closeout, assign/remove members, update budgets. |
| **`Manager` (`ProjectManager`)** | Assigned projects only | **Yes** (in `ProjectMembers`) | Field and financial management on assigned projects, member management (add/remove), petty cash, settlements. |
| **`Accountant`** | Assigned projects only | **Yes** (in `ProjectMembers`) | Financial ledger, payments, transactions, petty cash approval/settlements on assigned projects. |
| **`SiteEngineer`** | Assigned projects only | **Yes** (in `ProjectMembers`) | Field petty cash requests, settlement receipts, site photos on assigned projects. |
| **`DesignEngineer`** | Assigned projects only | **Yes** (in `ProjectMembers`) | Project specs, site photos, reference BOQ access on assigned projects. |
| **`SuperAdmin`** | Cross-tenant platform level | **N/A** (No tenant membership) | Platform health, tenant subscription quota auditing. Strictly blocked from financial transactions and employee PII/member rosters. |

---

## 2. SuperAdmin Privacy Wall & Audit Philosophy

To safeguard tenant business privacy and employee confidentiality:
1. **Financial Wall**: SuperAdmin cannot access project ledger transactions, cash pools, petty cash vouchers, or financial reports.
2. **PII / Member Roster Wall**: SuperAdmin is blocked with `403 Forbidden` on `GET /api/projects/{projectId}/members`. SuperAdmin only receives sanitized aggregate member counts (`MemberCount`) via `GetAllProjectsAsync` for subscription quota auditing.

---

## 3. Database Schema

### `ProjectMembers` Junction Table

```sql
CREATE TABLE "ProjectMembers" (
    "ProjectId" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "AssignedAt" timestamp with time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    "AssignedByUserId" uuid NULL,
    CONSTRAINT "PK_ProjectMembers" PRIMARY KEY ("ProjectId", "UserId"),
    CONSTRAINT "FK_ProjectMembers_Projects_ProjectId" FOREIGN KEY ("ProjectId") 
        REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProjectMembers_Users_UserId" FOREIGN KEY ("UserId") 
        REFERENCES "Users" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProjectMembers_Tenants_TenantId" FOREIGN KEY ("TenantId") 
        REFERENCES "Tenants" ("Id") ON DELETE RESTRICT
);

CREATE INDEX "IX_ProjectMembers_TenantId" ON "ProjectMembers" ("TenantId");
CREATE INDEX "IX_ProjectMembers_UserId" ON "ProjectMembers" ("UserId");
```

### Multi-Tenancy Query Filter
EF Core enforces automatic tenant isolation on `ProjectMember`:
```csharp
modelBuilder.Entity<ProjectMember>()
    .HasQueryFilter(pm => pm.TenantId == CurrentTenantId);
```

---

## 4. Unified Authorization Service (`IProjectAccessService`)

Located in [`Structo.Core/Services/ProjectAccessService.cs`](file:///f:/PrivateWork/structo/project/Structo.Core/Services/ProjectAccessService.cs).

### Key Methods
- `CanViewProjectAsync(Guid projectId, User user)`: Verifies read access.
- `CanManageProjectAsync(Guid projectId, User user)`: Verifies edit access (TenantOwner or assigned ProjectManager).
- `CanManageFinancialsAsync(Guid projectId, User user)`: Verifies financial access (TenantOwner, assigned ProjectManager, or assigned Accountant).
- `CanSubmitFieldDataAsync(Guid projectId, User user)`: Verifies field access (TenantOwner or assigned Engineer/Manager).
- `CanCloseProjectAsync(Guid projectId, User user)`: Strictly restricted to `TenantOwner`.
- `CanManageProjectMembersAsync(Guid projectId, User user)`: Verifies member assignment access (`TenantOwner` or assigned `Manager`).
- `CanViewProjectMembersAsync(Guid projectId, User user)`: Verifies member list visibility (All assigned tenant roles; SuperAdmin is blocked).

---

## 5. API Endpoints

### Project Member Management
- `GET /api/projects/{projectId}/members`: Returns list of members with user details and roles.
- `POST /api/projects/{projectId}/members`: Adds members by list of `userIds`.
- `DELETE /api/projects/{projectId}/members/{userId}`: Removes user from project membership.

### User Creation with Initial Projects
- `POST /api/users`: Accepts `AssignedProjectIds` array and creates memberships inside an atomic transaction.
- `POST /api/employeemanagement`: Accepts `AssignedProjectIds` array for enterprise tenant user provisioning.

---

## 6. Frontend Integration & Zoneless Architecture

### Strict Zoneless Compliance
- All state in components uses Angular Signals (`signal<T>()`, `computed()`).
- No direct usage of `NgZone`, `zone.run()`, or `markForCheck()`.

### Components
1. **`UsersComponent`** ([`users.component.ts`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/users/users.component.ts)):
   - Multi-select project assignment pills/checkboxes during employee registration.
2. **`ProjectDetailsComponent`** ([`project-details.component.ts`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/projects/project-details.component.ts)):
   - **`'members'` Tab**: Responsive cards displaying assigned team members with role badges.
   - **Add Member Modal**: Compliant with modal responsive rules (max-height 92vh, flex-col, overflow-y-auto min-h-0).
   - **Computed Permissions**:
     ```typescript
     readonly isProjectManager = computed(() => this.currentUserRole().toLowerCase() === 'manager');
     readonly canManageMembers = computed(() => this.isTenantOwner() || this.isProjectManager());
     ```
