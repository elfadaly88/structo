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

        // 1. Resolve HMAC signature from Query or Header
        var incomingHmac = hmac
            ?? Request.Headers["hmac"].FirstOrDefault()
            ?? Request.Headers["X-Paymob-Hmac"].FirstOrDefault();

        // 2. Parse payload
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

        // Try extract from data/extras
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
        
        // Redirect to Frontend Success Page
        var isSuccess = string.Equals(success, "true", StringComparison.OrdinalIgnoreCase);
        if (isSuccess)
        {
            return Redirect($"/dashboard/subscription/success?txnId={id}");
        }

        return Redirect($"/dashboard/projects?paymentStatus=failed&txnId={id}");
    }
}
