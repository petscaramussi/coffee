using Core.Entities;
using FluentValidation;

namespace Core.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(r => r.Name)
                .NotEmpty()
                    .WithMessage("Can't be empty")
                .MinimumLength(3)
                    .WithMessage("Too short");

            RuleFor(r => r.Description)
                .NotEmpty()
                    .WithMessage("Can't be empty")
                .MinimumLength(3)
                    .WithMessage("Too short");

            RuleFor(r => r.Price)
                .GreaterThan(0)
                .When(r => r.Price.HasValue);
        }
    }
}
