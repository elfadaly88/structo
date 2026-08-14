using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class OptimizePerformanceIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Settlements_ProjectId",
                table: "Settlements");

            migrationBuilder.DropIndex(
                name: "IX_ProjectCashPools_ProjectId",
                table: "ProjectCashPools");

            migrationBuilder.Sql(@"ALTER TABLE ""SitePhotos"" ADD COLUMN IF NOT EXISTS ""Category"" character varying(50) NOT NULL DEFAULT 'SiteProgress';");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_Project_Status",
                table: "Settlements",
                columns: new[] { "ProjectId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCashPool_Project_SourceType",
                table: "ProjectCashPools",
                columns: new[] { "ProjectId", "SourceType" });

            migrationBuilder.CreateIndex(
                name: "IX_PettyCash_Project_Status_Pool",
                table: "PettyCashes",
                columns: new[] { "ProjectId", "Status", "SourcePoolId" });

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactions_Project_Type_Date",
                table: "FinancialTransactions",
                columns: new[] { "ProjectId", "Type", "TransactionDate" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Settlements_Project_Status",
                table: "Settlements");

            migrationBuilder.DropIndex(
                name: "IX_ProjectCashPool_Project_SourceType",
                table: "ProjectCashPools");

            migrationBuilder.DropIndex(
                name: "IX_PettyCash_Project_Status_Pool",
                table: "PettyCashes");

            migrationBuilder.DropIndex(
                name: "IX_FinancialTransactions_Project_Type_Date",
                table: "FinancialTransactions");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "SitePhotos");

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_ProjectId",
                table: "Settlements",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCashPools_ProjectId",
                table: "ProjectCashPools",
                column: "ProjectId");
        }
    }
}
