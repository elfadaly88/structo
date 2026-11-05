using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymobAttemptOrderBinding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PaymentAttempts_PaymobOrderId",
                table: "PaymentAttempts");

            migrationBuilder.AddColumn<long>(
                name: "AmountCents",
                table: "PaymentAttempts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "PackageType",
                table: "PaymentAttempts",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            // Older attempts stored our merchant reference (SUB_...) here, not Paymob's numeric order id; the same value
            // is kept in SpecialReference. Clear those, and keep only the newest attempt per numeric id, so the unique index can be created.
            migrationBuilder.Sql(@"
                UPDATE ""PaymentAttempts"" SET ""PaymobOrderId"" = NULL
                WHERE ""PaymobOrderId"" IS NOT NULL AND ""PaymobOrderId"" !~ '^[0-9]+$';

                UPDATE ""PaymentAttempts"" p SET ""PaymobOrderId"" = NULL
                WHERE p.""PaymobOrderId"" IS NOT NULL AND EXISTS (
                    SELECT 1 FROM ""PaymentAttempts"" q
                    WHERE q.""PaymobOrderId"" = p.""PaymobOrderId""
                      AND (q.""CreatedAt"" > p.""CreatedAt"" OR (q.""CreatedAt"" = p.""CreatedAt"" AND q.""Id"" > p.""Id"")));
            ");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_PaymobOrderId",
                table: "PaymentAttempts",
                column: "PaymobOrderId",
                unique: true,
                filter: "\"PaymobOrderId\" IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PaymentAttempts_PaymobOrderId",
                table: "PaymentAttempts");

            migrationBuilder.DropColumn(
                name: "AmountCents",
                table: "PaymentAttempts");

            migrationBuilder.DropColumn(
                name: "PackageType",
                table: "PaymentAttempts");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_PaymobOrderId",
                table: "PaymentAttempts",
                column: "PaymobOrderId");
        }
    }
}
