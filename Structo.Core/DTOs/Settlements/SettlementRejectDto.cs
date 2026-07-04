using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Settlements;

public class SettlementRejectDto
{
    [Required]
    [MaxLength(500)]
    public string Comments { get; set; } = string.Empty;
}
