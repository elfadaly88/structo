# 🚀 Paymob Unified Checkout — Full-Page Redirect Migration Bundle
**نظام Structo SaaS Platform (.NET 9 Web API + Angular 19 Standalone)**  
**تاريخ التحديث:** 25 أغسطس 2026  
**الهدف:** تحويل بوابة دفع Paymob من الـ Iframe / Modal Popup إلى **Full-Page Redirect** لحل مشاكل CSP و 3DS OTP ومزامنة البيانات.

---

## 📑 الفهرس (Table of Contents)
1. [المعمارية وتدفق البيانات (Architecture & Flow)](#1-المعمارية-وتدفق-البيانات)
2. [ملفات الباك إند (.NET Core API)](#2-ملفات-الباك-إند-net-core-api)
   - [PaymentsController.cs](#21-structoapicontrollerspaymentscontrollercs)
   - [SubscriptionController.cs](#22-structoapicontrollerssubscriptioncontrollercs)
3. [ملفات الفرونت إند (Angular Standalone)](#3-ملفات-الفرونت-إند-angular-standalone)
   - [subscription.component.ts](#31-subscriptioncomponentts)
   - [subscription-success.component.ts](#32-subscriptionsuccesscomponentts)
   - [subscription-failed.component.ts](#33-subscriptionfailedcomponentts)
   - [app.routes.ts](#34-approutests)
4. [إعدادات لوحة تحكم Paymob](#4-إعدادات-لوحة-تحكم-paymob-dashboard)
5. [خطة الاختبار والتحقق (Verification Checklist)](#5-خطة-الاختبار-والتحقق)

---

## 1. المعمارية وتدفق البيانات

```
[المستخدم على Angular] 
       │
       ▼ (1) اختيار الباقة والضغط على "ترقية الآن"
[POST /api/subscription/checkout] 
       │
       ▼ (2) إنشاء Intention واستلام checkoutUrl
[window.location.href = checkoutUrl]
       │
       ▼ (3) المتصفح يفتح صفحة Paymob بالكامل
[Paymob Unified Checkout Page + 3DS OTP Verification]
       │
       ├─────────────────────────────────────────┐
       │ (مسار متزامن: توجيه المتصفح)             │ (مسار غير متزامن: خادم لخادم)
       ▼                                         ▼
[GET /api/payments/callback]              [POST /api/payments/callback (Webhook)]
       │                                         │
       ▼                                         ▼ (HMAC Verification)
[302 Redirect إلى Angular]                 [ترقية MaxActiveProjects في قاعدة البيانات]
  ├── نجاح: /dashboard/subscription/success      [تسجيل SubscriptionTransaction]
  └── فشل: /dashboard/subscription/failed
```

---

## 2. ملفات الباك إند (.NET Core API)

### 2.1 `Structo.API/Controllers/PaymentsController.cs`
```csharp
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/payments")]
[AllowAnonymous]
public class PaymentsController : ControllerBase
{
    private readonly StructoDbContext _context;
    private readonly IPaymobService _paymobService;
    private readonly INotificationEngine _notificationEngine;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(
        StructoDbContext context,
        IPaymobService paymobService,
        INotificationEngine notificationEngine,
        ILogger<PaymentsController> logger)
    {
        _context = context;
        _paymobService = paymobService;
        _notificationEngine = notificationEngine;
        _logger = logger;
    }

    /// <summary>
    /// GET Redirect Callback: يستقبل عودة متصفح العميل من بوابة Paymob ويوجهه للـ Angular Router
    /// </summary>
    [HttpGet("paymob-callback")]
    [HttpGet("callback")]
    [HttpGet("response")]
    public IActionResult PaymobRedirectCallback(
        [FromQuery] string? success, 
        [FromQuery] string? id,
        [FromQuery] string? pending,
        [FromQuery(Name = "txn_response_code")] string? txnResponseCode)
    {
        _logger.LogInformation("Paymob Redirect GET Callback: success={Success}, id={Id}, pending={Pending}", success, id, pending);
        
        var isSuccess = string.Equals(success, "true", StringComparison.OrdinalIgnoreCase);
        var isPending = string.Equals(pending, "true", StringComparison.OrdinalIgnoreCase);

        // توجيه المتصفح إلى شاشة النجاح
        if (isSuccess && !isPending)
        {
            return Redirect($"/dashboard/subscription/success?txnId={id}");
        }

        // توجيه المتصفح إلى شاشة الفشل أو الإلغاء
        return Redirect($"/dashboard/subscription/failed?txnId={id}&success={success}");
    }

    /// <summary>
    /// POST Webhook Callback: يستقبل إشعار Paymob خادم-إلى-خادم لتحديث قاعدة البيانات وترقية السعة
    /// </summary>
    [HttpPost("paymob-callback")]
    [HttpPost("callback")]
    public async Task<IActionResult> PaymobCallback([FromQuery] string? hmac)
    {
        string rawBody;
        using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
        {
            rawBody = await reader.ReadToEndAsync();
        }

        if (string.IsNullOrWhiteSpace(rawBody))
        {
            _logger.LogWarning("Received empty Paymob webhook callback body.");
            return BadRequest(new { success = false, message = "Empty body" });
        }

        // 1. تحليل الـ JSON
        JsonNode? rootNode;
        try
        {
            rootNode = JsonNode.Parse(rawBody);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to parse JSON body from Paymob webhook.");
            return BadRequest(new { success = false, message = "Invalid JSON" });
        }

        if (rootNode == null) return BadRequest(new { success = false, message = "Null JSON" });

        var objNode = rootNode["obj"] ?? rootNode;

        // 2. التحقق من توقيع HMAC
        var incomingHmac = hmac
            ?? Request.Headers["hmac"].FirstOrDefault()
            ?? Request.Headers["X-Paymob-Hmac"].FirstOrDefault()
            ?? rootNode["hmac"]?.ToString()
            ?? objNode["hmac"]?.ToString();

        var specialRef = objNode["order"]?["merchant_order_id"]?.ToString()
            ?? objNode["order"]?["special_reference"]?.ToString()
            ?? objNode["special_reference"]?.ToString()
            ?? objNode["merchant_order_id"]?.ToString()
            ?? "";

        var orderIdStr = objNode["order"]?["id"]?.ToString()
            ?? objNode["order_id"]?.ToString()
            ?? "";

        if (string.IsNullOrWhiteSpace(incomingHmac) || !_paymobService.ValidateHmac(rawBody, incomingHmac))
        {
            _logger.LogWarning("Paymob HMAC signature verification failed. Incoming HMAC: {IncomingHmac}", incomingHmac);
            try
            {
                var failedAttempt = await _context.PaymentAttempts
                    .IgnoreQueryFilters()
                    .FirstOrDefaultAsync(pa => (specialRef != "" && pa.SpecialReference == specialRef) || (orderIdStr != "" && pa.PaymobOrderId == orderIdStr));
                if (failedAttempt != null)
                {
                    failedAttempt.WebhookReceivedAt = DateTime.UtcNow;
                    failedAttempt.WebhookStatus = "HmacFailed";
                    failedAttempt.ErrorMessage = $"HMAC signature verification failed. Incoming HMAC: {incomingHmac}";
                    await _context.SaveChangesAsync();
                }
            }
            catch { }

            return Unauthorized(new { success = false, message = "HMAC verification failed" });
        }

        // 3. التحقق من نجاح العملية
        var success = objNode["success"]?.GetValue<bool>() ?? false;
        var pending = objNode["pending"]?.GetValue<bool>() ?? false;
        var transactionId = objNode["id"]?.ToString() ?? "";
        var amountCents = objNode["amount_cents"]?.GetValue<long>() ?? 0;
        var amountEgp = amountCents > 0 ? (decimal)amountCents / 100m : 0m;
        var sourceSubType = objNode["source_data"]?["sub_type"]?.ToString() ?? "Card";

        _logger.LogInformation("Paymob Webhook Transaction {TxnId}: Success={Success}, Pending={Pending}, Amount={Amount} EGP",
            transactionId, success, pending, amountEgp);

        if (!success || pending)
        {
            try
            {
                var matchingAttempt = await _context.PaymentAttempts
                    .IgnoreQueryFilters()
                    .FirstOrDefaultAsync(pa => (specialRef != "" && pa.SpecialReference == specialRef) || (orderIdStr != "" && pa.PaymobOrderId == orderIdStr));
                if (matchingAttempt != null)
                {
                    matchingAttempt.WebhookReceivedAt = DateTime.UtcNow;
                    matchingAttempt.ErrorMessage = $"Paymob callback status: Success={success}, Pending={pending}";
                    await _context.SaveChangesAsync();
                }
            }
            catch { }

            return Ok(new { success = true, message = "Callback received but transaction not successful/pending." });
        }

        // 4. استخراج Tenant ID
        Guid? tenantId = null;
        var tenantIdStr = objNode["data"]?["tenant_id"]?.ToString()
            ?? objNode["extras"]?["tenant_id"]?.ToString();

        if (!string.IsNullOrWhiteSpace(tenantIdStr) && Guid.TryParse(tenantIdStr, out var parsedTenantId))
        {
            tenantId = parsedTenantId;
        }

        if (!tenantId.HasValue && specialRef.StartsWith("SUB_"))
        {
            var parts = specialRef.Split('_');
            if (parts.Length >= 2 && Guid.TryParse(parts[1], out var guidFromRef))
            {
                tenantId = guidFromRef;
            }
        }

        if (!tenantId.HasValue)
        {
            _logger.LogError("Could not extract Tenant ID from Paymob callback for transaction {TxnId}.", transactionId);
            return Ok(new { success = false, message = "Tenant ID could not be identified." });
        }

        // 5. جلب المنشأة
        var tenant = await _context.Tenants
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == tenantId.Value);

        if (tenant == null)
        {
            _logger.LogError("Tenant with ID {TenantId} not found.", tenantId);
            return Ok(new { success = false, message = "Tenant not found" });
        }

        // 6. التحقق من عدم التكرار (Idempotency)
        var referenceNumber = $"PAYMOB-{transactionId}";
        var existingTxn = await _context.SubscriptionTransactions
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.ReferenceNumber == referenceNumber && t.Status == "Paid");

        if (existingTxn != null)
        {
            return Ok(new { success = true, message = "Transaction already processed." });
        }

        // 7. حساب السعة المضافة
        var planIdStr = objNode["data"]?["plan_id"]?.ToString()
            ?? objNode["extras"]?["plan_id"]?.ToString()
            ?? "Pro";

        int extraProjects = 1;
        var extraProjectsNode = objNode["data"]?["extra_projects"] ?? objNode["extras"]?["extra_projects"];
        if (extraProjectsNode != null && int.TryParse(extraProjectsNode.ToString(), out var parsedExtra))
        {
            extraProjects = parsedExtra;
        }
        else if (amountEgp >= 900m || planIdStr.Contains("5"))
        {
            extraProjects = 5;
        }

        if (tenant.MaxActiveProjects <= 0) tenant.MaxActiveProjects = 2;
        tenant.MaxActiveProjects += extraProjects;
        
        if (Enum.TryParse<SubscriptionPlan>(planIdStr, true, out var parsedPlan))
        {
            tenant.SubscriptionPlan = parsedPlan;
        }
        else
        {
            tenant.SubscriptionPlan = extraProjects >= 5 ? SubscriptionPlan.Enterprise : SubscriptionPlan.Pro;
        }

        tenant.Status = TenantStatus.Active;

        // 8. إنشاء وتسجيل الفاتورة SubscriptionTransaction
        var transaction = new SubscriptionTransaction
        {
            TenantId = tenant.Id,
            TransactionType = "AddOnTopUp",
            PlanName = $"+{extraProjects} Projects ({tenant.SubscriptionPlan})",
            ExtraProjectsAdded = extraProjects,
            ResultingMaxProjects = tenant.MaxActiveProjects,
            Amount = amountEgp,
            TaxAmount = 0m,
            TotalAmount = amountEgp,
            PaymentGateway = "Paymob",
            PaymentMethod = sourceSubType,
            Status = "Paid",
            ReferenceNumber = referenceNumber,
            CreatedAt = DateTime.UtcNow
        };

        _context.SubscriptionTransactions.Add(transaction);

        // 9. ربط وتأكيد PaymentAttempt
        try
        {
            var matchingAttempt = await _context.PaymentAttempts
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(pa => (specialRef != "" && pa.SpecialReference == specialRef)
                    || (orderIdStr != "" && pa.PaymobOrderId == orderIdStr)
                    || (pa.TenantId == tenant.Id && pa.WebhookStatus == "Pending"));

            if (matchingAttempt != null)
            {
                matchingAttempt.WebhookReceivedAt = DateTime.UtcNow;
                matchingAttempt.WebhookStatus = "Confirmed";
                matchingAttempt.LinkedTransactionId = transaction.Id;
                matchingAttempt.ErrorMessage = null;
                if (string.IsNullOrWhiteSpace(matchingAttempt.PaymobOrderId) && !string.IsNullOrWhiteSpace(transactionId))
                {
                    matchingAttempt.PaymobOrderId = transactionId;
                }
            }
        }
        catch { }

        await _context.SaveChangesAsync();

        _logger.LogInformation("Successfully upgraded Tenant {TenantId} to {MaxProjects} projects. Reference: {Ref}",
            tenant.Id, tenant.MaxActiveProjects, referenceNumber);

        // 10. إشعار المالك
        try
        {
            await _notificationEngine.RaiseSubscriptionUpgradedNotificationAsync(
                tenant.Id,
                transaction.PlanName,
                tenant.MaxActiveProjects);
        }
        catch { }

        return Ok(new
        {
            success = true,
            message = "Subscription upgraded successfully",
            tenantId = tenant.Id,
            newMaxProjects = tenant.MaxActiveProjects,
            reference = referenceNumber
        });
    }
}
```

---

### 2.2 `Structo.API/Controllers/SubscriptionController.cs` (مراجعة `GetMyPayments`)
تأكد من وجود نقطة النهاية التالية في `SubscriptionController.cs` والتي تعرض سجل العمليات للعميل:

```csharp
[HttpGet("my-payments")]
[HttpGet("payment-history")]
public async Task<ActionResult<ApiResponse<MyPaymentsResponseDto>>> GetMyPayments()
{
    var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "id" || c.Type == "userId" || c.Type == "sub");
    if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
    {
        return Unauthorized(new ApiResponse<MyPaymentsResponseDto> { Success = false, Message = "User identity invalid" });
    }

    var user = await context.Users
        .IgnoreQueryFilters()
        .Include(u => u.Tenant)
        .FirstOrDefaultAsync(u => u.Id == userId);

    if (user == null || user.Tenant == null || user.TenantId == null)
    {
        return NotFound(new ApiResponse<MyPaymentsResponseDto> { Success = false, Message = "Active tenant not found" });
    }

    var tenantId = user.TenantId.Value;
    var staleThreshold = DateTime.UtcNow.AddMinutes(-15);

    var attempts = await context.PaymentAttempts
        .IgnoreQueryFilters()
        .Where(pa => pa.TenantId == tenantId)
        .Include(pa => pa.LinkedTransaction)
        .Include(pa => pa.User)
        .OrderByDescending(pa => pa.CreatedAt)
        .ToListAsync();

    var dtoList = attempts.Select(pa => new PaymentAttemptDto
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
    }).ToList();

    return Ok(new ApiResponse<MyPaymentsResponseDto>
    {
        Success = true,
        Data = new MyPaymentsResponseDto
        {
            CurrentMaxProjects = user.Tenant.MaxActiveProjects,
            CurrentPlan = user.Tenant.SubscriptionPlan.ToString(),
            Attempts = dtoList,
            TotalConfirmedCount = dtoList.Count(a => a.WebhookStatus == "Confirmed"),
            TotalNeverArrivedCount = dtoList.Count(a => a.WebhookStatus == "NeverArrived"),
            TotalSpentEgp = dtoList.Where(a => a.WebhookStatus == "Confirmed").Sum(a => a.Amount)
        }
    });
}
```

---

## 3. ملفات الفرونت إند (Angular Standalone)

### 3.1 `subscription.component.ts`
**المسار:** `Structo.Client/src/app/features/dashboard/subscription/subscription.component.ts`

```typescript
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubscriptionService, SubscriptionPlanItem } from '../../../core/services/subscription.service';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { PaymentAuditService, MyPaymentsResponse } from '../../../core/services/payment-audit.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-cairo" dir="rtl">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>بوابات الدفع الإلكتروني المعتمدة — Paymob Gateway</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              الاشتراكات وترقية سعة المشاريع
            </h1>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              إدارة سعة المشاريع وشراء باقات التوسعة الفورية ومتابعة سجل المدفوعات والـ Webhook.
            </p>
          </div>

          <!-- Current Quota Pill -->
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl self-start md:self-auto shrink-0">
            <div class="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <span class="text-xs text-slate-400 font-bold block">سعة حسابك الحالية:</span>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-lg font-black text-indigo-400 font-mono">{{ usedQuota() }}</span>
                <span class="text-xs text-slate-400">مستخدم من أصل</span>
                <span class="text-lg font-black text-white font-mono">{{ totalQuota() }}</span>
                <span class="text-xs text-slate-400">مشاريع</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 mt-6 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
          <button
            (click)="activeTab.set('plans')"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
            [class.bg-indigo-600]="activeTab() === 'plans'"
            [class.text-white]="activeTab() === 'plans'"
            [class.shadow-lg]="activeTab() === 'plans'"
            [class.bg-slate-900]="activeTab() !== 'plans'"
            [class.text-slate-400]="activeTab() !== 'plans'">
            <span>💎</span>
            <span>باقات الشراء وتوسعة السعة</span>
          </button>

          <button
            (click)="switchTabToHistory()"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap relative"
            [class.bg-indigo-600]="activeTab() === 'history'"
            [class.text-white]="activeTab() === 'history'"
            [class.shadow-lg]="activeTab() === 'history'"
            [class.bg-slate-900]="activeTab() !== 'history'"
            [class.text-slate-400]="activeTab() !== 'history'">
            <span>📜</span>
            <span>سجل المدفوعات والـ Webhook</span>
            @if (myPayments() && myPayments()!.totalNeverArrivedCount > 0) {
              <span class="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-bold animate-pulse">
                {{ myPayments()!.totalNeverArrivedCount }}
              </span>
            }
          </button>
        </div>

        <!-- Error Banner -->
        @if (errorMessage()) {
          <div class="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
            <button (click)="errorMessage.set(null)" class="text-slate-400 hover:text-white text-lg font-bold cursor-pointer">×</button>
          </div>
        }
      </div>

      <!-- TAB 1: Pricing Cards Grid -->
      @if (activeTab() === 'plans') {
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          @for (plan of plans(); track plan.id) {
            <div 
              class="relative flex flex-col justify-between rounded-3xl bg-slate-900/70 border transition-all duration-300 backdrop-blur-sm p-6 overflow-hidden group hover:translate-y-[-4px] hover:shadow-2xl"
              [class.border-indigo-500]="plan.isPopular"
              [class.border-slate-800]="!plan.isPopular">
              
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {{ plan.nameAr }}
                  </h3>
                  @if (plan.badge) {
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm bg-gradient-to-r from-indigo-600 to-violet-600">
                      {{ plan.badge }}
                    </span>
                  }
                </div>

                <p class="text-xs text-slate-400 min-h-[38px] leading-relaxed">
                  {{ plan.descriptionAr }}
                </p>

                <!-- Price Tag -->
                <div class="mt-6 mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div class="flex items-baseline gap-1.5">
                    @if (plan.priceEgp === 0) {
                      <span class="text-3xl font-black text-white">مجاناً</span>
                    } @else {
                      <span class="text-3xl font-black text-white font-mono">{{ plan.priceEgp }}</span>
                      <span class="text-xs font-bold text-slate-400">ج.م (EGP)</span>
                    }
                  </div>
                  <span class="text-[11px] font-medium text-indigo-400 mt-1 block">
                    {{ plan.periodAr }}
                  </span>
                </div>

                <!-- Features List -->
                <ul class="space-y-3 mb-6 text-xs text-slate-300">
                  @for (feature of plan.featuresAr; track feature) {
                    <li class="flex items-start gap-2.5">
                      <div class="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{{ feature }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Action Button -->
              <div class="pt-4 border-t border-slate-800/80">
                @if (plan.priceEgp === 0) {
                  <button disabled class="w-full py-3 px-4 rounded-2xl bg-slate-800 text-slate-400 font-bold text-xs cursor-default flex items-center justify-center gap-2">
                    <span>باقة البداية المفعلة</span>
                  </button>
                } @else {
                  <button 
                    (click)="onSelectPlan(plan)"
                    [disabled]="selectedPlanId() === plan.id && isCheckingOut()"
                    class="w-full py-3 px-4 rounded-2xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98 disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white">
                    @if (selectedPlanId() === plan.id && isCheckingOut()) {
                      <svg class="animate-spin -ms-1 me-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>جاري التحويل لبوابة الدفع...</span>
                    } @else {
                      <span>ترقية الباقة والدفع الآن</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    }
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 2: History -->
      @if (activeTab() === 'history') {
        <div class="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-slate-400 font-bold block">إجمالي محاولات الدفع</span>
              <span class="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                {{ myPayments()?.attempts?.length || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-emerald-400 font-bold block">المدفوعات المؤكدة 🟢</span>
              <span class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1 block">
                {{ myPayments()?.totalConfirmedCount || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-rose-400 font-bold block">لم يصل الويب هوك 🔴</span>
              <span class="text-xl sm:text-2xl font-black text-rose-400 font-mono mt-1 block">
                {{ myPayments()?.totalNeverArrivedCount || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-indigo-400 font-bold block">إجمالي المصروف</span>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-xl sm:text-2xl font-black text-indigo-300 font-mono">{{ myPayments()?.totalSpentEgp || 0 }}</span>
                <span class="text-[10px] text-slate-400">ج.م</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class SubscriptionComponent implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly profileService = inject(TenantProfileService);
  private readonly paymentAuditService = inject(PaymentAuditService);

  readonly plans = signal<SubscriptionPlanItem[]>([]);
  readonly usedQuota = signal<number>(0);
  readonly totalQuota = signal<number>(2);
  readonly selectedPlanId = signal<string | null>(null);
  readonly isCheckingOut = this.subscriptionService.isCheckingOut;
  readonly errorMessage = signal<string | null>(null);
  readonly activeTab = signal<'plans' | 'history'>('plans');
  readonly myPayments = signal<MyPaymentsResponse | null>(null);

  ngOnInit(): void {
    this.plans.set(this.subscriptionService.getAvailablePlans());
    this.loadQuota();
    this.loadPaymentHistory();
  }

  private loadQuota(): void {
    this.profileService.getQuota().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.usedQuota.set(res.data.usedProjects || 0);
          this.totalQuota.set(res.data.allowedProjects || 2);
        }
      }
    });
  }

  loadPaymentHistory(): void {
    this.paymentAuditService.getMyPayments().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.myPayments.set(res.data);
          if (res.data.currentMaxProjects) {
            this.totalQuota.set(res.data.currentMaxProjects);
          }
        }
      }
    });
  }

  switchTabToHistory(): void {
    this.activeTab.set('history');
    this.loadPaymentHistory();
  }

  onSelectPlan(plan: SubscriptionPlanItem): void {
    if (plan.priceEgp === 0) return;

    this.selectedPlanId.set(plan.id);
    this.errorMessage.set(null);

    this.subscriptionService.initiateCheckout(plan.id, plan.extraProjects).subscribe({
      next: (res) => {
        if (res.success && res.data?.checkoutUrl) {
          // التوجيه الكامل المباشر لبوابة دفع Paymob
          window.location.href = res.data.checkoutUrl;
        } else {
          this.selectedPlanId.set(null);
          this.errorMessage.set(res.message || 'تعذر استلام رابط الدفع من بوابة Paymob');
        }
      },
      error: (err) => {
        this.selectedPlanId.set(null);
        this.errorMessage.set(err?.error?.message || 'حدث خطأ أثناء بدء جلسة الدفع');
      }
    });
  }
}
```

---

### 3.2 `subscription-success.component.ts`
**المسار:** `Structo.Client/src/app/features/dashboard/subscription/subscription-success.component.ts`

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-subscription-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-cairo" dir="rtl">
      <div class="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <!-- Ambient Glow -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Success Icon -->
        <div class="mx-auto w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">
          🎉 تم الدفع وتحديث الباقة بنجاح!
        </h1>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">
          تمت معالجة الدفعة عبر بوابة Paymob بنجاح، وتوسعة سعة مشاريعك في حسابك فورياً.
        </p>

        <!-- Dynamic Quota Badge -->
        <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 flex items-center justify-between">
          <div class="text-right">
            <span class="text-xs text-slate-400 font-bold block">سعة مشاريعك المحدثة:</span>
            <span class="text-lg font-black text-emerald-400 font-mono">
              {{ allowedQuota() }} مشاريع نشطة
            </span>
          </div>
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        @if (transactionReference()) {
          <div class="text-xs text-slate-500 font-mono mb-6">
            رقم المعاملة: <span class="text-slate-400">{{ transactionReference() }}</span>
          </div>
        }

        <!-- Actions -->
        <div class="space-y-3">
          <button 
            (click)="goToProjects()"
            class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>الانتقال إلى قائمة المشاريع</span>
          </button>

          <button 
            (click)="goToSubscription()"
            class="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer">
            <span>عرض تفاصيل الاشتراكات والمدفوعات</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly profileService = inject(TenantProfileService);
  private readonly auth = inject(AuthService);

  readonly allowedQuota = signal<number>(2);
  readonly transactionReference = signal<string | null>(null);

  ngOnInit(): void {
    const txnId = this.route.snapshot.queryParamMap.get('txnId') 
      || this.route.snapshot.queryParamMap.get('id');

    if (txnId) {
      this.transactionReference.set(txnId);
    }

    // جلب سعة المنشأة المحدثة
    this.profileService.getQuota().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.allowedQuota.set(res.data.allowedProjects || 2);
        }
      }
    });

    // تحديث توكن الجلسة والبروفايل
    this.auth.refreshToken().subscribe({
      next: () => {},
      error: () => {}
    });
  }

  goToProjects(): void {
    this.router.navigate(['/dashboard/projects']);
  }

  goToSubscription(): void {
    this.router.navigate(['/dashboard/subscription']);
  }
}
```

---

### 3.3 `subscription-failed.component.ts`
**المسار:** `Structo.Client/src/app/features/dashboard/subscription/subscription-failed.component.ts`

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription-failed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-cairo" dir="rtl">
      <div class="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <!-- Failure Icon -->
        <div class="mx-auto w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-lg shadow-rose-500/10">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">
          لم تكتمل عملية الدفع
        </h1>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">
          تم إلغاء عملية الدفع أو تعذر سحب المبلغ من البطاقة. لم يتم خصم أي مبالغ من حسابك.
        </p>

        @if (transactionReference()) {
          <div class="text-xs text-slate-500 font-mono mb-6">
            رقم المحاولة: <span class="text-slate-400">{{ transactionReference() }}</span>
          </div>
        }

        <!-- Actions -->
        <div class="space-y-3">
          <button 
            (click)="retryPayment()"
            class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>إعادة المحاولة واختيار باقة</span>
          </button>

          <button 
            (click)="goToProjects()"
            class="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer">
            <span>العودة للمشاريع</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionFailedComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly transactionReference = signal<string | null>(null);

  ngOnInit(): void {
    const txnId = this.route.snapshot.queryParamMap.get('txnId') 
      || this.route.snapshot.queryParamMap.get('id');

    if (txnId) {
      this.transactionReference.set(txnId);
    }
  }

  retryPayment(): void {
    this.router.navigate(['/dashboard/subscription']);
  }

  goToProjects(): void {
    this.router.navigate(['/dashboard/projects']);
  }
}
```

---

### 3.4 `app.routes.ts`
**المسار:** `Structo.Client/src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

@Component({
  standalone: true,
  template: `<div class="flex items-center justify-center h-48">
    <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>`
})
export class DashboardRedirectComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const role = this.auth.currentUser()?.role;
    if (role === 'SuperAdmin') {
      this.router.navigate(['/dashboard/overview'], { replaceUrl: true });
    } else {
      this.router.navigate(['/dashboard/financials'], { replaceUrl: true });
    }
  }
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/tenant-register/tenant-register.component').then(m => m.TenantRegisterComponent)
  },
  {
    path: 'subscription',
    redirectTo: 'dashboard/subscription'
  },
  {
    path: 'upgrade',
    redirectTo: 'dashboard/subscription'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardRedirectComponent
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/dashboard/overview/overview.component').then(m => m.OverviewComponent),
        data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./features/dashboard/projects/project-details.component').then(m => m.ProjectDetailsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'financials',
        loadComponent: () => import('./features/dashboard/financials/financials.component').then(m => m.FinancialsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/users/users.component').then(m => m.UsersComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/dashboard/tenant-profile/tenant-profile.component').then(m => m.TenantProfileComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/dashboard/tenant-profile/tenant-profile.component').then(m => m.TenantProfileComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'subscription',
        loadComponent: () => import('./features/dashboard/subscription/subscription.component').then(m => m.SubscriptionComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'subscription/success',
        loadComponent: () => import('./features/dashboard/subscription/subscription-success.component').then(m => m.SubscriptionSuccessComponent),
        data: { roles: ['TenantOwner', 'SuperAdmin', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'subscription/failed',
        loadComponent: () => import('./features/dashboard/subscription/subscription-failed.component').then(m => m.SubscriptionFailedComponent),
        data: { roles: ['TenantOwner', 'SuperAdmin', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'upgrade',
        redirectTo: 'subscription'
      },
      {
        path: 'billing',
        redirectTo: 'subscription'
      },
      {
        path: 'tenants',
        loadComponent: () => import('./features/dashboard/tenants/tenants.component').then(m => m.TenantsComponent),
        data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'pending-users',
        loadComponent: () => import('./features/dashboard/pending-users/pending-users.component').then(m => m.PendingUsersComponent),
        data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'admin-payments',
        loadComponent: () => import('./features/dashboard/admin-payments/admin-payments.component').then(m => m.AdminPaymentsComponent),
        data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'payment-audit',
        redirectTo: 'admin-payments'
      }
    ]
  },
  {
    path: 'superadmin/dashboard',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'admin/tenants',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'public/project-review/:token',
    loadComponent: () => import('./features/public/project-review.component').then(m => m.ProjectReviewComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## 4. إعدادات لوحة تحكم Paymob Dashboard

| الحقل في Paymob Dashboard | القيمة المطلوبة (الرابط) | الغرض |
| :--- | :--- | :--- |
| **Transaction Response Callback (GET)** | `https://structo-production.up.railway.app/api/payments/callback` | استقبال المتصفح بعد الدفع وإعادة توجيهه للفرونت إند |
| **Transaction Processed Callback (POST)** | `https://structo-production.up.railway.app/api/payments/callback` | استقبال إشعار الـ Webhook الخادم لتحديث السعة |

---

## 5. خطة الاختبار والتحقق

1. **الضغط على ترقية باقة:** التأكد من انتقال المتصفح كاملاً إلى صفحة Paymob (بدون أي Iframe أو Modal).
2. **إتمام الدفع بالبطاقة:** إدخال بيانات البطاقة والـ OTP.
3. **التوجيه التلقائي:** التأكد من استقبال Paymob لـ `GET Callback` ثم إعادة توجيه المتصفح إلى `/dashboard/subscription/success?txnId=...`.
4. **تحديث السعة:** التأكد من وصول الـ `POST Webhook` وزيادة `MaxActiveProjects` في قاعدة البيانات وتحديث رقم السعة المعروض في الشاشة فورياً.
