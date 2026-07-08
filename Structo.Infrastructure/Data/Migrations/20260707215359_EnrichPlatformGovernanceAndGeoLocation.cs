using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EnrichPlatformGovernanceAndGeoLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Users",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Users",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManualAddress",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MapLocationUrl",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Tenants",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Tenants",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManualAddress",
                table: "Tenants",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MapLocationUrl",
                table: "Tenants",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ManualAddress",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MapLocationUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ManualAddress",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "MapLocationUrl",
                table: "Tenants");
        }
    }
}
