using System;

namespace Structo.Core.DTOs.Transactions;

public class PettyCashMobileDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; }
    public bool IsSettled { get; set; }
    public string IssuedTo { get; set; } = string.Empty;
}
