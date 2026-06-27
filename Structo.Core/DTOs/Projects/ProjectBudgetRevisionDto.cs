using System;
using System.ComponentModel.DataAnnotations;

namespace Structo.Core.DTOs.Projects;

public class ProjectBudgetRevisionDto
{
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "New budget must be greater than zero.")]
    public decimal NewBudget { get; set; }

    [Required]
    [MinLength(5, ErrorMessage = "Reason for change must be at least 5 characters long.")]
    public string ReasonForChange { get; set; } = string.Empty;

    public string BoqFileUrl { get; set; } = string.Empty;
}
