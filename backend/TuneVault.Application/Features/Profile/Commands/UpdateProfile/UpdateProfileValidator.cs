using FluentValidation;

namespace TuneVault.Application.Features.Profile.Commands.UpdateProfile;

public class UpdateProfileValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileValidator()
    {
        // Kiểm tra UserName
        RuleFor(x => x.UserName)
            .NotEmpty().WithMessage("Tên người dùng không được để trống.")
            .MaximumLength(50).WithMessage("Tên người dùng không được vượt quá 50 ký tự.");

        // Kiểm tra Bio
        RuleFor(x => x.Bio)
            .MaximumLength(200).WithMessage("Tiểu sử không được vượt quá 200 ký tự.");
            
        // (Tùy chọn) Kiểm tra định dạng AvatarPath nếu bạn muốn
        RuleFor(x => x.AvatarPath)
            .MaximumLength(500).WithMessage("Đường dẫn ảnh quá dài.")
            .When(x => !string.IsNullOrEmpty(x.AvatarPath));
    }
}