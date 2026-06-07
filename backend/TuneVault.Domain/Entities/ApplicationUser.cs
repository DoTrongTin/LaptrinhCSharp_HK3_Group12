using Microsoft.AspNetCore.Identity;

namespace TuneVault.Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string? Bio { get; set; }
    public string? AvatarPath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Album> Albums { get; set; } = [];
    public ICollection<MediaItem> MediaItems { get; set; } = [];
    public ICollection<Playlist> Playlists { get; set; } = [];
    public ICollection<Notification> Notifications { get; set; } = [];
    public ICollection<Favorite> Favorites { get; set; } = [];
    public ICollection<PlayHistory> PlayHistories { get; set; } = [];
    public ICollection<MediaShare> SentShares { get; set; } = [];
    public ICollection<MediaShare> ReceivedShares { get; set; } = [];
    public ICollection<Follow> Followers { get; set; } = [];
    public ICollection<Follow> Followees { get; set; } = [];
}
