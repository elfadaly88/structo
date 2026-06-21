using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendPettyCashFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PettyCashes",
                type: "text",
                nullable: false,
                defaultValue: "Pending");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "PettyCashes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Urgency",
                table: "PettyCashes",
                type: "text",
                nullable: false,
                defaultValue: "Medium");

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "PettyCashes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "SpentAmount",
                table: "PettyCashes",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ReturnAmount",
                table: "PettyCashes",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ReceiptPhotoUrl",
                table: "PettyCashes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "Urgency",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "Comments",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "SpentAmount",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "ReturnAmount",
                table: "PettyCashes");

            migrationBuilder.DropColumn(
                name: "ReceiptPhotoUrl",
                table: "PettyCashes");
        }
    }
}
