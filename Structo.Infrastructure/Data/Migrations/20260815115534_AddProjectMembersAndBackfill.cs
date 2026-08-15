using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectMembersAndBackfill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectMembers",
                columns: table => new
                {
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AssignedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMembers", x => new { x.ProjectId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ProjectMembers_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectMembers_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_TenantId",
                table: "ProjectMembers",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_UserId",
                table: "ProjectMembers",
                column: "UserId");

            // --- 1. Migrate Existing ManagerId on Projects to ProjectMembers ---
            migrationBuilder.Sql(@"
                INSERT INTO ""ProjectMembers"" (""ProjectId"", ""UserId"", ""AssignedAt"", ""TenantId"")
                SELECT ""Id"", ""ManagerId"", NOW(), ""TenantId""
                FROM ""Projects""
                WHERE ""ManagerId"" IS NOT NULL
                ON CONFLICT (""ProjectId"", ""UserId"") DO NOTHING;
            ");

            // --- 2. Temporary Backfill for Test/Dev Users to Ensure Zero Workflow Disruption ---
            // Assign existing tenant employees (Manager, Accountant, SiteEngineer, DesignEngineer) to all active projects in their tenant
            migrationBuilder.Sql(@"
                INSERT INTO ""ProjectMembers"" (""ProjectId"", ""UserId"", ""AssignedAt"", ""TenantId"")
                SELECT p.""Id"", u.""Id"", NOW(), p.""TenantId""
                FROM ""Projects"" p
                JOIN ""Users"" u ON u.""TenantId"" = p.""TenantId""
                WHERE u.""Role"" NOT IN ('SuperAdmin', 'TenantOwner')
                ON CONFLICT (""ProjectId"", ""UserId"") DO NOTHING;
            ");

        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectMembers");
        }
    }
}
