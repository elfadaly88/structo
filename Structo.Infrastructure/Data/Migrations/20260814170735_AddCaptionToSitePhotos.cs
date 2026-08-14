using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCaptionToSitePhotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SitePhotos");

            migrationBuilder.AddColumn<bool>(
                name: "IsCleanupExempt",
                table: "Tenants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActiveAt",
                table: "Tenants",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Caption",
                table: "SitePhotos",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCleanupExempt",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "LastActiveAt",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "Caption",
                table: "SitePhotos");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SitePhotos",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }
    }
}
