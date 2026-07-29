using FluentValidation;
using Structo.Core.DTOs.Auth;

namespace Structo.Core.Validators;

public class TenantRegisterDtoValidator : AbstractValidator<TenantRegisterDto>
{
    public TenantRegisterDtoValidator()
    {
        RuleFor(x => x.CompanyName).NotEmpty().WithMessage("Company Name is required.").SafeText();
        RuleFor(x => x.BusinessDomain).NotEmpty().SafeText();
        RuleFor(x => x.OwnerName).NotEmpty().SafeText();
        RuleFor(x => x.AdminEmail).NotEmpty().EmailAddress().SafeText();
        RuleFor(x => x.Location).SafeText();
        RuleFor(x => x.PersonalPhone).SafeText();
        RuleFor(x => x.WhatsAppPhone).SafeText();
        RuleFor(x => x.CommercialRegister).SafeText();
        RuleFor(x => x.TaxCard).SafeText();
        RuleFor(x => x.NationalId).SafeText();
        RuleFor(x => x.SyndicateId).SafeText();
        RuleFor(x => x.ManualAddress).SafeText();
    }
}
