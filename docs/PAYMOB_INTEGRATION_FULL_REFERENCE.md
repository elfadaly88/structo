# 💳 Paymob Integration Full Technical Reference & Codebase Bundle
**System:** Structo SaaS Platform (.NET 9 & Angular 19)  
**Host Environment:** Railway Production (`https://structo-production.up.railway.app`)  
**Generated Date:** August 25, 2026

---

## 📑 Table of Contents
1. [Paymob Dashboard Webhook & Callback Configuration](#1-paymob-dashboard-webhook--callback-configuration)
2. [API Controller: `PaymentsController.cs`](#2-api-controller-paymentscontrollercs)
3. [Service Layer: `PaymobService.cs` & Interface](#3-service-layer-paymobservisecs--interface)
4. [Subscription Controller: `SubscriptionController.cs`](#4-subscription-controller-subscriptioncontrollercs)
5. [DTOs & Domain Entities](#5-dtos--domain-entities)
6. [Database Schema & Self-Healing Migration Guard](#6-database-schema--self-healing-migration-guard)
7. [Production Logs, Recent Incidents & Error Analysis](#7-production-logs-recent-incidents--error-analysis)

---

## 1. Paymob Dashboard Webhook & Callback Configuration

Configure the following URLs in your **Paymob Dashboard** under **Developers > Payment Integrations > Edit (Card Integration)**:

| Configuration Item | Type | Method | Exact URL |
| :--- | :--- | :--- | :--- |
| **Transaction Processed Callback** | Server-to-Server Webhook | `POST` | `https://structo-production.up.railway.app/api/payments/paymob-callback` |
| **Transaction Response Callback** | Browser Redirection | `GET` | `https://structo-production.up.railway.app/api/payments/paymob-callback` |
| **Supported Aliases** | Fallback Routes | `POST/GET` | `https://structo-production.up.railway.app/api/payments/callback` |

> [!IMPORTANT]
> - Ensure **HMAC Secret** in Railway environment variable `Paymob__HmacSecret` matches the HMAC Secret configured in your Paymob account settings.
> - The webhook request sends transaction metadata as JSON with an HMAC signature in either query parameter (`?hmac=...`) or HTTP header (`hmac` / `X-Paymob-Hmac`).

---

## 2. API Controller: `PaymentsController.cs`

**Location:** `Structo.API/Controllers/PaymentsController.cs`

```csharp
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Subscription;
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
    /// Webhook receiver for Paymob payment transaction callbacks.
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

        // 1. Parse payload
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

        if (rootNode == null)
        {
            return BadRequest(new { success = false, message = "Null JSON" });
        }

        var objNode = rootNode["obj"] ?? rootNode;

        // 2. Resolve HMAC signature from Query, Headers, or JSON payload (root/obj)
        var incomingHmac = hmac
            ?? Request.Headers["hmac"].FirstOrDefault()
            ?? Request.Headers["X-Paymob-Hmac"].FirstOrDefault()
            ?? rootNode["hmac"]?.ToString()
            ?? objNode["hmac"]?.ToString();

        // 3. Validate HMAC signature
        var specialRef = objNode["order"]?["merchant_order_id"]?.ToString()
            ?? objNode["order"]?["special_reference"]?.ToString()
            ?? objNode["special_reference"]?.ToString()
            ?? objNode["merchant_order_id"]?.ToString()
            ?? "";

        var orderIdStr = objNode["order"]?["id"]?.ToString()
            ?? objNode["order_id"]?.ToString()
            ?? "";

        if (!string.IsNullOrWhiteSpace(incomingHmac))
        {
            var isValidHmac = _paymobService.ValidateHmac(rawBody, incomingHmac);
            if (!isValidHmac)
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
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to log HmacFailed attempt in database.");
                }

                return Unauthorized(new { success = false, message = "HMAC verification failed" });
            }
        }
        else
        {
            _logger.LogWarning("Paymob webhook received WITHOUT HMAC signature. Rejecting.");
            return Unauthorized(new { success = false, message = "HMAC signature required" });
        }

        // 4. Check Transaction Success
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
            _logger.LogInformation("Transaction {TxnId} is not successful or still pending. No plan upgrade executed.", transactionId);
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

        // 5. Extract TenantId and Plan information
        Guid? tenantId = null;

        var tenantIdStr = objNode["data"]?["tenant_id"]?.ToString()
            ?? objNode["extras"]?["tenant_id"]?.ToString();

        if (!string.IsNullOrWhiteSpace(tenantIdStr) && Guid.TryParse(tenantIdStr, out var parsedTenantId))
        {
            tenantId = parsedTenantId;
        }

        // Fallback: extract from merchant_order_id or special_reference (e.g. SUB_{Guid}_{ticks})
        if (!tenantId.HasValue)
        {
            var refCode = objNode["order"]?["merchant_order_id"]?.ToString()
                ?? objNode["order"]?["special_reference"]?.ToString()
                ?? objNode["special_reference"]?.ToString();

            if (!string.IsNullOrWhiteSpace(refCode) && refCode.StartsWith("SUB_"))
            {
                var parts = refCode.Split('_');
                if (parts.Length >= 2 && Guid.TryParse(parts[1], out var guidFromRef))
                {
                    tenantId = guidFromRef;
                }
            }
        }

        if (!tenantId.HasValue)
        {
            _logger.LogError("Could not extract Tenant ID from Paymob callback for transaction {TxnId}.", transactionId);
            return Ok(new { success = false, message = "Tenant ID could not be identified." });
        }

        // 6. Fetch Tenant with IgnoreQueryFilters
        var tenant = await _context.Tenants
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == tenantId.Value);

        if (tenant == null)
        {
            _logger.LogError("Tenant with ID {TenantId} not found during Paymob webhook processing.", tenantId);
            return Ok(new { success = false, message = "Tenant not found" });
        }

        // 7. Check if transaction was already processed (idempotency check)
        var referenceNumber = $"PAYMOB-{transactionId}";
        var existingTxn = await _context.SubscriptionTransactions
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.ReferenceNumber == referenceNumber && t.Status == "Paid");

        if (existingTxn != null)
        {
            _logger.LogInformation("Transaction {Ref} already processed. Skipping duplicate upgrade.", referenceNumber);
            return Ok(new { success = true, message = "Transaction already processed." });
        }

        // 8. Determine Plan Upgrade / Additive Quota
        var planIdStr = objNode["data"]?["plan_id"]?.ToString()
            ?? objNode["extras"]?["plan_id"]?.ToString()
            ?? "Pro";

        int extraProjects = 0;
        var extraProjectsNode = objNode["data"]?["extra_projects"] ?? objNode["extras"]?["extra_projects"];
        if (extraProjectsNode != null && int.TryParse(extraProjectsNode.ToString(), out var parsedExtra))
        {
            extraProjects = parsedExtra;
        }

        if (extraProjects <= 0)
        {
            if (planIdStr.Contains("5") || amountEgp >= 900m)
                extraProjects = 5;
            else if (planIdStr.Contains("1") || amountEgp >= 200m)
                extraProjects = 1;
            else
                extraProjects = 1;
        }

        if (tenant.MaxActiveProjects <= 0)
            tenant.MaxActiveProjects = 2;

        tenant.MaxActiveProjects += extraProjects;
        
        if (Enum.TryParse<SubscriptionPlan>(planIdStr, true, out var parsedPlan))
        {
            tenant.SubscriptionPlan = parsedPlan;
        }
        else if (planIdStr.Contains("Enterprise", StringComparison.OrdinalIgnoreCase))
        {
            tenant.SubscriptionPlan = SubscriptionPlan.Enterprise;
        }
        else
        {
            tenant.SubscriptionPlan = SubscriptionPlan.Pro;
        }

        tenant.Status = TenantStatus.Active;

        // 9. Record SubscriptionTransaction / Invoice in DbContext
        var transaction = new SubscriptionTransaction
        {
            TenantId = tenant.Id,
            TransactionType = extraProjects > 0 ? "AddOnTopUp" : "PlanUpgrade",
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
        await _context.SaveChangesAsync();

        // 10. Explicitly link and confirm matching PaymentAttempt
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
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception paEx)
        {
            _logger.LogError(paEx, "Error updating PaymentAttempt status for transaction {TxnId}", transactionId);
        }

        _logger.LogInformation("Successfully upgraded Tenant {TenantId} to {MaxProjects} projects. Reference: {Ref}",
            tenant.Id, tenant.MaxActiveProjects, referenceNumber);

        // 11. Send notification to TenantOwner (best-effort)
        try
        {
            await _notificationEngine.RaiseSubscriptionUpgradedNotificationAsync(
                tenant.Id,
                transaction.PlanName,
                tenant.MaxActiveProjects);
        }
        catch (Exception notifEx)
        {
            _logger.LogWarning(notifEx, "Failed to send subscription upgraded notification to Tenant {TenantId}", tenant.Id);
        }

        return Ok(new
        {
            success = true,
            message = "Subscription upgraded successfully",
            tenantId = tenant.Id,
            newMaxProjects = tenant.MaxActiveProjects,
            reference = referenceNumber
        });
    }

    /// <summary>
    /// Transaction Response GET Callback (For Redirections from Paymob Checkout)
    /// </summary>
    [HttpGet("paymob-callback")]
    [HttpGet("callback")]
    public IActionResult PaymobRedirectCallback([FromQuery] string? success, [FromQuery] string? id)
    {
        _logger.LogInformation("Paymob Redirect Callback: success={Success}, id={Id}", success, id);
        
        var isSuccess = string.Equals(success, "true", StringComparison.OrdinalIgnoreCase);
        if (isSuccess)
        {
            return Redirect($"/dashboard/subscription/success?txnId={id}");
        }

        return Redirect($"/dashboard/projects?paymentStatus=failed&txnId={id}");
    }
}
```

---

## 3. Service Layer: `PaymobService.cs` & Interface

### Interface: `IPaymobService.cs`
**Location:** `Structo.Core/Interfaces/IPaymobService.cs`

```csharp
using System.Threading.Tasks;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Entities;

namespace Structo.Core.Interfaces;

public interface IPaymobService
{
    /// <summary>
    /// Creates a payment intention / payment key with Paymob and returns checkout URL.
    /// </summary>
    Task<PaymobCheckoutResponseDto> CreatePaymentIntentAsync(
        Tenant tenant,
        User user,
        string? targetPlanId,
        int? extraProjectsCount);

    /// <summary>
    /// Validates HMAC signature from Paymob transaction payload.
    /// </summary>
    bool ValidateHmac(string rawPayload, string incomingHmac);

    /// <summary>
    /// Validates HMAC signature from Paymob callback object.
    /// </summary>
    bool ValidateHmacFromCallback(PaymobTransactionObj transaction, string incomingHmac);
}
```

### Implementation: `PaymobService.cs`
**Location:** `Structo.Infrastructure/Services/PaymobService.cs`

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using Structo.Core.Settings;

namespace Structo.Infrastructure.Services;

public class PaymobService : IPaymobService
{
    private readonly HttpClient _httpClient;
    private readonly PaymobSettings _settings;
    private readonly ILogger<PaymobService> _logger;

    public PaymobService(
        HttpClient httpClient,
        IOptions<PaymobSettings> options,
        IConfiguration configuration,
        ILogger<PaymobService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
        
        _settings = options.Value ?? new PaymobSettings();

        _settings.SecretKey = Environment.GetEnvironmentVariable("Paymob__SecretKey")
            ?? Environment.GetEnvironmentVariable("PAYMOB_SECRET_KEY")
            ?? configuration["Paymob:SecretKey"]
            ?? _settings.SecretKey;

        _settings.PublicKey = Environment.GetEnvironmentVariable("Paymob__PublicKey")
            ?? Environment.GetEnvironmentVariable("PAYMOB_PUBLIC_KEY")
            ?? configuration["Paymob:PublicKey"]
            ?? _settings.PublicKey;

        _settings.HmacSecret = Environment.GetEnvironmentVariable("Paymob__HmacSecret")
            ?? Environment.GetEnvironmentVariable("PAYMOB_HMAC_SECRET")
            ?? configuration["Paymob:HmacSecret"]
            ?? _settings.HmacSecret;

        _settings.CardIntegrationId = Environment.GetEnvironmentVariable("Paymob__CardIntegrationId")
            ?? Environment.GetEnvironmentVariable("PAYMOB_CARD_INTEGRATION_ID")
            ?? configuration["Paymob:CardIntegrationId"]
            ?? _settings.CardIntegrationId;

        _settings.ApiKey = Environment.GetEnvironmentVariable("Paymob__ApiKey")
            ?? Environment.GetEnvironmentVariable("PAYMOB_API_KEY")
            ?? configuration["Paymob:ApiKey"]
            ?? _settings.ApiKey;

        _settings.IframeId = Environment.GetEnvironmentVariable("Paymob__IframeId")
            ?? configuration["Paymob:IframeId"]
            ?? _settings.IframeId;

        if (string.IsNullOrWhiteSpace(_settings.BaseUrl))
        {
            _settings.BaseUrl = "https://accept.paymob.com";
        }
    }

    public async Task<PaymobCheckoutResponseDto> CreatePaymentIntentAsync(
        Tenant tenant,
        User user,
        string? targetPlanId,
        int? extraProjectsCount)
    {
        var (amountCents, planName, totalEgp) = CalculatePricing(targetPlanId, extraProjectsCount);

        var firstName = !string.IsNullOrWhiteSpace(user.FirstName) ? user.FirstName.Trim() : "Client";
        var lastName = !string.IsNullOrWhiteSpace(user.LastName) ? user.LastName.Trim() : (tenant.Name ?? "User");
        var email = !string.IsNullOrWhiteSpace(user.Email) ? user.Email.Trim() : "billing@structo.app";
        var phone = !string.IsNullOrWhiteSpace(user.PersonalPhone) 
            ? user.PersonalPhone.Trim() 
            : (!string.IsNullOrWhiteSpace(user.WhatsAppPhone) ? user.WhatsAppPhone.Trim() : "+201000000000");

        var specialReference = $"SUB_{tenant.Id:N}_{DateTime.UtcNow.Ticks}";

        var billingData = new Dictionary<string, object>
        {
            ["first_name"] = firstName,
            ["last_name"] = lastName,
            ["email"] = email,
            ["phone_number"] = phone,
            ["country"] = "EG",
            ["city"] = !string.IsNullOrWhiteSpace(tenant.Region) ? tenant.Region : "Cairo",
            ["street"] = !string.IsNullOrWhiteSpace(tenant.ManualAddress) ? tenant.ManualAddress : "Structo HQ",
            ["building"] = "1",
            ["floor"] = "1",
            ["apartment"] = "1",
            ["postal_code"] = "11511",
            ["state"] = "Cairo"
        };

        // Modern Intention API (V1)
        if (!string.IsNullOrWhiteSpace(_settings.SecretKey))
        {
            try
            {
                var intentionUrl = $"{_settings.BaseUrl.TrimEnd('/')}/v1/intention/";
                using var request = new HttpRequestMessage(HttpMethod.Post, intentionUrl);
                request.Headers.Add("Authorization", $"Token {_settings.SecretKey}");

                var intentionPayload = new Dictionary<string, object>
                {
                    ["amount"] = amountCents,
                    ["currency"] = "EGP",
                    ["payment_methods"] = new string[] { "card" },
                    ["items"] = new[]
                    {
                        new Dictionary<string, object>
                        {
                            ["name"] = $"Structo {planName}",
                            ["amount"] = amountCents,
                            ["description"] = $"Subscription {planName} for {tenant.Name}",
                            ["quantity"] = 1
                        }
                    },
                    ["billing_data"] = billingData,
                    ["customer"] = new Dictionary<string, object>
                    {
                        ["first_name"] = firstName,
                        ["last_name"] = lastName,
                        ["email"] = email
                    },
                    ["extras"] = new Dictionary<string, object>
                    {
                        ["tenant_id"] = tenant.Id.ToString(),
                        ["plan_id"] = planName,
                        ["extra_projects"] = extraProjectsCount ?? (planName.Contains("5") ? 5 : 1)
                    },
                    ["special_reference"] = specialReference
                };

                request.Content = new StringContent(
                    JsonSerializer.Serialize(intentionPayload),
                    Encoding.UTF8,
                    "application/json");

                _logger.LogInformation("Creating Paymob Intention for Tenant {TenantId}, Plan: {PlanName}, Amount: {AmountCents} cents", 
                    tenant.Id, planName, amountCents);

                var response = await _httpClient.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    using var doc = JsonDocument.Parse(responseContent);
                    var root = doc.RootElement;
                    
                    string? clientSecret = null;
                    if (root.TryGetProperty("client_secret", out var csProp))
                        clientSecret = csProp.GetString();

                    string? paymentKeysToken = null;
                    if (root.TryGetProperty("payment_keys", out var pkProp) && pkProp.ValueKind == JsonValueKind.Array && pkProp.GetArrayLength() > 0)
                    {
                        var firstKey = pkProp[0];
                        if (firstKey.TryGetProperty("key", out var keyVal))
                            paymentKeysToken = keyVal.GetString();
                    }

                    string checkoutUrl = string.Empty;
                    if (!string.IsNullOrWhiteSpace(clientSecret) && !string.IsNullOrWhiteSpace(_settings.PublicKey))
                    {
                        checkoutUrl = $"{_settings.BaseUrl.TrimEnd('/')}/unifiedcheckout/?publicKey={_settings.PublicKey}&clientSecret={clientSecret}";
                    }
                    else if (!string.IsNullOrWhiteSpace(paymentKeysToken))
                    {
                        var iframeId = !string.IsNullOrWhiteSpace(_settings.IframeId) ? _settings.IframeId : "default";
                        checkoutUrl = $"{_settings.BaseUrl.TrimEnd('/')}/api/acceptance/iframes/{iframeId}?payment_token={paymentKeysToken}";
                    }
                    else if (!string.IsNullOrWhiteSpace(clientSecret))
                    {
                        checkoutUrl = $"{_settings.BaseUrl.TrimEnd('/')}/unifiedcheckout/?clientSecret={clientSecret}";
                    }

                    return new PaymobCheckoutResponseDto
                    {
                        CheckoutUrl = checkoutUrl,
                        ClientSecret = clientSecret,
                        PaymentToken = paymentKeysToken,
                        OrderId = specialReference,
                        AmountCents = amountCents,
                        Currency = "EGP",
                        PlanName = planName,
                        TotalAmountEgp = totalEgp
                    };
                }
                else
                {
                    _logger.LogWarning("Paymob Intention API returned {StatusCode}: {Error}. Attempting classic payment keys fallback.", 
                        response.StatusCode, responseContent);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while calling Paymob Intention API. Falling back to Classic Payment Keys API.");
            }
        }

        // Classic Payment Keys Fallback
        return await CreateClassicPaymentKeysAsync(tenant, user, billingData, amountCents, planName, totalEgp, specialReference);
    }

    private async Task<PaymobCheckoutResponseDto> CreateClassicPaymentKeysAsync(
        Tenant tenant,
        User user,
        Dictionary<string, object> billingData,
        int amountCents,
        string planName,
        decimal totalEgp,
        string specialReference)
    {
        var apiKey = _settings.ApiKey ?? _settings.SecretKey;
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("Paymob API Key / Secret Key is not configured in environment variables.");
        }

        // Step A: Authentication Token
        var authUrl = $"{_settings.BaseUrl.TrimEnd('/')}/api/auth/tokens";
        var authPayload = new { api_key = apiKey };
        var authResponse = await _httpClient.PostAsync(authUrl, 
            new StringContent(JsonSerializer.Serialize(authPayload), Encoding.UTF8, "application/json"));
        
        var authContent = await authResponse.Content.ReadAsStringAsync();
        if (!authResponse.IsSuccessStatusCode)
        {
            _logger.LogError("Paymob Auth Failed: {Content}", authContent);
            throw new InvalidOperationException($"Paymob Auth Failed: {authContent}");
        }

        using var authDoc = JsonDocument.Parse(authContent);
        var authToken = authDoc.RootElement.GetProperty("token").GetString();

        // Step B: Order Registration
        var orderUrl = $"{_settings.BaseUrl.TrimEnd('/')}/api/ecommerce/orders";
        var orderPayload = new Dictionary<string, object>
        {
            ["auth_token"] = authToken!,
            ["delivery_needed"] = "false",
            ["amount_cents"] = amountCents.ToString(),
            ["currency"] = "EGP",
            ["merchant_order_id"] = specialReference,
            ["items"] = new[]
            {
                new
                {
                    name = $"Structo {planName}",
                    amount_cents = amountCents.ToString(),
                    description = $"Subscription for {tenant.Name}",
                    quantity = "1"
                }
            }
        };

        var orderResponse = await _httpClient.PostAsync(orderUrl,
            new StringContent(JsonSerializer.Serialize(orderPayload), Encoding.UTF8, "application/json"));
        var orderContent = await orderResponse.Content.ReadAsStringAsync();
        
        if (!orderResponse.IsSuccessStatusCode)
        {
            _logger.LogError("Paymob Order Creation Failed: {Content}", orderContent);
            throw new InvalidOperationException($"Paymob Order Creation Failed: {orderContent}");
        }

        using var orderDoc = JsonDocument.Parse(orderContent);
        var orderId = orderDoc.RootElement.GetProperty("id").GetInt64().ToString();

        // Step C: Payment Key Request
        var paymentKeyUrl = $"{_settings.BaseUrl.TrimEnd('/')}/api/acceptance/payment_keys";
        var paymentKeyPayload = new Dictionary<string, object>
        {
            ["auth_token"] = authToken!,
            ["amount_cents"] = amountCents.ToString(),
            ["expiration"] = 3600,
            ["order_id"] = orderId,
            ["billing_data"] = billingData,
            ["currency"] = "EGP",
            ["integration_id"] = int.TryParse(_settings.CardIntegrationId, out var intId) ? intId : _settings.CardIntegrationId,
            ["lock_order_when_paid"] = "false"
        };

        var pkResponse = await _httpClient.PostAsync(paymentKeyUrl,
            new StringContent(JsonSerializer.Serialize(paymentKeyPayload), Encoding.UTF8, "application/json"));
        var pkContent = await pkResponse.Content.ReadAsStringAsync();

        if (!pkResponse.IsSuccessStatusCode)
        {
            _logger.LogError("Paymob Payment Key Generation Failed: {Content}", pkContent);
            throw new InvalidOperationException($"Paymob Payment Key Generation Failed: {pkContent}");
        }

        using var pkDoc = JsonDocument.Parse(pkContent);
        var paymentToken = pkDoc.RootElement.GetProperty("token").GetString();

        var iframeId = !string.IsNullOrWhiteSpace(_settings.IframeId) ? _settings.IframeId : "default";
        var checkoutUrl = !string.IsNullOrWhiteSpace(_settings.PublicKey)
            ? $"{_settings.BaseUrl.TrimEnd('/')}/unifiedcheckout/?publicKey={_settings.PublicKey}&clientSecret={paymentToken}"
            : $"{_settings.BaseUrl.TrimEnd('/')}/api/acceptance/iframes/{iframeId}?payment_token={paymentToken}";

        return new PaymobCheckoutResponseDto
        {
            CheckoutUrl = checkoutUrl,
            PaymentToken = paymentToken,
            OrderId = orderId,
            AmountCents = amountCents,
            Currency = "EGP",
            PlanName = planName,
            TotalAmountEgp = totalEgp
        };
    }

    public bool ValidateHmac(string rawPayload, string incomingHmac)
    {
        if (string.IsNullOrWhiteSpace(incomingHmac) || string.IsNullOrWhiteSpace(_settings.HmacSecret))
        {
            return false;
        }

        try
        {
            var node = JsonNode.Parse(rawPayload);
            if (node == null) return false;

            var obj = node["obj"] ?? node;

            var amountCents = obj["amount_cents"]?.ToString() ?? "";
            var createdAt = obj["created_at"]?.ToString() ?? "";
            var currency = obj["currency"]?.ToString() ?? "";
            var errorOccured = (obj["error_occured"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var hasParentTransaction = (obj["has_parent_transaction"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var id = obj["id"]?.ToString() ?? "";
            var integrationId = obj["integration_id"]?.ToString() ?? "";
            var is3dSecure = (obj["is_3d_secure"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var isAuth = (obj["is_auth"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var isCapture = (obj["is_capture"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var isRefunded = (obj["is_refunded"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var isStandalonePayment = (obj["is_standalone_payment"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var isVoided = (obj["is_voided"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var orderId = obj["order"]?["id"]?.ToString() ?? "";
            var owner = obj["owner"]?.ToString() ?? "";
            var pending = (obj["pending"]?.GetValue<bool>() ?? false).ToString().ToLower();
            var sourcePan = obj["source_data"]?["pan"]?.ToString() ?? "";
            var sourceSubType = obj["source_data"]?["sub_type"]?.ToString() ?? "";
            var sourceType = obj["source_data"]?["type"]?.ToString() ?? "";
            var success = (obj["success"]?.GetValue<bool>() ?? false).ToString().ToLower();

            var concatenated = string.Concat(
                amountCents,
                createdAt,
                currency,
                errorOccured,
                hasParentTransaction,
                id,
                integrationId,
                is3dSecure,
                isAuth,
                isCapture,
                isRefunded,
                isStandalonePayment,
                isVoided,
                orderId,
                owner,
                pending,
                sourcePan,
                sourceSubType,
                sourceType,
                success
            );

            var computedHash = ComputeHmacSha512(concatenated, _settings.HmacSecret);
            return string.Equals(computedHash, incomingHmac.Trim(), StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to validate HMAC from raw payload");
            return false;
        }
    }

    public bool ValidateHmacFromCallback(PaymobTransactionObj txn, string incomingHmac)
    {
        if (txn == null || string.IsNullOrWhiteSpace(incomingHmac) || string.IsNullOrWhiteSpace(_settings.HmacSecret))
        {
            return false;
        }

        try
        {
            var concatenated = string.Concat(
                txn.AmountCents.ToString(CultureInfo.InvariantCulture),
                txn.CreatedAt ?? "",
                txn.Currency ?? "",
                txn.ErrorOccured.ToString().ToLower(),
                txn.HasParentTransaction.ToString().ToLower(),
                txn.Id.ToString(CultureInfo.InvariantCulture),
                txn.IntegrationId.ToString(CultureInfo.InvariantCulture),
                txn.Is3dSecure.ToString().ToLower(),
                txn.IsAuth.ToString().ToLower(),
                txn.IsCapture.ToString().ToLower(),
                txn.IsRefunded.ToString().ToLower(),
                txn.IsStandalonePayment.ToString().ToLower(),
                txn.IsVoided.ToString().ToLower(),
                txn.Order?.Id.ToString(CultureInfo.InvariantCulture) ?? "",
                txn.Owner.ToString(CultureInfo.InvariantCulture),
                txn.Pending.ToString().ToLower(),
                txn.SourceData?.Pan ?? "",
                txn.SourceData?.SubType ?? "",
                txn.SourceData?.Type ?? "",
                txn.Success.ToString().ToLower()
            );

            var computedHash = ComputeHmacSha512(concatenated, _settings.HmacSecret);
            return string.Equals(computedHash, incomingHmac.Trim(), StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to validate HMAC from transaction object");
            return false;
        }
    }

    private static string ComputeHmacSha512(string text, string secret)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        var textBytes = Encoding.UTF8.GetBytes(text);

        using var hmac = new HMACSHA512(keyBytes);
        var hashBytes = hmac.ComputeHash(textBytes);
        return Convert.ToHexString(hashBytes).ToLowerInvariant();
    }

    private static (int AmountCents, string PlanName, decimal TotalEgp) CalculatePricing(
        string? targetPlanId,
        int? extraProjectsCount)
    {
        if (extraProjectsCount.HasValue && extraProjectsCount.Value > 0)
        {
            var count = extraProjectsCount.Value;
            var egp = count == 5 ? 950m : (count == 1 ? 250m : count * 200m);
            return ((int)(egp * 100), $"+{count} Projects", egp);
        }

        var plan = targetPlanId?.Trim().ToLowerInvariant() ?? "";

        if (plan.Contains("enterprise") || plan.Contains("5"))
        {
            return (95000, "+5 Projects Package", 950m);
        }
        if (plan.Contains("pro") || plan.Contains("1"))
        {
            return (25000, "+1 Project", 250m);
        }

        return (25000, "+1 Project", 250m);
    }
}
```

---

## 4. Subscription Controller: `SubscriptionController.cs`

**Location:** `Structo.API/Controllers/SubscriptionController.cs`

```csharp
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
    // ─────────────────────────────────────────────────────────
    private static readonly Dictionary<int, decimal> TopUpPricing = new()
    {
        { 1, 250m },
        { 5, 950m },
    };

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
            catch { }
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
}
```

---

## 5. DTOs & Domain Entities

### `PaymobDtos.cs`
**Location:** `Structo.Core/DTOs/Subscription/PaymobDtos.cs`

```csharp
using System.Text.Json.Serialization;

namespace Structo.Core.DTOs.Subscription;

public class PaymobCheckoutRequestDto
{
    public string? TargetPlanId { get; set; }
    public int? ExtraProjectsCount { get; set; }
    public string? RedirectUrl { get; set; }
}

public class PaymobCheckoutResponseDto
{
    public string CheckoutUrl { get; set; } = string.Empty;
    public string? ClientSecret { get; set; }
    public string? PaymentToken { get; set; }
    public string? OrderId { get; set; }
    public int AmountCents { get; set; }
    public string Currency { get; set; } = "EGP";
    public string PlanName { get; set; } = string.Empty;
    public decimal TotalAmountEgp { get; set; }
}

public class PaymobCallbackDto
{
    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("obj")]
    public PaymobTransactionObj? Obj { get; set; }
}

public class PaymobTransactionObj
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("amount_cents")]
    public long AmountCents { get; set; }

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("pending")]
    public bool Pending { get; set; }

    [JsonPropertyName("is_auth")]
    public bool IsAuth { get; set; }

    [JsonPropertyName("is_capture")]
    public bool IsCapture { get; set; }

    [JsonPropertyName("is_standalone_payment")]
    public bool IsStandalonePayment { get; set; }

    [JsonPropertyName("is_voided")]
    public bool IsVoided { get; set; }

    [JsonPropertyName("is_refunded")]
    public bool IsRefunded { get; set; }

    [JsonPropertyName("is_3d_secure")]
    public bool Is3dSecure { get; set; }

    [JsonPropertyName("integration_id")]
    public long IntegrationId { get; set; }

    [JsonPropertyName("currency")]
    public string Currency { get; set; } = "EGP";

    [JsonPropertyName("created_at")]
    public string? CreatedAt { get; set; }

    [JsonPropertyName("owner")]
    public long Owner { get; set; }

    [JsonPropertyName("order")]
    public PaymobOrder? Order { get; set; }

    [JsonPropertyName("source_data")]
    public PaymobSourceData? SourceData { get; set; }

    [JsonPropertyName("data")]
    public PaymobCustomData? Data { get; set; }
}

public class PaymobOrder
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("merchant_order_id")]
    public string? MerchantOrderId { get; set; }

    [JsonPropertyName("amount_cents")]
    public long AmountCents { get; set; }

    [JsonPropertyName("special_reference")]
    public string? SpecialReference { get; set; }
}

public class PaymobSourceData
{
    [JsonPropertyName("pan")]
    public string? Pan { get; set; }

    [JsonPropertyName("sub_type")]
    public string? SubType { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }
}

public class PaymobCustomData
{
    [JsonPropertyName("tenant_id")]
    public string? TenantId { get; set; }

    [JsonPropertyName("plan_id")]
    public string? PlanId { get; set; }

    [JsonPropertyName("extra_projects")]
    public int? ExtraProjects { get; set; }
}
```

### `PaymentAttempt.cs`
**Location:** `Structo.Core/Entities/PaymentAttempt.cs`

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Structo.Core.Entities;

public class PaymentAttempt
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public Guid? UserId { get; set; }
    public User? User { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [MaxLength(50)]
    public string PlanRequested { get; set; } = string.Empty;

    public int ExtraProjectsCount { get; set; }

    [MaxLength(100)]
    public string? PaymobOrderId { get; set; }

    [MaxLength(100)]
    public string SpecialReference { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? WebhookReceivedAt { get; set; }

    /// <summary>
    /// Status values: "Pending", "Confirmed", "HmacFailed", "NeverArrived"
    /// </summary>
    [MaxLength(30)]
    public string WebhookStatus { get; set; } = "Pending";

    public Guid? LinkedTransactionId { get; set; }
    public SubscriptionTransaction? LinkedTransaction { get; set; }

    [MaxLength(500)]
    public string? ErrorMessage { get; set; }
}
```

---

## 6. Database Schema & Self-Healing Migration Guard

**Location:** `Structo.API/Program.cs` (Startup Schema Execution)

```sql
CREATE TABLE IF NOT EXISTS "PaymentAttempts" (
    "Id" uuid NOT NULL,
    "TenantId" uuid NOT NULL,
    "UserId" uuid NULL,
    "Amount" numeric(18,2) NOT NULL,
    "PlanRequested" character varying(50) NOT NULL,
    "ExtraProjectsCount" integer NOT NULL,
    "PaymobOrderId" character varying(100) NULL,
    "SpecialReference" character varying(100) NOT NULL,
    "CreatedAt" timestamp without time zone NOT NULL DEFAULT NOW(),
    "WebhookReceivedAt" timestamp without time zone NULL,
    "WebhookStatus" character varying(30) NOT NULL DEFAULT 'Pending',
    "LinkedTransactionId" uuid NULL,
    "ErrorMessage" character varying(500) NULL,
    CONSTRAINT "PK_PaymentAttempts" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PaymentAttempts_SubscriptionTransactions_LinkedTransactionId" 
        FOREIGN KEY ("LinkedTransactionId") REFERENCES "SubscriptionTransactions" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_PaymentAttempts_Tenants_TenantId" 
        FOREIGN KEY ("TenantId") REFERENCES "Tenants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_PaymentAttempts_Users_UserId" 
        FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_CreatedAt" ON "PaymentAttempts" ("CreatedAt");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_LinkedTransactionId" ON "PaymentAttempts" ("LinkedTransactionId");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_PaymobOrderId" ON "PaymentAttempts" ("PaymobOrderId");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_SpecialReference" ON "PaymentAttempts" ("SpecialReference");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_TenantId" ON "PaymentAttempts" ("TenantId");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_UserId" ON "PaymentAttempts" ("UserId");
CREATE INDEX IF NOT EXISTS "IX_PaymentAttempts_WebhookStatus" ON "PaymentAttempts" ("WebhookStatus");
```

---

## 7. Production Logs, Recent Incidents & Error Analysis

### Incident 1: Unapplied Table Migration (`42P01: relation "PaymentAttempts" does not exist`)
* **Trigger:** Calling `GET /api/subscription/my-payments` or `/api/superadmin/payment-audit` on a database instance where migration `20260825061720_AddPaymentAttempts` had not yet executed.
* **Resolution:** Integrated the raw DDL into the API startup Self-Healing Guard in `Program.cs`, guaranteeing the table exists on any environment upon server startup.

### Incident 2: Paymob Order `594308791` (250 EGP Top-Up) Webhook Timeout
* **Details:** Checkout session `SUB_1c12b0cf85054d0a8d55617daf3f30a2_594308791` was initiated by Tenant `1c12b0cf-8505-4d0a-8d55-617daf3f30a2`.
* **Behavior:** The transaction was initiated, but the Paymob server-to-server POST webhook callback did not reach the Railway endpoint within the 15-minute validity window.
* **Audit State:** Marked with `WebhookStatus: "NeverArrived"`, `ErrorMessage: "Paymob webhook callback never reached server (Order ID 594308791)"`.
* **Action Required in Paymob Dashboard:** Verify that the **Transaction Processed Callback** is enabled for your card integration and pointed to `https://structo-production.up.railway.app/api/payments/paymob-callback`.
