namespace TuneVault.Domain.Entities;

public class MediaItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string FilePath { get; set; } = "";
    public string MediaType { get; set; } = "audio"; // "audio" | "video"
    public string MimeType { get; set; } = "";
    public long FileSize { get; set; }
    public int Duration { get; set; }
    public string? ThumbnailPath { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string OwnerId { get; set; } = "";
    public ApplicationUser Owner { get; set; } = null!;

    public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = [];
    public ICollection<Favorite> Favorites { get; set; } = [];
    public ICollection<PlayHistory> PlayHistories { get; set; } = [];
    public ICollection<MediaShare> Shares { get; set; } = [];
}
