using FluentValidation;

namespace TuneVault.Application.Features.Share.Commands.ShareMedia;

public class ShareMediaValidator : AbstractValidator<ShareMediaCommand>
{
    public ShareMediaValidator()
    {
        RuleFor(x => x.SenderId)
            .NotEmpty()
            .WithMessage("SenderId không được rỗng.");

        RuleFor(x => x.ReceiverId)
            .NotEmpty()
            .WithMessage("ReceiverId không được rỗng.");

        RuleFor(x => x)
            .Must(x => x.SenderId != x.ReceiverId)
            .WithMessage("Không thể chia sẻ cho chính mình.");

        RuleFor(x => x)
            .Must(x =>
                (x.MediaItemId.HasValue && !x.PlaylistId.HasValue) ||
                (!x.MediaItemId.HasValue && x.PlaylistId.HasValue))
            .WithMessage("Chỉ được chia sẻ 1 media hoặc 1 playlist.");

        RuleFor(x => x.Message)
            .MaximumLength(500)
            .WithMessage("Tin nhắn không được vượt quá 500 ký tự.");
    }
}