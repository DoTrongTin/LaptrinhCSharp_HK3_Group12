using FluentValidation;

namespace TuneVault.Application.Features.Auth.Commands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(v => v.Email)
                .NotEmpty().WithMessage("Vui lòng nhập Email.");

            RuleFor(v => v.Password)
                .NotEmpty().WithMessage("Vui lòng nhập mật khẩu.");
        }
    }
}