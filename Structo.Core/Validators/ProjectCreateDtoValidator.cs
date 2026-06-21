using FluentValidation;
using Structo.Core.DTOs.Projects;

namespace Structo.Core.Validators;

public class ProjectCreateDtoValidator : AbstractValidator<ProjectCreateDto>
{
    public ProjectCreateDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Project name is required.");
        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate).When(x => x.EndDate.HasValue)
            .WithMessage("End date must be greater than start date.");
    }
}
