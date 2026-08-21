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

    [JsonPropertyName("profile_id")]
    public long? ProfileId { get; set; }

    [JsonPropertyName("has_parent_transaction")]
    public bool HasParentTransaction { get; set; }

    [JsonPropertyName("error_occured")]
    public bool ErrorOccured { get; set; }

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

    [JsonPropertyName("collector")]
    public object? Collector { get; set; }

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
