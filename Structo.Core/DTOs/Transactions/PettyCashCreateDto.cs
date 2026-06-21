using System;

namespace Structo.Core.DTOs.Transactions;

public class PettyCashCreateDto
{
    public Guid IssuedToUserId { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
}
