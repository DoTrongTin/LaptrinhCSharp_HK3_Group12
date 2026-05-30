namespace TuneVault.Domain.Entities;

public class PlaylistTrack
{
    public Guid PlaylistId { get; set; }
    public Guid MediaItemId { get; set; }
    public int Order { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    public Playlist Playlist { get; set; } = null!;
    public MediaItem MediaItem { get; set; } = null!;
}
