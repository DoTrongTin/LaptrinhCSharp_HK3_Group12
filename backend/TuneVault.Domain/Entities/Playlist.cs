using System;
using System.Collections.Generic;

namespace TuneVault.Domain.Entities;

public class Playlist
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = [];
}
