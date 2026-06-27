using Structo.Core.Enums;

namespace Structo.Core.DTOs.PettyCash;

public class PettyCashSettleDto
{
    public decimal SpentAmount { get; set; }
    public string ReceiptDescription { get; set; } = string.Empty;
    public string ReceiptPhotoUrl { get; set; } = string.Empty;
    public PaymentMethod SettlementPaymentMethod { get; set; }
    public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;
}
