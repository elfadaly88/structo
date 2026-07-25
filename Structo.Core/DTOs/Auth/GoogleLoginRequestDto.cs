namespace Structo.Core.DTOs.Auth;

public class GoogleLoginRequestDto
{
    public string IdToken { get; set; } = string.Empty;
    public string? SubscriptionPlan { get; set; }
}
