namespace Structo.Core.Settings;

public class PaymobSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public string PublicKey { get; set; } = string.Empty;
    public string HmacSecret { get; set; } = string.Empty;
    public string CardIntegrationId { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string IframeId { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://accept.paymob.com";
    /// <summary>Public URL of POST/GET /api/payments/callback sent as notification_url and redirection_url</summary>
    public string CallbackUrl { get; set; } = "https://structo-production.up.railway.app/api/payments/callback";
}
