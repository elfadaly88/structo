using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDailySiteLogsAndPunchList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SiteDailyLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    LogDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LoggedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    WeatherCondition = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    WorkforceCount = table.Column<int>(type: "integer", nullable: false),
                    WorkforceSummary = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MaterialsDelivered = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    GeneralObservations = table.Column<string>(type: "character varying(3000)", maxLength: 3000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteDailyLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteDailyLogs_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SitePunchItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    SiteTaskId = table.Column<Guid>(type: "uuid", nullable: true),
                    Title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Severity = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    SubcontractorName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    DefectPhotoUrl = table.Column<string>(type: "character varying(1500)", maxLength: 1500, nullable: false),
                    ResolutionPhotoUrl = table.Column<string>(type: "character varying(1500)", maxLength: 1500, nullable: true),
                    EngineerNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SitePunchItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SitePunchItems_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SitePunchItems_SiteTasks_SiteTaskId",
                        column: x => x.SiteTaskId,
                        principalTable: "SiteTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SiteDailyLogs_LogDate",
                table: "SiteDailyLogs",
                column: "LogDate");

            migrationBuilder.CreateIndex(
                name: "IX_SiteDailyLogs_ProjectId",
                table: "SiteDailyLogs",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteDailyLogs_TenantId",
                table: "SiteDailyLogs",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteDailyLogs_TenantId_ProjectId_LogDate",
                table: "SiteDailyLogs",
                columns: new[] { "TenantId", "ProjectId", "LogDate" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SitePunchItems_ProjectId",
                table: "SitePunchItems",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SitePunchItems_SiteTaskId",
                table: "SitePunchItems",
                column: "SiteTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_SitePunchItems_Status",
                table: "SitePunchItems",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SitePunchItems_TenantId",
                table: "SitePunchItems",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteDailyLogs");

            migrationBuilder.DropTable(
                name: "SitePunchItems");
        }
    }
}
