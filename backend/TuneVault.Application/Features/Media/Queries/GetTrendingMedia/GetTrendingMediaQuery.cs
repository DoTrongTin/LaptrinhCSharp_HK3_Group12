using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Media.DTOs;
using System.Collections.Generic;

namespace TuneVault.Application.Features.Media.Queries.GetTrendingMedia
{
    public class GetTrendingMediaQuery : IRequest<ApiResponse<List<MediaItemDto>>>
    {
        public int Count { get; set; } = 20;
    }
}