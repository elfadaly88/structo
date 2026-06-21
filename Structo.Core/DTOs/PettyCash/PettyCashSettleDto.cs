namespace Structo.Core.DTOs.PettyCash;

public class PettyCashSettleDto
{
    public decimal SpentAmount { get; set; }
    public string ReceiptDescription { get; set; } = string.Empty;
}
