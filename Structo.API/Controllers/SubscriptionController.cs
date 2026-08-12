using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/subscription")]
[Authorize(Roles = "TenantOwner")]
public class SubscriptionController(StructoDbContext context) : ControllerBase
{
    // ─────────────────────────────────────────────────────────
    // Pricing Table (EGP, 0% VAT)
    // Base Free plan = 2 projects lifetime (automatic upon signup)
    // Additive Top-Ups: +1 Project = 250 EGP | +5 Projects = 950 EGP
    // ─────────────────────────────────────────────────────────
    private static readonly decimal VatRate = 0.0m;

    private static readonly Dictionary<int, decimal> TopUpPricing = new()
    {
        { 1, 250m },
        { 5, 950m },
    };

    // ─────────────────────────────────────────────────────────
    // POST /api/subscription/upgrade-mock (Additive Quota Addition)
    // ─────────────────────────────────────────────────────────
    [HttpPost("upgrade-mock")]
    public async Task<ActionResult<ApiResponse<SubscriptionUpgradeResponseDto>>> UpgradeMock(
        [FromBody] SubscriptionUpgradeRequestDto dto)
    {
        // Resolve TenantId from JWT
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
        if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
            return Unauthorized(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "Tenant ID missing from claims" });

        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
        if (tenant == null)
            return NotFound(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "Tenant not found" });

        // Ensure base quota is at least 2
        if (tenant.MaxActiveProjects <= 0)
            tenant.MaxActiveProjects = 2;

        // Determine Additive Projects Count (+1 or +5)
        int extra = dto.ExtraProjectsCount ?? 1;
        if (dto.ExtraProjectsCount == null && !string.IsNullOrWhiteSpace(dto.TargetPlanId))
        {
            var target = dto.TargetPlanId.Trim().ToLower();
            extra = (target.Contains("5") || target.Contains("enterprise")) ? 5 : 1;
        }

        if (extra != 1 && extra != 5)
            extra = 1;

        decimal amount = extra == 5 ? 950m : 250m;
        string transactionType = "AddOnTopUp";
        string planName = $"+{extra} Projects";

        // Additive Addition: new projects are added directly on top of tenant's current active quota
        int newMaxProjects = tenant.MaxActiveProjects + extra;
        tenant.MaxActiveProjects = newMaxProjects;

        var taxAmount   = 0.0m;
        var totalAmount = amount;
        var refNumber   = $"TXN-TEST-{System.Security.Cryptography.RandomNumberGenerator.GetInt32(100000, 1000000)}";

        var txn = new SubscriptionTransaction
        {
            TenantId             = tenantId,
            TransactionType      = transactionType,
            PlanName             = planName,
            ExtraProjectsAdded   = extra,
            ResultingMaxProjects = newMaxProjects,
            Amount               = amount,
            TaxAmount            = taxAmount,
            TotalAmount          = totalAmount,
            PaymentGateway       = "MockGateway",
            PaymentMethod        = dto.PaymentMethod ?? "TestCard",
            Status               = "Paid",
            ReferenceNumber      = refNumber,
            CreatedAt            = DateTime.UtcNow
        };

        context.SubscriptionTransactions.Add(txn);
        await context.SaveChangesAsync();

        var response = new SubscriptionUpgradeResponseDto
        {
            TransactionType      = transactionType,
            NewPlan              = tenant.SubscriptionPlan.ToString(),
            NewMaxActiveProjects = newMaxProjects,
            ExtraProjectsAdded   = extra,
            Amount               = amount,
            TaxAmount            = taxAmount,
            TotalAmount          = totalAmount,
            ReferenceNumber      = refNumber,
            Status               = "Paid"
        };

        return Ok(new ApiResponse<SubscriptionUpgradeResponseDto>
        {
            Success = true,
            Message = $"تم إضافة {extra} مشاريع إضافية بنجاح! رصيدك الجديد: {newMaxProjects} مشاريع. الرقم المرجعي: {refNumber}",
            Data = response
        });
    }

    // ─────────────────────────────────────────────────────────
    // GET /api/subscription/plans  — returns available additive top-up packages
    // ─────────────────────────────────────────────────────────
    [HttpGet("plans")]
    public ActionResult<ApiResponse<object>> GetPlans()
    {
        var topups = new[]
        {
            new { extra = 1, priceEgp = 250m, priceWithVat = 250m, label = "📦 إضافة مشروع واحد (+1 Project)", description = "إضافة مشروع واحد إضافي لرصيدك الحالي (Adds +1 project to your active quota)", isBestValue = false },
            new { extra = 5, priceEgp = 950m, priceWithVat = 950m, label = "🚀 حزمة 5 مشاريع (+5 Projects Package)", description = "إضافة 5 مشاريع إضافية لرصيدك الحالي (Adds +5 projects to your active quota)", isBestValue = true }
        };

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Data = new { topups, plans = topups, vatRate = 0.0m }
        });
    }

    // ─────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────
    private static int GetPlanOrder(string planName) => planName?.ToLower() switch
    {
        "free"       => 0,
        "standard"   => 1,
        "pro"        => 2,
        "premium"    => 3,
        "enterprise" => 4,
        _            => -1
    };
}
