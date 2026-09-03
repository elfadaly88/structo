-- ==============================================================================
-- 🚀 STRUCTO ONLINE MIGRATION SCRIPT
-- Applies PublicShareToken, SiteTasks, and SiteTaskSettlementItems
-- Run this directly in Railway Query Editor, Supabase SQL Editor, or pgAdmin
-- ==============================================================================

-- 1. Ensure PublicShareToken column exists on Projects table
ALTER TABLE "Projects" ADD COLUMN IF NOT EXISTS "PublicShareToken" character varying(64) NULL;

-- 2. Backfill existing projects with random tokens
UPDATE "Projects" 
SET "PublicShareToken" = gen_random_uuid()::text 
WHERE "PublicShareToken" IS NULL;

-- 3. Create Unique Index on PublicShareToken
CREATE UNIQUE INDEX IF NOT EXISTS "IX_Projects_PublicShareToken" 
ON "Projects" ("PublicShareToken") 
WHERE "PublicShareToken" IS NOT NULL;

-- 4. Create SiteTasks Table
CREATE TABLE IF NOT EXISTS "SiteTasks" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "AssignedEngineerId" uuid NOT NULL,
    "Title" character varying(250) NOT NULL,
    "Description" character varying(2000) NULL,
    "Weight" numeric(18,4) NOT NULL DEFAULT 1.0,
    "ProgressPercentage" integer NOT NULL DEFAULT 0,
    "Status" character varying(30) NOT NULL DEFAULT 'Pending',
    "PlannedStartDate" timestamp without time zone NULL,
    "PlannedEndDate" timestamp without time zone NULL,
    "CompletedAt" timestamp without time zone NULL,
    "EngineerNotes" character varying(2000) NULL,
    "AttachmentUrls" text[] NOT NULL DEFAULT '{}',
    CONSTRAINT "PK_SiteTasks" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SiteTasks_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_SiteTasks_Users_AssignedEngineerId" FOREIGN KEY ("AssignedEngineerId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS "IX_SiteTasks_AssignedEngineerId" ON "SiteTasks" ("AssignedEngineerId");
CREATE INDEX IF NOT EXISTS "IX_SiteTasks_ProjectId" ON "SiteTasks" ("ProjectId");
CREATE INDEX IF NOT EXISTS "IX_SiteTasks_Status" ON "SiteTasks" ("Status");
CREATE INDEX IF NOT EXISTS "IX_SiteTasks_TenantId" ON "SiteTasks" ("TenantId");

-- 5. Create SiteTaskSettlementItems Table
CREATE TABLE IF NOT EXISTS "SiteTaskSettlementItems" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "SiteTaskId" uuid NOT NULL,
    "SettlementItemId" uuid NOT NULL,
    "AllocatedAmount" numeric(18,2) NOT NULL,
    "ExpenseDescription" character varying(500) NULL,
    CONSTRAINT "PK_SiteTaskSettlementItems" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SiteTaskSettlementItems_SettlementLines_SettlementItemId" FOREIGN KEY ("SettlementItemId") REFERENCES "SettlementLines" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_SiteTaskSettlementItems_SiteTasks_SiteTaskId" FOREIGN KEY ("SiteTaskId") REFERENCES "SiteTasks" ("Id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IX_SiteTaskSettlementItems_SettlementItemId" ON "SiteTaskSettlementItems" ("SettlementItemId");
CREATE INDEX IF NOT EXISTS "IX_SiteTaskSettlementItems_SiteTaskId" ON "SiteTaskSettlementItems" ("SiteTaskId");
CREATE INDEX IF NOT EXISTS "IX_SiteTaskSettlementItems_TenantId" ON "SiteTaskSettlementItems" ("TenantId");

-- 6. Mark migrations as applied in EF Core history
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260825061720_AddPaymentAttempts', '9.0.0')
ON CONFLICT ("MigrationId") DO NOTHING;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260903112007_AddSiteExecutionAndProgressTracking', '9.0.0')
ON CONFLICT ("MigrationId") DO NOTHING;
