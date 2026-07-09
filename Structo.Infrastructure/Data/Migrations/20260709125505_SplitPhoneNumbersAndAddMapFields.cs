using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SplitPhoneNumbersAndAddMapFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "Tenants");

            migrationBuilder.RenameColumn(
                name: "ContactPhone",
                table: "Users",
                newName: "PersonalPhone");

            migrationBuilder.RenameColumn(
                name: "ContactPhone",
                table: "Tenants",
                newName: "PersonalPhone");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PersonalPhone",
                table: "Users",
                newName: "ContactPhone");

            migrationBuilder.RenameColumn(
                name: "PersonalPhone",
                table: "Tenants",
                newName: "ContactPhone");

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "Tenants",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
