using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TuneVault.Domain.Interfaces;

namespace TuneVault.Application.Features.Media.Commands.DeleteMedia
{
    public class DeleteMediaHandler : IRequestHandler<DeleteMediaCommand, bool>
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeleteMediaHandler(IMediaRepository mediaRepository, IUnitOfWork unitOfWork)
        {
            _mediaRepository = mediaRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteMediaCommand request, CancellationToken cancellationToken)
        {
            var mediaItem = await _mediaRepository.GetByIdAsync(request.Id, cancellationToken);

            if (mediaItem == null) return false; // Không tìm thấy bài hát

            // 🌟 THỰC THI XÓA MỀM: Không xóa khỏi DB, chỉ đổi cờ trạng thái
            mediaItem.IsDeleted = true;
            _mediaRepository.Update(mediaItem);

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}