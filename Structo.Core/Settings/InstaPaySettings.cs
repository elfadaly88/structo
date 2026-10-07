using System.Linq;

namespace Structo.Core.Settings;

/// <summary>Bound from configuration section "Payments:InstaPay".</summary>
public class InstaPaySettings
{
    /// <summary>InstaPay number/handle to transfer to, international format, digits only.</summary>
    public string? Number { get; set; }

    /// <summary>WhatsApp number that receives receipts, international format, digits only (used for wa.me links).</summary>
    public string? WhatsAppNumber { get; set; }

    /// <summary>InstaPay is offered only when both numbers are present and digits-only.</summary>
    public bool IsConfigured => IsDigits(Number) && IsDigits(WhatsAppNumber);

    private static bool IsDigits(string? value) => !string.IsNullOrWhiteSpace(value) && value.All(char.IsDigit);
}
