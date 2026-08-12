using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsAuditedToFinancialTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAudited",
                table: "FinancialTransactions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsClosed",
                table: "FinancialTransactions",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAudited",
                table: "FinancialTransactions");

            migrationBuilder.DropColumn(
                name: "IsClosed",
                table: "FinancialTransactions");
        }
    }
}
