using System;

namespace TuneVault.Domain.Entities
{
    public class PlayHistory
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid MediaItemId { get; set; }
        public DateTime PlayedAt { get; set; } = DateTime.UtcNow;

        // Quan hệ với bảng bài hát
        public MediaItem MediaItem { get; set; } = null!;
    }
}