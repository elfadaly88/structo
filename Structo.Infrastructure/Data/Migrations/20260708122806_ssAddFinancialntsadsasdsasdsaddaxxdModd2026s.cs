using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ssAddFinancialntsadsasdsasdsaddaxxdModd2026s : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "InvoiceUrl",
                table: "SettlementLines",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "SettlementLines",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.Sql("UPDATE \"SettlementLines\" SET \"TenantId\" = s.\"TenantId\" FROM \"Settlements\" s WHERE \"SettlementLines\".\"SettlementId\" = s.\"Id\";");

            migrationBuilder.CreateIndex(
                name: "IX_SettlementLines_TenantId",
                table: "SettlementLines",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_SettlementLines_Tenants_TenantId",
                table: "SettlementLines",
                column: "TenantId",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SettlementLines_Tenants_TenantId",
                table: "SettlementLines");

            migrationBuilder.DropIndex(
                name: "IX_SettlementLines_TenantId",
                table: "SettlementLines");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "SettlementLines");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceUrl",
                table: "SettlementLines",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000,
                oldNullable: true);
        }
    }
}
