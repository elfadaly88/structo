# Project Profile: Structo

## Overview
Structo is a Multi-Tenant SaaS platform designed for interior design offices, contracting companies, and freelancers to manage project execution, daily site tasks, and strictly separate project financial flows (Income, Expenses, and Engineer Petty Cash). It also functions as a public verified directory where clients can find verified companies based on real, verified reviews.

## Tech Stack
- **Backend:** .NET 8 Web API (C#)
- **Database:** PostgreSQL (Multi-tenant architecture via `TenantId` column isolation)
- **Frontend:** Responsive Web Application (Angular or React - SPA)

## Core Architectural & Business Rules
1. **Multi-Tenancy:** Every table (except `Tenants`) MUST include a `TenantId` column. All queries must filter by the current logged-in `TenantId`.
2. **Subscription Constraints:** Project creation must validate against the Tenant's `MaxActiveProjects` limit.
3. **Database Integrity:** - Primary Keys: Use `Guid` or `int` consistently.
   - Financial Amounts: Always use `decimal` type.
   - Timestamps: Always use `DateTime` (with UTC preference if needed).
4. **Roles and Permissions (RBAC):**
   - `Owner`: Full access + billing.
   - `Manager`: Full access to projects/finances.
   - `Accountant`: Access to finance, receipts, petty cash only.
   - `SiteEngineer`: Access to site progress, daily photos, request petty cash.
   - `DesignEngineer`: Access to designs and client approvals.

## Folder & Solution Structure Preference
- Clean Architecture or Standard N-Tier (API, Core/Domain, Infrastructure/Data).
- Use Entity Framework Core (EF Core) as the ORM with Code-First Migrations.