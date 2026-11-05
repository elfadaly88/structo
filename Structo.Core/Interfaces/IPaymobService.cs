using System.Threading.Tasks;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Entities;

namespace Structo.Core.Interfaces;

public interface IPaymobService
{
    /// <summary>
    /// Creates a payment intention / payment key with Paymob and returns checkout URL.
    /// Price and quantity come only from the server price list (<paramref name="package"/>); the returned OrderId
    /// is Paymob's numeric order id, which the webhook uses to find the attempt.
    /// </summary>
    Task<PaymobCheckoutResponseDto> CreatePaymentIntentAsync(
        Tenant tenant,
        User user,
        Structo.Core.Services.ProjectPackages.Package package);

    /// <summary>
    /// Validates HMAC signature from Paymob transaction payload.
    /// </summary>
    bool ValidateHmac(string rawPayload, string incomingHmac);

    /// <summary>
    /// Validates HMAC signature from Paymob callback object.
    /// </summary>
    bool ValidateHmacFromCallback(PaymobTransactionObj transaction, string incomingHmac);
}
