using FluentValidation;
using Structo.Core.DTOs.Transactions;
using System;

namespace Structo.Core.Validators;

public class FinancialTransactionCreateDtoValidator : AbstractValidator<FinancialTransactionCreateDto>
{
    public FinancialTransactionCreateDtoValidator()
    {
        RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Amount must be greater than zero.");
        RuleFor(x => x.TransactionDate).LessThanOrEqualTo(DateTime.UtcNow).WithMessage("Transaction date cannot be in the future.");
    }
}
