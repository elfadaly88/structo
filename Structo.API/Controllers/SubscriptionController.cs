using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/subscription")]
[Route("api/subscriptions")]
[Authorize(Roles = "TenantOwner")]
public class SubscriptionController(
    StructoDbContext context, 
    Structo.Core.Interfaces.INotificationEngine notificationEngine,
    Structo.Core.Interfaces.IPaymobService paymobService) : ControllerBase
{
    private const string NonOwnerForbiddenMessage = "ترقية الباقة والفوترة مقتصرة حصرياً على مالك المنشأة.";

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
    // POST /api/subscription/checkout
    // ─────────────────────────────────────────────────────────
    [HttpPost("checkout")]
    public async Task<ActionResult<ApiResponse<PaymobCheckoutResponseDto>>> Checkout(
        [FromBody] PaymobCheckoutRequestDto dto)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "id" || c.Type == "userId" || c.Type == "sub");
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized(new ApiResponse<PaymobCheckoutResponseDto>
                { Success = false, Message = "User identity missing or invalid in claims" });
        }

        // Always query database as single source of truth for the user and their active tenant
        var user = await context.Users
            .IgnoreQueryFilters()
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null || !user.IsActive)
        {
            return Unauthorized(new ApiResponse<PaymobCheckoutResponseDto>
                { Success = false, Message = "User account not found or deactivated" });
        }

        if (user.Role != UserRole.TenantOwner)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new ApiResponse<PaymobCheckoutResponseDto>
            {
                Success = false,
                Message = NonOwnerForbiddenMessage
            });
        }

        if (user.Tenant == null || user.TenantId == null)
        {
            return NotFound(new ApiResponse<PaymobCheckoutResponseDto>
                { Success = false, Message = "Active tenant not associated with this user" });
        }

        var tenant = user.Tenant;

        try
        {
            var checkoutResult = await paymobService.CreatePaymentIntentAsync(
                tenant,
                user,
                dto.TargetPlanId,
                dto.ExtraProjectsCount);

            // Explicitly track payment attempt before redirecting to gateway
            var attempt = new PaymentAttempt
            {
                TenantId = tenant.Id,
                UserId = user.Id,
                Amount = checkoutResult.TotalAmountEgp,
                PlanRequested = checkoutResult.PlanName,
                ExtraProjectsCount = dto.ExtraProjectsCount ?? (checkoutResult.PlanName.Contains("5") ? 5 : 1),
                PaymobOrderId = checkoutResult.OrderId,
                SpecialReference = checkoutResult.OrderId ?? $"SUB_{tenant.Id:N}_{DateTime.UtcNow.Ticks}",
                CreatedAt = DateTime.UtcNow,
                WebhookStatus = "Pending"
            };

            context.PaymentAttempts.Add(attempt);
            await context.SaveChangesAsync();

            return Ok(new ApiResponse<PaymobCheckoutResponseDto>
            {
                Success = true,
                Message = "تم إنشاء جلسة الدفع بنجاح",
                Data = checkoutResult
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<PaymobCheckoutResponseDto>
            {
                Success = false,
                Message = $"فشل في تهيئة بوابة الدفع باي موب: {ex.Message}"
            });
        }
    }

    // ─────────────────────────────────────────────────────────
    // POST /api/subscription/upgrade-mock (Additive Quota Addition)
    // ─────────────────────────────────────────────────────────
    [HttpPost("upgrade-mock")]
    public async Task<ActionResult<ApiResponse<SubscriptionUpgradeResponseDto>>> UpgradeMock(
        [FromBody] SubscriptionUpgradeRequestDto dto)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id" || c.Type == "userId" || c.Type == ClaimTypes.NameIdentifier || c.Type == "sub");
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "User identity missing or invalid in claims" });

        var user = await context.Users
            .IgnoreQueryFilters()
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null || !user.IsActive)
            return Unauthorized(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "User account not found or deactivated" });

        if (user.Role != UserRole.TenantOwner)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new ApiResponse<SubscriptionUpgradeResponseDto>
            {
                Success = false,
                Message = NonOwnerForbiddenMessage
            });
        }

        if (user.Tenant == null || user.TenantId == null)
            return NotFound(new ApiResponse<SubscriptionUpgradeResponseDto>
                { Success = false, Message = "Active tenant not associated with this user" });

        var tenant = user.Tenant;
        var tenantId = user.TenantId.Value;

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

        // Trigger Notification to TenantOwner only — best-effort
        try
        {
            await notificationEngine.RaiseSubscriptionUpgradedNotificationAsync(
                tenantId,
                planName,
                newMaxProjects);
        }
        catch (Exception) { /* Best-effort delivery */ }

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
        var roleClaim = User.Claims.FirstOrDefault(c => c.Type == "role" || c.Type == ClaimTypes.Role)?.Value;
        if (!string.Equals(roleClaim, nameof(UserRole.TenantOwner), StringComparison.OrdinalIgnoreCase))
        {
            return StatusCode(StatusCodes.Status403Forbidden, new ApiResponse<object>
            {
                Success = false,
                Message = NonOwnerForbiddenMessage
            });
        }

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
    // GET /api/subscription/my-payments
    // ─────────────────────────────────────────────────────────
    [HttpGet("my-payments")]
    [HttpGet("payment-history")]
    public async Task<ActionResult<ApiResponse<MyPaymentsResponseDto>>> GetMyPayments()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "id" || c.Type == "userId" || c.Type == "sub");
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized(new ApiResponse<MyPaymentsResponseDto>
                { Success = false, Message = "User identity missing or invalid in claims" });
        }

        var user = await context.Users
            .IgnoreQueryFilters()
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null || user.Tenant == null || user.TenantId == null)
        {
            return NotFound(new ApiResponse<MyPaymentsResponseDto>
                { Success = false, Message = "Active tenant not found" });
        }

        var tenantId = user.TenantId.Value;
        var staleThreshold = DateTime.UtcNow.AddMinutes(-15);

        // Fetch payment attempts for this tenant
        var attempts = await context.PaymentAttempts
            .IgnoreQueryFilters()
            .Where(pa => pa.TenantId == tenantId)
            .Include(pa => pa.LinkedTransaction)
            .Include(pa => pa.User)
            .OrderByDescending(pa => pa.CreatedAt)
            .ToListAsync();

        bool hasStaleUpdates = false;
        var dtoList = new List<PaymentAttemptDto>();

        foreach (var pa in attempts)
        {
            var isStalePending = pa.WebhookStatus == "Pending" && pa.CreatedAt < staleThreshold;
            if (isStalePending)
            {
                pa.WebhookStatus = "NeverArrived";
                pa.ErrorMessage ??= "لم يصل إشعار الدفع من باي موب (تجاوزت المهلة 15 دقيقة)";
                hasStaleUpdates = true;
            }

            dtoList.Add(new PaymentAttemptDto
            {
                Id = pa.Id,
                TenantId = pa.TenantId,
                TenantName = user.Tenant.Name,
                UserId = pa.UserId,
                UserEmail = pa.User?.Email ?? user.Email,
                UserName = pa.User != null ? $"{pa.User.FirstName} {pa.User.LastName}".Trim() : null,
                Amount = pa.Amount,
                PlanRequested = pa.PlanRequested,
                ExtraProjectsCount = pa.ExtraProjectsCount,
                PaymobOrderId = pa.PaymobOrderId,
                SpecialReference = pa.SpecialReference,
                CreatedAt = pa.CreatedAt,
                WebhookReceivedAt = pa.WebhookReceivedAt,
                WebhookStatus = pa.WebhookStatus,
                LinkedTransactionId = pa.LinkedTransactionId,
                ReferenceNumber = pa.LinkedTransaction?.ReferenceNumber,
                PaymentMethod = pa.LinkedTransaction?.PaymentMethod ?? "Paymob Card",
                ErrorMessage = pa.ErrorMessage,
                IsStaleUnconfirmed = pa.WebhookStatus == "NeverArrived" || pa.WebhookStatus == "HmacFailed"
            });
        }

        if (hasStaleUpdates)
        {
            try
            {
                await context.SaveChangesAsync();
            }
            catch { /* Best-effort status persistence */ }
        }

        var response = new MyPaymentsResponseDto
        {
            CurrentMaxProjects = user.Tenant.MaxActiveProjects,
            CurrentPlan = user.Tenant.SubscriptionPlan.ToString(),
            Attempts = dtoList,
            TotalConfirmedCount = dtoList.Count(a => a.WebhookStatus == "Confirmed"),
            TotalNeverArrivedCount = dtoList.Count(a => a.WebhookStatus == "NeverArrived"),
            TotalSpentEgp = dtoList.Where(a => a.WebhookStatus == "Confirmed").Sum(a => a.Amount)
        };

        return Ok(new ApiResponse<MyPaymentsResponseDto>
        {
            Success = true,
            Message = "تم جلب سجل المدفوعات والـ Webhook بنجاح",
            Data = response
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
