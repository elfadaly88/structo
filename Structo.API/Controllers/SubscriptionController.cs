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
    // Pricing Table (EGP, VAT-exclusive)
    // Free plan = 2 projects lifetime (no charge)
    // Add-On Top-Up packages (applied on top of current MaxActiveProjects)
    // ─────────────────────────────────────────────────────────
    private static readonly decimal VatRate = 0.14m;

    private static readonly Dictionary<string, (int MaxProjects, decimal PriceEgp)> PlanPricing = new()
    {
        { "Free",       (2,   0m)   },
        { "Pro",        (10,  299m) },
        { "Enterprise", (-1,  799m) }, // -1 = unlimited
    };

    // +1 → 250 EGP | +5 → 950 EGP
    private static readonly Dictionary<int, decimal> TopUpPricing = new()
    {
        { 1,  250m  },
        { 5,  950m  },
    };

    // ─────────────────────────────────────────────────────────
    // POST /api/subscription/upgrade-mock
    // Supports two modes:
    //   Mode 1 — Plan Upgrade:   supply TargetPlanId
    //   Mode 2 — Add-On Top-Up: supply ExtraProjectsCount (1, 2, or 5)
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

        // ── Determine Mode ──
        bool isAddOn = dto.ExtraProjectsCount.HasValue && dto.ExtraProjectsCount.Value > 0;
        bool isUpgrade = !isAddOn && !string.IsNullOrWhiteSpace(dto.TargetPlanId);

        if (!isAddOn && !isUpgrade)
            return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "يجب تحديد الباقة المستهدفة أو عدد المشاريع الإضافية" });

        string transactionType;
        string planName;
        int newMaxProjects;
        decimal amount;
        decimal extraAdded = 0;

        if (isAddOn)
        {
            // ── Mode 2: Add-On Top-Up ──
            var extra = dto.ExtraProjectsCount!.Value;
            if (!TopUpPricing.ContainsKey(extra))
                return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                    { Success = false, Message = "عدد المشاريع الإضافية يجب أن يكون 1 أو 5 مشاريع" });

            // Enterprise (unlimited) cannot purchase add-ons
            if (tenant.MaxActiveProjects == -1)
                return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                    { Success = false, Message = "باقة Enterprise تحتوي على مشاريع غير محدودة — لا حاجة لشراء إضافية" });

            amount = TopUpPricing[extra];
            transactionType = "AddOnTopUp";
            planName = tenant.SubscriptionPlan.ToString();
            extraAdded = extra;
            newMaxProjects = tenant.MaxActiveProjects + extra;
        }
        else
        {
            // ── Mode 1: Plan Upgrade ──
            var targetKey = dto.TargetPlanId!.Trim();

            // Normalize casing
            targetKey = PlanPricing.Keys
                .FirstOrDefault(k => k.Equals(targetKey, StringComparison.OrdinalIgnoreCase))
                ?? targetKey;

            if (!PlanPricing.TryGetValue(targetKey, out var planInfo))
                return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                    { Success = false, Message = $"الباقة '{dto.TargetPlanId}' غير معروفة. الباقات المتاحة: Free, Pro, Enterprise" });

            // Prevent downgrade via this endpoint (use Admin panel for that)
            var currentPlanOrder = GetPlanOrder(tenant.SubscriptionPlan.ToString());
            var targetPlanOrder  = GetPlanOrder(targetKey);
            if (targetPlanOrder <= currentPlanOrder)
                return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                    { Success = false, Message = "لا يمكن الرجوع لباقة أقل من خلال هذا الـ Endpoint" });

            amount = planInfo.PriceEgp;
            transactionType = "PlanUpgrade";
            planName = targetKey;
            newMaxProjects = planInfo.MaxProjects;

            // Parse and update SubscriptionPlan enum
            if (Enum.TryParse<SubscriptionPlan>(targetKey, ignoreCase: true, out var newPlan))
                tenant.SubscriptionPlan = newPlan;
            else
                return BadRequest(new ApiResponse<SubscriptionUpgradeResponseDto>
                    { Success = false, Message = "فشل في تحديد قيمة الباقة" });
        }

        // ── Apply MaxActiveProjects ──
        tenant.MaxActiveProjects = newMaxProjects;

        // ── Calculate VAT ──
        var taxAmount   = Math.Round(amount * VatRate, 2);
        var totalAmount = amount + taxAmount;

        // ── Build Reference Number ──
        var refNumber = $"TXN-TEST-{new Random().Next(100000, 999999)}";

        // ── Record Transaction ──
        var txn = new SubscriptionTransaction
        {
            TenantId           = tenantId,
            TransactionType    = transactionType,
            PlanName           = planName,
            ExtraProjectsAdded = isAddOn ? dto.ExtraProjectsCount!.Value : 0,
            ResultingMaxProjects = newMaxProjects,
            Amount             = amount,
            TaxAmount          = taxAmount,
            TotalAmount        = totalAmount,
            PaymentGateway     = "MockGateway",
            PaymentMethod      = dto.PaymentMethod ?? "TestCard",
            Status             = "Paid",
            ReferenceNumber    = refNumber,
            CreatedAt          = DateTime.UtcNow
        };

        context.SubscriptionTransactions.Add(txn);
        await context.SaveChangesAsync();

        var response = new SubscriptionUpgradeResponseDto
        {
            TransactionType      = transactionType,
            NewPlan              = tenant.SubscriptionPlan.ToString(),
            NewMaxActiveProjects = newMaxProjects,
            ExtraProjectsAdded   = isAddOn ? dto.ExtraProjectsCount!.Value : 0,
            Amount               = amount,
            TaxAmount            = taxAmount,
            TotalAmount          = totalAmount,
            ReferenceNumber      = refNumber,
            Status               = "Paid"
        };

        return Ok(new ApiResponse<SubscriptionUpgradeResponseDto>
        {
            Success = true,
            Message = isAddOn
                ? $"تم إضافة {dto.ExtraProjectsCount} مشاريع إضافية بنجاح! الرقم المرجعي: {refNumber}"
                : $"تم ترقية الاشتراك إلى {planName} بنجاح! الرقم المرجعي: {refNumber}",
            Data = response
        });
    }

    // ─────────────────────────────────────────────────────────
    // GET /api/subscription/plans  — returns available plans + pricing
    // ─────────────────────────────────────────────────────────
    [HttpGet("plans")]
    public ActionResult<ApiResponse<object>> GetPlans()
    {
        var plans = new[]
        {
            new { id = "Free",       nameAr = "المجانية",   nameEn = "Free",       maxProjects = 2,  priceEgp = 0m,   priceWithVat = 0m,                                    description = "2 مشاريع مدى الحياة — مجاني للأبد / 2 Lifetime Projects Free" },
            new { id = "Pro",        nameAr = "الاحترافية", nameEn = "Pro",        maxProjects = 10, priceEgp = 299m, priceWithVat = Math.Round(299m * 1.14m, 2), description = "10 مشاريع + الميزات المتقدمة / 10 Projects + Advanced Features" },
            new { id = "Enterprise", nameAr = "المؤسسية",   nameEn = "Enterprise", maxProjects = -1, priceEgp = 799m, priceWithVat = Math.Round(799m * 1.14m, 2), description = "مشاريع غير محدودة + الأولوية والدعم / Unlimited + Priority Support" },
        };

        var topups = new[]
        {
            new { extra = 1, priceEgp = 250m, priceWithVat = Math.Round(250m * 1.14m, 2), label = "+1 مشروع" },
            new { extra = 5, priceEgp = 950m, priceWithVat = Math.Round(950m * 1.14m, 2), label = "+5 مشاريع" },
        };

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Data = new { plans, topups, vatRate = VatRate }
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
