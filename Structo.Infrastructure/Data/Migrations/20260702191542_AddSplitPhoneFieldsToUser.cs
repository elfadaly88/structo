using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSplitPhoneFieldsToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactPhone",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WhatsAppPhone",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPhone",
                table: "Tenants",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WhatsAppPhone",
                table: "Tenants",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactPhone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WhatsAppPhone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContactPhone",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "WhatsAppPhone",
                table: "Tenants");
        }
    }
}
