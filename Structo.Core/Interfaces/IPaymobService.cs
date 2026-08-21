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
