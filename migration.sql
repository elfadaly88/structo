CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;
CREATE TABLE "Tenants" (
    "Id" uuid NOT NULL,
    "Name" character varying(150) NOT NULL,
    "MaxActiveProjects" integer NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Tenants" PRIMARY KEY ("Id")
);

CREATE TABLE "Users" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "FirstName" character varying(50) NOT NULL,
    "LastName" character varying(50) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "PasswordHash" character varying(256) NOT NULL,
    "Role" character varying(30) NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Users_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "Projects" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "Name" character varying(200) NOT NULL,
    "Description" character varying(1000) NOT NULL,
    "StartDate" timestamp with time zone NOT NULL,
    "EndDate" timestamp with time zone,
    "IsActive" boolean NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    "ManagerId" uuid,
    CONSTRAINT "PK_Projects" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Projects_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Projects_Users_ManagerId" FOREIGN KEY ("ManagerId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);

CREATE TABLE "FinancialTransactions" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "Amount" numeric(18,2) NOT NULL,
    "Description" character varying(500) NOT NULL,
    "Type" character varying(30) NOT NULL,
    "TransactionDate" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_FinancialTransactions" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_FinancialTransactions_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_FinancialTransactions_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "PettyCashes" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "IssuedToUserId" uuid NOT NULL,
    "Amount" numeric(18,2) NOT NULL,
    "Reason" character varying(500) NOT NULL,
    "IssuedAt" timestamp with time zone NOT NULL,
    "IsSettled" boolean NOT NULL,
    CONSTRAINT "PK_PettyCashes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PettyCashes_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_PettyCashes_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_PettyCashes_Users_IssuedToUserId" FOREIGN KEY ("IssuedToUserId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "SitePhotos" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "UploadedByUserId" uuid NOT NULL,
    "PhotoUrl" character varying(1000) NOT NULL,
    "Description" character varying(500) NOT NULL,
    "UploadedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_SitePhotos" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SitePhotos_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_SitePhotos_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_SitePhotos_Users_UploadedByUserId" FOREIGN KEY ("UploadedByUserId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE INDEX "IX_FinancialTransactions_ProjectId" ON "FinancialTransactions" ("ProjectId");

CREATE INDEX "IX_FinancialTransactions_TenantId" ON "FinancialTransactions" ("TenantId");

CREATE INDEX "IX_PettyCashes_IssuedToUserId" ON "PettyCashes" ("IssuedToUserId");

CREATE INDEX "IX_PettyCashes_ProjectId" ON "PettyCashes" ("ProjectId");

CREATE INDEX "IX_PettyCashes_TenantId" ON "PettyCashes" ("TenantId");

CREATE INDEX "IX_Projects_ManagerId" ON "Projects" ("ManagerId");

CREATE INDEX "IX_Projects_TenantId" ON "Projects" ("TenantId");

CREATE INDEX "IX_SitePhotos_ProjectId" ON "SitePhotos" ("ProjectId");

CREATE INDEX "IX_SitePhotos_TenantId" ON "SitePhotos" ("TenantId");

CREATE INDEX "IX_SitePhotos_UploadedByUserId" ON "SitePhotos" ("UploadedByUserId");

CREATE INDEX "IX_Users_TenantId" ON "Users" ("TenantId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260621002700_InitialCreate', '9.0.0');

ALTER TABLE "Tenants" ADD "SubscriptionPlan" character varying(30) NOT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260621011726_AddSubscriptionPlanToTenant', '9.0.0');

ALTER TABLE "Users" ALTER COLUMN "TenantId" DROP NOT NULL;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260621015815_AddIdentityAndSecurity', '9.0.0');

ALTER TABLE "Tenants" ADD "LogoUrl" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "BannerUrl" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "Region" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "CompanyDescription" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "Rating" double precision NOT NULL DEFAULT 0.0;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260622000000_AddTenantProfileFields', '9.0.0');

ALTER TABLE "PettyCashes" ADD "Status" text NOT NULL DEFAULT 'Pending';

ALTER TABLE "PettyCashes" ADD "Category" text NOT NULL DEFAULT '';

ALTER TABLE "PettyCashes" ADD "Urgency" text NOT NULL DEFAULT 'Medium';

ALTER TABLE "PettyCashes" ADD "Comments" text NOT NULL DEFAULT '';

ALTER TABLE "PettyCashes" ADD "SpentAmount" numeric(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE "PettyCashes" ADD "ReturnAmount" numeric(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE "PettyCashes" ADD "ReceiptPhotoUrl" text NOT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260622010000_ExtendPettyCashFields', '9.0.0');

ALTER TABLE "Tenants" ADD "Status" character varying(30) NOT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627020526_AddTenantStatusColumn', '9.0.0');

ALTER TABLE "PettyCashes" ADD "SourcePoolId" uuid;

CREATE TABLE "ProjectCashPools" (
    "Id" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "SourceType" character varying(30) NOT NULL,
    "TotalInjected" numeric(18,2) NOT NULL,
    "AvailableBalance" numeric(18,2) NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_ProjectCashPools" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProjectCashPools_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProjectCashPools_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT
);

CREATE INDEX "IX_PettyCashes_SourcePoolId" ON "PettyCashes" ("SourcePoolId");

CREATE INDEX "IX_ProjectCashPools_ProjectId" ON "ProjectCashPools" ("ProjectId");

CREATE INDEX "IX_ProjectCashPools_TenantId" ON "ProjectCashPools" ("TenantId");

ALTER TABLE "PettyCashes" ADD CONSTRAINT "FK_PettyCashes_ProjectCashPools_SourcePoolId" FOREIGN KEY ("SourcePoolId") REFERENCES "ProjectCashPools" ("Id") ON DELETE RESTRICT;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627053324_AddProjectCashPools', '9.0.0');

ALTER TABLE "FinancialTransactions" ADD "PaymentDate" timestamp with time zone NOT NULL DEFAULT TIMESTAMPTZ '-infinity';

ALTER TABLE "FinancialTransactions" ADD "PaymentMethod" integer;

ALTER TABLE "FinancialTransactions" ADD "ReceiptPhotoUrl" text;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627054300_AddTransactionMetadata', '9.0.0');

ALTER TABLE "PettyCashes" ADD "SettlementPaymentMethod" integer;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627123730_AddSettlementPaymentMethod', '9.0.0');

ALTER TABLE "PettyCashes" ADD "ExpenseDate" timestamp with time zone;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627153000_AddPettyCashExpenseDate', '9.0.0');

CREATE TABLE "ProjectBudgetLogs" (
    "Id" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "OldBudget" numeric(18,2) NOT NULL,
    "NewBudget" numeric(18,2) NOT NULL,
    "ReasonForChange" character varying(500) NOT NULL,
    "BoqFileUrl" character varying(1000) NOT NULL,
    "ChangedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_ProjectBudgetLogs" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ProjectBudgetLogs_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ProjectBudgetLogs_ProjectId" ON "ProjectBudgetLogs" ("ProjectId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260627192500_AddProjectBudgetLogs', '9.0.0');

ALTER TABLE "Projects" ADD "Budget" numeric(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE "Projects" ADD "Category" character varying(100);

ALTER TABLE "Projects" ADD "ClientName" character varying(150);

ALTER TABLE "Projects" ADD "IsPublicPortfolio" boolean NOT NULL DEFAULT FALSE;

ALTER TABLE "FinancialTransactions" ADD "IsSystemGenerated" boolean NOT NULL DEFAULT FALSE;

ALTER TABLE "FinancialTransactions" ADD "SourceType" character varying(30);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260628032928_AddProjectFields', '9.0.0');

CREATE TABLE "DataProtectionKeys" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "FriendlyName" text,
    "Xml" text,
    CONSTRAINT "PK_DataProtectionKeys" PRIMARY KEY ("Id")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260629072440_AddDataProtectionKeys', '9.0.0');

CREATE TABLE "Notifications" (
    "Id" uuid NOT NULL,
    "TenantId" uuid,
    "SenderId" uuid,
    "ReceiverId" uuid,
    "TargetRole" character varying(30),
    "Title" character varying(200) NOT NULL,
    "Message" character varying(1000) NOT NULL,
    "Type" character varying(30) NOT NULL,
    "DeepLink" character varying(500) NOT NULL,
    "IsRead" boolean NOT NULL,
    "ReadAt" timestamp with time zone,
    "CreatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Notifications" PRIMARY KEY ("Id")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260629094950_AddNotificationsTable', '9.0.0');

ALTER TABLE "Users" ADD "ContactPhone" text;

ALTER TABLE "Users" ADD "WhatsAppPhone" text;

ALTER TABLE "Tenants" ADD "ContactPhone" text;

ALTER TABLE "Tenants" ADD "WhatsAppPhone" text;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260702191542_AddSplitPhoneFieldsToUser', '9.0.0');

ALTER TABLE "Users" ADD "IsActive" boolean NOT NULL DEFAULT FALSE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260702214759_blockUsers', '9.0.0');

UPDATE "Users" SET "IsActive" = TRUE;

ALTER TABLE "Users" ALTER COLUMN "IsActive" TYPE boolean;
ALTER TABLE "Users" ALTER COLUMN "IsActive" SET DEFAULT TRUE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260703000000_AddUserIsActive', '9.0.0');

ALTER TABLE "FinancialTransactions" ADD "IsOverrun" boolean NOT NULL DEFAULT FALSE;

ALTER TABLE "FinancialTransactions" ADD "SettlementId" uuid;

CREATE TABLE "Settlements" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "ProjectId" uuid NOT NULL,
    "PettyCashId" uuid NOT NULL,
    "TotalAmount" numeric(18,2) NOT NULL,
    "Status" character varying(30) NOT NULL,
    "SubmittedAt" timestamp with time zone NOT NULL,
    "ResolvedAt" timestamp with time zone,
    "ResolvedByUserId" uuid,
    "NetDifference" numeric(18,2) NOT NULL,
    "Comments" character varying(500) NOT NULL,
    CONSTRAINT "PK_Settlements" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Settlements_PettyCashes_PettyCashId" FOREIGN KEY ("PettyCashId") REFERENCES "PettyCashes" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Settlements_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Settlements_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Settlements_Users_ResolvedByUserId" FOREIGN KEY ("ResolvedByUserId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "SettlementLines" (
    "Id" uuid NOT NULL,
    "SettlementId" uuid NOT NULL,
    "Category" character varying(100) NOT NULL,
    "Amount" numeric(18,2) NOT NULL,
    "Description" character varying(500) NOT NULL,
    "InvoiceUrl" character varying(1000) NOT NULL,
    CONSTRAINT "PK_SettlementLines" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SettlementLines_Settlements_SettlementId" FOREIGN KEY ("SettlementId") REFERENCES "Settlements" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_FinancialTransactions_SettlementId" ON "FinancialTransactions" ("SettlementId");

CREATE INDEX "IX_SettlementLines_SettlementId" ON "SettlementLines" ("SettlementId");

CREATE INDEX "IX_Settlements_PettyCashId" ON "Settlements" ("PettyCashId");

CREATE INDEX "IX_Settlements_ProjectId" ON "Settlements" ("ProjectId");

CREATE INDEX "IX_Settlements_ResolvedByUserId" ON "Settlements" ("ResolvedByUserId");

CREATE INDEX "IX_Settlements_TenantId" ON "Settlements" ("TenantId");

ALTER TABLE "FinancialTransactions" ADD CONSTRAINT "FK_FinancialTransactions_Settlements_SettlementId" FOREIGN KEY ("SettlementId") REFERENCES "Settlements" ("Id");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704192618_AddFinancialSettlementModule', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704200947_AddFinancialSettlementModules', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704203013_AddFinancialSettlementModuled', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704210214_AddFinancialSettlementModuleds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704214120_AddFinancialSettlementModds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260704222412_ssAddFinancialSettlementModds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705064657_ssAddFinancialntModds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705090809_ssAddFinancialntsadsadModds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705092328_ssAddFinancialntsadsasdadModds', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705100113_ssAddFinancialntsadsasdaasdsadsadModds', '9.0.0');

ALTER TABLE "Projects" ADD "ClientRating" integer;

ALTER TABLE "Projects" ADD "ClientReviewNotes" character varying(2000);

ALTER TABLE "Projects" ADD "PublicReviewToken" character varying(64);

ALTER TABLE "Projects" ADD "Status" character varying(30) NOT NULL DEFAULT '';

CREATE UNIQUE INDEX "IX_Projects_PublicReviewToken" ON "Projects" ("PublicReviewToken") WHERE "PublicReviewToken" IS NOT NULL;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705185410_AddProjectStatusAndReviewFields', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705193902_ssAddFinancialntsadsasdaxxdModds', '9.0.0');

ALTER TABLE "PettyCashes" ADD "IsReimbursement" boolean NOT NULL DEFAULT FALSE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260705205943_AddPettyCashIsReimbursement', '9.0.0');

ALTER TABLE "Users" ADD "NationalId" text;

ALTER TABLE "Users" ADD "SyndicateId" text;

ALTER TABLE "Tenants" ADD "AccountType" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "CommercialRegister" text;

ALTER TABLE "Tenants" ADD "Location" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "MobileNumber" text NOT NULL DEFAULT '';

ALTER TABLE "Tenants" ADD "TaxCard" text;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260706073421_AddTenantOnboardingFields', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260706220936_ssAddFinancialntsadsasdsdaxxdModds', '9.0.0');

UPDATE "Projects" SET "ClientName" = '' WHERE "ClientName" IS NULL;
ALTER TABLE "Projects" ALTER COLUMN "ClientName" SET NOT NULL;
ALTER TABLE "Projects" ALTER COLUMN "ClientName" SET DEFAULT '';

ALTER TABLE "Projects" ADD "CityOrZone" text NOT NULL DEFAULT '';

ALTER TABLE "Projects" ADD "ClientWhatsApp" text NOT NULL DEFAULT '';

ALTER TABLE "Projects" ADD "Governorate" text NOT NULL DEFAULT '';

ALTER TABLE "Projects" ADD "PropertyType" character varying(30) NOT NULL DEFAULT '';

ALTER TABLE "Projects" ADD "SiteAddress" text NOT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260707102148_EnrichProjectLocationAndClientMetadata', '9.0.0');

ALTER TABLE "Projects" ADD "IsReviewHidden" boolean NOT NULL DEFAULT FALSE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260707191232_EnrichProjectAndTenantGovernance', '9.0.0');

ALTER TABLE "Users" ADD "Latitude" double precision;

ALTER TABLE "Users" ADD "Longitude" double precision;

ALTER TABLE "Users" ADD "ManualAddress" text;

ALTER TABLE "Users" ADD "MapLocationUrl" text;

ALTER TABLE "Tenants" ADD "Latitude" double precision;

ALTER TABLE "Tenants" ADD "Longitude" double precision;

ALTER TABLE "Tenants" ADD "ManualAddress" text;

ALTER TABLE "Tenants" ADD "MapLocationUrl" text;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260707215359_EnrichPlatformGovernanceAndGeoLocation', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260708121746_ssAddFinancialntsadsasdsasdsaddaxxdModds', '9.0.0');

ALTER TABLE "SettlementLines" ALTER COLUMN "InvoiceUrl" DROP NOT NULL;

ALTER TABLE "SettlementLines" ADD "TenantId" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

UPDATE "SettlementLines" SET "TenantId" = s."TenantId" FROM "Settlements" s WHERE "SettlementLines"."SettlementId" = s."Id";

CREATE INDEX "IX_SettlementLines_TenantId" ON "SettlementLines" ("TenantId");

ALTER TABLE "SettlementLines" ADD CONSTRAINT "FK_SettlementLines_Tenants_TenantId" FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260708122806_ssAddFinancialntsadsasdsasdsaddaxxdModd2026s', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260708125705_AddTenantIdToSettlementLines', '9.0.0');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260708232221_22AddTenantIdToSettlementLines', '9.0.0');

ALTER TABLE "Tenants" DROP COLUMN "MobileNumber";

ALTER TABLE "Users" RENAME COLUMN "ContactPhone" TO "PersonalPhone";

ALTER TABLE "Tenants" RENAME COLUMN "ContactPhone" TO "PersonalPhone";

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260709125505_SplitPhoneNumbersAndAddMapFields', '9.0.0');

ALTER TABLE "Users" ADD "IsApproved" boolean NOT NULL DEFAULT TRUE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260715220300_AddUserApprovalStatus', '9.0.0');

ALTER TABLE "Users" ADD "RefreshToken" text;

ALTER TABLE "Users" ADD "RefreshTokenExpiryTime" timestamp with time zone;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260717231321_AddRefreshToken', '9.0.0');

COMMIT;

