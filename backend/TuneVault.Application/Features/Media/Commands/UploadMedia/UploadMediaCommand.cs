using MediatR;
using TuneVault.Application.Common.Models;
using System;

namespace TuneVault.Application.Features.Media.Commands.UploadMedia
{
    public class UploadMediaCommand : IRequest<ApiResponse<Guid>>
    {
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = "Nghệ sĩ ẩn danh";
        public string FilePath { get; set; } = string.Empty;
        public string ThumbnailPath { get; set; } = string.Empty;
        public Guid OwnerId { get; set; }
        public int Duration { get; set; } 
    }
}