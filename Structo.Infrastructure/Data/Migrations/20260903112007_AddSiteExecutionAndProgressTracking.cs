using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSiteExecutionAndProgressTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicShareToken",
                table: "Projects",
                type: "character varying(64)",
                maxLength: 64,
                nullable: true);

            // 🚀 Backfill existing projects with random UUID tokens before applying unique index
            migrationBuilder.Sql("UPDATE \"Projects\" SET \"PublicShareToken\" = gen_random_uuid() WHERE \"PublicShareToken\" IS NULL;");

            migrationBuilder.CreateTable(
                name: "SiteTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssignedEngineerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Weight = table.Column<decimal>(type: "numeric(18,4)", nullable: false, defaultValue: 1.0m),
                    ProgressPercentage = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    PlannedStartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    PlannedEndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    EngineerNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    AttachmentUrls = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteTasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SiteTasks_Users_AssignedEngineerId",
                        column: x => x.AssignedEngineerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SiteTaskSettlementItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    SiteTaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    SettlementItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    AllocatedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ExpenseDescription = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteTaskSettlementItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteTaskSettlementItems_SettlementLines_SettlementItemId",
                        column: x => x.SettlementItemId,
                        principalTable: "SettlementLines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SiteTaskSettlementItems_SiteTasks_SiteTaskId",
                        column: x => x.SiteTaskId,
                        principalTable: "SiteTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_PublicShareToken",
                table: "Projects",
                column: "PublicShareToken",
                unique: true,
                filter: "\"PublicShareToken\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTasks_AssignedEngineerId",
                table: "SiteTasks",
                column: "AssignedEngineerId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTasks_ProjectId",
                table: "SiteTasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTasks_Status",
                table: "SiteTasks",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTasks_TenantId",
                table: "SiteTasks",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTaskSettlementItems_SettlementItemId",
                table: "SiteTaskSettlementItems",
                column: "SettlementItemId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTaskSettlementItems_SiteTaskId",
                table: "SiteTaskSettlementItems",
                column: "SiteTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteTaskSettlementItems_TenantId",
                table: "SiteTaskSettlementItems",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteTaskSettlementItems");

            migrationBuilder.DropTable(
                name: "SiteTasks");

            migrationBuilder.DropIndex(
                name: "IX_Projects_PublicShareToken",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PublicShareToken",
                table: "Projects");
        }
    }
}
