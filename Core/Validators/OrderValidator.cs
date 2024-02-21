using Core.Entities;
using FluentValidation;

namespace Core.Validators
{
    public class OrderValidator : AbstractValidator<Order>
    {
        public OrderValidator()
        {
            RuleFor(r => r.Name)
                .NotEmpty()
                    .WithMessage("Can't be empty")
                .MinimumLength(3)
                    .WithMessage("Too short");

            RuleFor(r => r.Address)
                .NotEmpty()
                    .WithMessage("Can't be empty")
                .MinimumLength(3)
                    .WithMessage("Too short");

            RuleFor(r => r.Payment)
                .NotEmpty()
                    .WithMessage("Can't be empty");
        }
    }
}
