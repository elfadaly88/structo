using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Structo.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentAttempts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentAttempts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PlanRequested = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExtraProjectsCount = table.Column<int>(type: "integer", nullable: false),
                    PaymobOrderId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    SpecialReference = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    WebhookReceivedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    WebhookStatus = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    LinkedTransactionId = table.Column<Guid>(type: "uuid", nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentAttempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentAttempts_SubscriptionTransactions_LinkedTransactionId",
                        column: x => x.LinkedTransactionId,
                        principalTable: "SubscriptionTransactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PaymentAttempts_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PaymentAttempts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_CreatedAt",
                table: "PaymentAttempts",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_LinkedTransactionId",
                table: "PaymentAttempts",
                column: "LinkedTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_PaymobOrderId",
                table: "PaymentAttempts",
                column: "PaymobOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_SpecialReference",
                table: "PaymentAttempts",
                column: "SpecialReference");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_TenantId",
                table: "PaymentAttempts",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_UserId",
                table: "PaymentAttempts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentAttempts_WebhookStatus",
                table: "PaymentAttempts",
                column: "WebhookStatus");

            // One-time historical backfill for Order 594308791 (250 EGP) linked strictly to confirmed Tenant 1c12b0cf-8505-4d0a-8d55-617daf3f30a2 / User fd1f8821-d7ff-4627-ac7a-2144f4382bf8
            migrationBuilder.Sql(@"
                INSERT INTO ""PaymentAttempts"" (
                    ""Id"", ""TenantId"", ""UserId"", ""Amount"", ""PlanRequested"", 
                    ""ExtraProjectsCount"", ""PaymobOrderId"", ""SpecialReference"", 
                    ""CreatedAt"", ""WebhookReceivedAt"", ""WebhookStatus"", ""ErrorMessage""
                )
                SELECT 
                    gen_random_uuid(),
                    '1c12b0cf-8505-4d0a-8d55-617daf3f30a2'::uuid,
                    'fd1f8821-d7ff-4627-ac7a-2144f4382bf8'::uuid,
                    250.00,
                    '+1 Projects (Pro Top-Up)',
                    1,
                    '594308791',
                    'SUB_1c12b0cf85054d0a8d55617daf3f30a2_594308791',
                    NOW() - INTERVAL '6 hours',
                    NULL,
                    'NeverArrived',
                    'Paymob webhook callback never reached server (Order ID 594308791)'
                WHERE NOT EXISTS (
                    SELECT 1 FROM ""PaymentAttempts"" pa WHERE pa.""PaymobOrderId"" = '594308791'
                );
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentAttempts");
        }
    }
}
