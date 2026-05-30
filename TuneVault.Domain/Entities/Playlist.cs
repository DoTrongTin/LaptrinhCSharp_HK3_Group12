namespace TuneVault.Domain.Entities;

public class Playlist
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? CoverPath { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string OwnerId { get; set; } = "";
    public ApplicationUser Owner { get; set; } = null!;
    public ICollection<PlaylistTrack> Tracks { get; set; } = [];
}
