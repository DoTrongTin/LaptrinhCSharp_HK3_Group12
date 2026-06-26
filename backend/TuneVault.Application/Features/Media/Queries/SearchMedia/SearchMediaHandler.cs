using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

// Tạo biệt danh trỏ thẳng tới DTO chuẩn của Features
using MediaDto = TuneVault.Application.Features.Media.DTOs.MediaItemDto;

namespace TuneVault.Application.Features.Media.Queries.SearchMedia
{
    // Khai báo SearchMediaQuery bắt cặp hoàn chỉnh với ApiResponse<List<MediaDto>>
    public class SearchMediaHandler : IRequestHandler<SearchMediaQuery, ApiResponse<List<MediaDto>>>
    {
        private readonly IMediaRepository _mediaRepository;

        public SearchMediaHandler(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        public async Task<ApiResponse<List<MediaDto>>> Handle(SearchMediaQuery request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Keyword))
            {
                return ApiResponse<List<MediaDto>>.SuccessResponse(new List<MediaDto>(), "Từ khóa rỗng.");
            }

            var items = await _mediaRepository.SearchAsync(request.Keyword, cancellationToken);
            
            var dtoList = items.Select(m => new MediaDto
            {
                Id = m.Id,
                Title = m.Title,
                FilePath = m.FilePath,
                ThumbnailPath = m.ThumbnailPath ?? string.Empty,
                ArtistName = m.Artist,             // Nghệ sĩ thực sự trình bày bài hát
                OwnerName = m.Owner?.UserName ?? "TuneVault User",     // Người upload file lên hệ thống
                ArtistId = m.OwnerId
            }).ToList();

            return ApiResponse<List<MediaDto>>.SuccessResponse(dtoList, "Tìm kiếm hoàn tất.");
        }
    }
}