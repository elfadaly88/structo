using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectBudgetLogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectBudgetLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    OldBudget = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    NewBudget = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ReasonForChange = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    BoqFileUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ChangedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectBudgetLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectBudgetLogs_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgetLogs_ProjectId",
                table: "ProjectBudgetLogs",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectBudgetLogs");
        }
    }
}
