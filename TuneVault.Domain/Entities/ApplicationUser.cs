using Microsoft.AspNetCore.Identity;

namespace TuneVault.Domain.Entities;

public class ApplicationUser : IdentityUser
{
    public string? Bio { get; set; }
    public string? AvatarPath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<MediaItem> MediaItems { get; set; } = [];
    public ICollection<Playlist> Playlists { get; set; } = [];
    public ICollection<Notification> Notifications { get; set; } = [];
}
