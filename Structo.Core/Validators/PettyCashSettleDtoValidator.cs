using FluentValidation;
using Structo.Core.DTOs.PettyCash;

namespace Structo.Core.Validators;

public class PettyCashSettleDtoValidator : AbstractValidator<PettyCashSettleDto>
{
    public PettyCashSettleDtoValidator()
    {
        RuleFor(x => x.SpentAmount).GreaterThanOrEqualTo(0).WithMessage("Spent amount cannot be negative.");
        RuleFor(x => x.ReceiptDescription).NotEmpty().WithMessage("Receipt description is required.");
    }
}
