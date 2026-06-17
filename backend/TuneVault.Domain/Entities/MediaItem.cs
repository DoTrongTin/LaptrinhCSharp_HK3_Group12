using System;
using System.Collections.Generic;
using TuneVault.Domain.Enums;

namespace TuneVault.Domain.Entities;

public class MediaItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? PreviewUrl { get; set; }
    public string? Description { get; set; }
    public MediaType MediaType { get; set; }
    public int Duration { get; set; }
    public string FilePath { get; set; } = "";
    public string? ThumbnailPath { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid OwnerId { get; set; }
    public ApplicationUser Owner { get; set; } = null!;

    public Guid? AlbumId { get; set; }
    public Album? Album { get; set; }

    public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = [];
    public ICollection<Favorite> Favorites { get; set; } = [];
    public ICollection<PlayHistory> PlayHistories { get; set; } = [];
    public ICollection<MediaShare> Shares { get; set; } = [];
    public ICollection<MediaTag> MediaTags { get; set; } = [];
}
