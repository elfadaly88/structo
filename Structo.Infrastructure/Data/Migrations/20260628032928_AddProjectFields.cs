using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Budget",
                table: "Projects",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Projects",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Projects",
                type: "character varying(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublicPortfolio",
                table: "Projects",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSystemGenerated",
                table: "FinancialTransactions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SourceType",
                table: "FinancialTransactions",
                type: "character varying(30)",
                maxLength: 30,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsPublicPortfolio",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsSystemGenerated",
                table: "FinancialTransactions");

            migrationBuilder.DropColumn(
                name: "SourceType",
                table: "FinancialTransactions");
        }
    }
}
