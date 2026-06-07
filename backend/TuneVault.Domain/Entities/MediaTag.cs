using System;

namespace TuneVault.Domain.Entities
{
    public class MediaTag
    {
        public Guid MediaItemId { get; set; }
        public string TagName { get; set; } = null!;

        // Navigation
        public MediaItem? MediaItem { get; set; }
    }
}
