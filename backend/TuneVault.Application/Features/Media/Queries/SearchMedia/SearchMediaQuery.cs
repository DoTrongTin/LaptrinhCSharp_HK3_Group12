using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Media.DTOs;
using System.Collections.Generic;

namespace TuneVault.Application.Features.Media.Queries.SearchMedia
{
    // Đảm bảo phần generic là List<MediaItemDto> thuộc namespace Features
    public class SearchMediaQuery : IRequest<ApiResponse<List<MediaItemDto>>>
    {
        public string Keyword { get; set; } = string.Empty;
    }
}