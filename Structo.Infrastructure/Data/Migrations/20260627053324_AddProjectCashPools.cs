using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectCashPools : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SourcePoolId",
                table: "PettyCashes",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectCashPools",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceType = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    TotalInjected = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    AvailableBalance = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCashPools", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectCashPools_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectCashPools_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PettyCashes_SourcePoolId",
                table: "PettyCashes",
                column: "SourcePoolId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCashPools_ProjectId",
                table: "ProjectCashPools",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCashPools_TenantId",
                table: "ProjectCashPools",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_PettyCashes_ProjectCashPools_SourcePoolId",
                table: "PettyCashes",
                column: "SourcePoolId",
                principalTable: "ProjectCashPools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PettyCashes_ProjectCashPools_SourcePoolId",
                table: "PettyCashes");

            migrationBuilder.DropTable(
                name: "ProjectCashPools");

            migrationBuilder.DropIndex(
                name: "IX_PettyCashes_SourcePoolId",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "SourcePoolId",
                table: "PettyCashes");
        }
    }
}
