using System;

namespace TuneVault.Application.Common.Models
{
    public class MediaItemDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string ThumbnailPath { get; set; } = string.Empty;
        public string ArtistName { get; set; } = "Nghệ sĩ ẩn danh";
        public Guid ArtistId { get; set; }
    }
}