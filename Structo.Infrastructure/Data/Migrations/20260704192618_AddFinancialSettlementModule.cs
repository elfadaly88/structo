using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFinancialSettlementModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOverrun",
                table: "FinancialTransactions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "SettlementId",
                table: "FinancialTransactions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Settlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    PettyCashId = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ResolvedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    NetDifference = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Comments = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Settlements_PettyCashes_PettyCashId",
                        column: x => x.PettyCashId,
                        principalTable: "PettyCashes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Settlements_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Settlements_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Settlements_Users_ResolvedByUserId",
                        column: x => x.ResolvedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SettlementLines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SettlementId = table.Column<Guid>(type: "uuid", nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    InvoiceUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettlementLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SettlementLines_Settlements_SettlementId",
                        column: x => x.SettlementId,
                        principalTable: "Settlements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactions_SettlementId",
                table: "FinancialTransactions",
                column: "SettlementId");

            migrationBuilder.CreateIndex(
                name: "IX_SettlementLines_SettlementId",
                table: "SettlementLines",
                column: "SettlementId");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_PettyCashId",
                table: "Settlements",
                column: "PettyCashId");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_ProjectId",
                table: "Settlements",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_ResolvedByUserId",
                table: "Settlements",
                column: "ResolvedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_TenantId",
                table: "Settlements",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_FinancialTransactions_Settlements_SettlementId",
                table: "FinancialTransactions",
                column: "SettlementId",
                principalTable: "Settlements",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FinancialTransactions_Settlements_SettlementId",
                table: "FinancialTransactions");

            migrationBuilder.DropTable(
                name: "SettlementLines");

            migrationBuilder.DropTable(
                name: "Settlements");

            migrationBuilder.DropIndex(
                name: "IX_FinancialTransactions_SettlementId",
                table: "FinancialTransactions");

            migrationBuilder.DropColumn(
                name: "IsOverrun",
                table: "FinancialTransactions");

            migrationBuilder.DropColumn(
                name: "SettlementId",
                table: "FinancialTransactions");
        }
    }
}
