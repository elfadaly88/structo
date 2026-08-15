using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectIdAndFanOutNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Create a safe, permanent DB snapshot backup table of Notifications before any fan-out/deletion
            migrationBuilder.Sql(@"
                CREATE TABLE IF NOT EXISTS ""Notifications_Backup_20260815"" AS SELECT * FROM ""Notifications"";
            ");

            // 2. Add ProjectId column to Notifications
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Notifications",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ProjectId",
                table: "Notifications",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ReceiverId",
                table: "Notifications",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Projects_ProjectId",
                table: "Notifications",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            // 3. Fan-out existing tenant role-broadcast notifications to per-user records
            migrationBuilder.Sql(@"
                INSERT INTO ""Notifications"" (""Id"", ""TenantId"", ""SenderId"", ""ReceiverId"", ""ProjectId"", ""TargetRole"", ""Title"", ""Message"", ""Type"", ""DeepLink"", ""IsRead"", ""ReadAt"", ""CreatedAt"")
                SELECT gen_random_uuid(), n.""TenantId"", n.""SenderId"", u.""Id"", n.""ProjectId"", n.""TargetRole"", n.""Title"", n.""Message"", n.""Type"", n.""DeepLink"", n.""IsRead"", n.""ReadAt"", n.""CreatedAt""
                FROM ""Notifications"" n
                JOIN ""Users"" u ON u.""TenantId"" = n.""TenantId"" AND u.""Role""::text = n.""TargetRole""::text
                WHERE n.""ReceiverId"" IS NULL AND n.""TenantId"" IS NOT NULL AND n.""TargetRole"" IS NOT NULL;
            ");

            // 4. Fan-out SuperAdmin global notifications to individual SuperAdmin users
            migrationBuilder.Sql(@"
                INSERT INTO ""Notifications"" (""Id"", ""TenantId"", ""SenderId"", ""ReceiverId"", ""ProjectId"", ""TargetRole"", ""Title"", ""Message"", ""Type"", ""DeepLink"", ""IsRead"", ""ReadAt"", ""CreatedAt"")
                SELECT gen_random_uuid(), n.""TenantId"", n.""SenderId"", u.""Id"", n.""ProjectId"", n.""TargetRole"", n.""Title"", n.""Message"", n.""Type"", n.""DeepLink"", n.""IsRead"", n.""ReadAt"", n.""CreatedAt""
                FROM ""Notifications"" n
                CROSS JOIN ""Users"" u
                WHERE n.""ReceiverId"" IS NULL AND u.""Role""::text = 'SuperAdmin' AND (n.""TargetRole""::text = 'SuperAdmin' OR n.""TenantId"" IS NULL);
            ");

            // 5. Safely delete historical broadcast records now that they have been cleanly migrated to discrete user rows
            migrationBuilder.Sql(@"
                DELETE FROM ""Notifications"" WHERE ""ReceiverId"" IS NULL;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Projects_ProjectId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ProjectId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ReceiverId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Notifications");
        }
    }
}
