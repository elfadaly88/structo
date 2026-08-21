using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
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
using Structo.Core.Enums;
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
        
        // Priority: Environment variables -> IOptions / Configuration
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
        // 1. Calculate Plan & Pricing
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

        // 2. Try Modern Intention API First (if SecretKey is available)
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
                    ["payment_methods"] = new[] { "card" },
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

        // 3. Fallback: Classic 3-step Paymob Payment Keys API
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
        var apiKey = _settings.ApiKey;
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            apiKey = _settings.SecretKey; // Some configurations use SecretKey as API token
        }

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
