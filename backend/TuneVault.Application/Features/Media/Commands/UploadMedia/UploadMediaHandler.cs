using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TuneVault.Application.Features.Media.Commands.UploadMedia
{
    public class UploadMediaHandler : IRequestHandler<UploadMediaCommand, ApiResponse<Guid>>
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UploadMediaHandler(IMediaRepository mediaRepository, IUnitOfWork unitOfWork)
        {
            _mediaRepository = mediaRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse<Guid>> Handle(UploadMediaCommand request, CancellationToken cancellationToken)
        {
            var mediaItem = new MediaItem
            {
                Id = Guid.NewGuid(),
                Title = string.IsNullOrWhiteSpace(request.Title) ? "Bài hát chưa đặt tên" : request.Title,
                FilePath = request.FilePath,
                ThumbnailPath = request.ThumbnailPath,
                OwnerId = request.OwnerId,
                CreatedAt = DateTime.UtcNow,
                MediaType = TuneVault.Domain.Enums.MediaType.Audio
            };

            await _mediaRepository.AddAsync(mediaItem, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return ApiResponse<Guid>.SuccessResponse(mediaItem.Id, "Tải bài hát lên thư viện thành công!");
        }
    }
}