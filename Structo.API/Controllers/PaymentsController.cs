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
    private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
    private readonly ITenantQuotaService _quotaService;

    public PaymentsController(
        StructoDbContext context,
        IPaymobService paymobService,
        INotificationEngine notificationEngine,
        ILogger<PaymentsController> logger,
        Microsoft.Extensions.Configuration.IConfiguration configuration,
        ITenantQuotaService quotaService)
    {
        _context = context;
        _paymobService = paymobService;
        _notificationEngine = notificationEngine;
        _logger = logger;
        _configuration = configuration;
        _quotaService = quotaService;
    }

    /// <summary>
    /// Webhook receiver for Paymob payment transaction callbacks.
    /// </summary>
    [HttpPost("paymob-callback")]
    [HttpPost("callback")]
    public async Task<IActionResult> PaymobCallback([FromQuery] string? hmac)
    {
        _logger.LogInformation("Paymob webhook received ({Length} bytes)", Request.ContentLength);
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
                // The body is unsigned, so nothing in it (order id, reference) may change stored data: log only
                _logger.LogWarning("Paymob HMAC signature verification failed for claimed order {OrderId}. Nothing recorded.", orderIdStr);

                return Unauthorized(new { success = false, message = "HMAC verification failed" });
            }
        }
        else
        {
            _logger.LogWarning("Paymob webhook received WITHOUT HMAC signature. Rejecting.");
            return Unauthorized(new { success = false, message = "HMAC signature required" });
        }

        // Kill switch (Payments:PaymobEnabled, default off): acknowledge a genuine webhook but credit nothing
        if (!_configuration.GetValue("Payments:PaymobEnabled", false))
        {
            _logger.LogWarning("Paymob webhook received while payments are disabled; nothing credited. Transaction {TxnId}, order {OrderId}, reference {Reference}",
                objNode["id"]?.ToString(), orderIdStr, specialRef);
            return Ok(new { success = false, message = "Payments are disabled; nothing was credited." });
        }

        // 4. Find the checkout by Paymob's signed order id. Tenant, package and price come ONLY from this row;
        //    unsigned fields (extras, data, merchant_order_id) are never used to decide what to credit.
        var transactionId = objNode["id"]?.ToString() ?? "";
        var attempt = string.IsNullOrWhiteSpace(orderIdStr)
            ? null
            : await _context.PaymentAttempts.IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(pa => pa.PaymobOrderId == orderIdStr);

        if (attempt == null)
        {
            _logger.LogWarning("Paymob webhook for unknown order {OrderId} (transaction {TxnId}); nothing credited.", orderIdStr, transactionId);
            return Ok(new { success = false, message = "Unknown order; nothing was credited." });
        }

        var success = objNode["success"]?.GetValue<bool>() ?? false;
        var pending = objNode["pending"]?.GetValue<bool>() ?? false;
        var refundedOrVoided = (objNode["is_refunded"]?.GetValue<bool>() ?? false) || (objNode["is_voided"]?.GetValue<bool>() ?? false);
        var amountCents = objNode["amount_cents"]?.GetValue<long>() ?? 0;
        var currency = objNode["currency"]?.ToString() ?? "";
        var sourceSubType = objNode["source_data"]?["sub_type"]?.ToString() ?? "Card";

        _logger.LogInformation("Paymob webhook: order {OrderId}, transaction {TxnId}, success={Success}, pending={Pending}, amount_cents={AmountCents}",
            orderIdStr, transactionId, success, pending, amountCents);

        if (!success || pending || refundedOrVoided)
        {
            await MarkAttemptAsync(attempt.Id, "Failed", $"Paymob transaction {transactionId}: success={success}, pending={pending}, refunded/voided={refundedOrVoided}");
            return Ok(new { success = true, message = "Callback received; transaction not successful, nothing credited." });
        }

        if (attempt.AmountCents <= 0 || amountCents != attempt.AmountCents || !string.Equals(currency, "EGP", StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogWarning("Paymob amount mismatch for order {OrderId}: paid {Paid} {Currency}, expected {Expected} EGP cents. Nothing credited.",
                orderIdStr, amountCents, currency, attempt.AmountCents);
            await MarkAttemptAsync(attempt.Id, "AmountMismatch", $"Paid {amountCents} {currency} cents, expected {attempt.AmountCents} EGP cents (transaction {transactionId}).");
            return Ok(new { success = false, message = "Amount does not match the order; nothing was credited." });
        }

        // 5. Credit exactly once: compare-and-set claims the attempt; the quota increment and the claim commit together,
        //    so a duplicate or concurrent webhook for the same order finds it already claimed and credits nothing.
        var referenceNumber = $"PAYMOB-{transactionId}";
        var now = DateTime.UtcNow;
        var topUp = await _quotaService.InTransactionAsync(async () =>
        {
            var claimed = await _context.PaymentAttempts.IgnoreQueryFilters()
                .Where(pa => pa.Id == attempt.Id && pa.LinkedTransactionId == null && pa.WebhookStatus != "Confirmed")
                .ExecuteUpdateAsync(u => u
                    .SetProperty(pa => pa.WebhookStatus, "Confirmed")
                    .SetProperty(pa => pa.WebhookReceivedAt, now)
                    .SetProperty(pa => pa.ErrorMessage, (string?)null));
            if (claimed == 0)
                return null;

            var result = await _quotaService.AddProjectsAsync(new QuotaTopUp(
                attempt.TenantId,
                attempt.ExtraProjectsCount,
                attempt.Amount,
                TransactionType: "AddOnTopUp",
                PaymentGateway: "Paymob",
                PaymentMethod: sourceSubType,
                ReferenceNumber: referenceNumber))
                ?? throw new InvalidOperationException($"Tenant {attempt.TenantId} of Paymob order {orderIdStr} no longer exists.");

            await _context.PaymentAttempts.IgnoreQueryFilters()
                .Where(pa => pa.Id == attempt.Id)
                .ExecuteUpdateAsync(u => u.SetProperty(pa => pa.LinkedTransactionId, result.TransactionId));
            return result;
        });

        if (topUp == null)
        {
            _logger.LogInformation("Paymob order {OrderId} was already credited; duplicate webhook ignored.", orderIdStr);
            return Ok(new { success = true, message = "Transaction already processed." });
        }

        _logger.LogInformation("Paymob order {OrderId}: tenant {TenantId} +{Projects} projects (now {MaxProjects}). Reference {Ref}",
            orderIdStr, attempt.TenantId, attempt.ExtraProjectsCount, topUp.NewMaxActiveProjects, referenceNumber);

        // 6. Notify the tenant owner (best-effort)
        try
        {
            await _notificationEngine.RaiseSubscriptionUpgradedNotificationAsync(attempt.TenantId, $"+{attempt.ExtraProjectsCount} Projects", topUp.NewMaxActiveProjects);
        }
        catch (Exception notifEx)
        {
            _logger.LogWarning(notifEx, "Failed to send subscription upgraded notification to Tenant {TenantId}", attempt.TenantId);
        }

        return Ok(new
        {
            success = true,
            message = "Subscription upgraded successfully",
            tenantId = attempt.TenantId,
            newMaxProjects = topUp.NewMaxActiveProjects,
            reference = referenceNumber
        });
    }

    /// <summary>Records a non-crediting webhook outcome on an attempt that has not been confirmed.</summary>
    private async Task MarkAttemptAsync(Guid attemptId, string status, string error)
    {
        var now = DateTime.UtcNow;
        var message = error.Length > 500 ? error[..500] : error;
        await _context.PaymentAttempts.IgnoreQueryFilters()
            .Where(pa => pa.Id == attemptId && pa.WebhookStatus != "Confirmed")
            .ExecuteUpdateAsync(u => u
                .SetProperty(pa => pa.WebhookStatus, status)
                .SetProperty(pa => pa.WebhookReceivedAt, now)
                .SetProperty(pa => pa.ErrorMessage, message));
    }

    /// <summary>
    /// Transaction Response GET Callback (For Redirections from Paymob Checkout).
    /// The browser can forge these query parameters, so this endpoint never credits anything:
    /// it only shows the result page. Crediting happens solely in the signed POST webhook.
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
        _logger.LogInformation("Paymob Redirect Callback (GET): success={Success}, id={Id}, pending={Pending}, txnResponseCode={TxnCode}", 
            success, id, pending, txnResponseCode);
        
        var isSuccess = string.Equals(success, "true", StringComparison.OrdinalIgnoreCase);
        var isPending = string.Equals(pending, "true", StringComparison.OrdinalIgnoreCase);

        if (isSuccess && !isPending)
        {
            return Redirect($"/dashboard/subscription/success?txnId={id}");
        }

        return Redirect($"/dashboard/subscription/failed?txnId={id}&success={success}");
    }
}
