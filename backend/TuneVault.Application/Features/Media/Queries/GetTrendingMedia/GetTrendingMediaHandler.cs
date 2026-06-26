using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Media.DTOs;
using TuneVault.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace TuneVault.Application.Features.Media.Queries.GetTrendingMedia
{
    public class GetTrendingMediaHandler : IRequestHandler<GetTrendingMediaQuery, ApiResponse<List<MediaItemDto>>>
    {
        private readonly IMediaRepository _mediaRepository;

        public GetTrendingMediaHandler(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        public async Task<ApiResponse<List<MediaItemDto>>> Handle(GetTrendingMediaQuery request, CancellationToken cancellationToken)
        {
            var items = await _mediaRepository.GetTrendingAsync(request.Count, cancellationToken);
            
            var dtoList = items.Select(m => new MediaItemDto
            {
                Id = m.Id,
                Title = m.Title,
                FilePath = m.FilePath,
                ThumbnailPath = m.ThumbnailPath ?? string.Empty,
                ArtistName = m.Artist,
                OwnerName = m.Owner?.UserName ?? "TuneVault User",
                ArtistId = m.OwnerId
            }).ToList();

            return ApiResponse<List<MediaItemDto>>.SuccessResponse(dtoList, "Lấy danh sách nổi bật thành công.");
        }
    }
}