namespace Structo.Core.DTOs.PettyCash;

public class PettyCashUpdateDto
{
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}
