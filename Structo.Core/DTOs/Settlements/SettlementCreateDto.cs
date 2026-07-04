using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Settlements;

public class SettlementCreateDto
{
    [Required]
    public Guid PettyCashId { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "At least one settlement line is required.")]
    public List<SettlementLineCreateDto> Lines { get; set; } = [];

    public bool IsDraft { get; set; }
}
