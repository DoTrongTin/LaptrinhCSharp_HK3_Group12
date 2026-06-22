using FluentValidation;

namespace TuneVault.Application.Features.Media.Commands.UploadMedia
{
    public class UploadMediaCommandValidator : AbstractValidator<UploadMediaCommand>
    {
        public UploadMediaCommandValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty().WithMessage("Tên bài hát không được để trống.")
                .MaximumLength(150).WithMessage("Tên bài hát không được vượt quá 150 ký tự.");

            RuleFor(p => p.FilePath)
                .NotEmpty().WithMessage("Đường dẫn tệp tin âm thanh không hợp lệ.");

            RuleFor(p => p.OwnerId)
                .NotEmpty().WithMessage("Không xác định được ID của người tải lên.");
                
            // Thumbnail có thể rỗng (dùng ảnh mặc định), nên không cần NotEmpty
            RuleFor(p => p.ThumbnailPath)
                .MaximumLength(500).WithMessage("Đường dẫn ảnh bìa quá dài.");
        }
    }
}