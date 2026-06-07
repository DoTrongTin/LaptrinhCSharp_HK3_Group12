using System;
using System.Collections.Generic;

namespace TuneVault.Domain.Entities;

public class Album
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? CoverImageUrl { get; set; }
    public DateTime? ReleaseDate { get; set; }

    public Guid OwnerId { get; set; }
    public ApplicationUser Owner { get; set; } = null!;

    public ICollection<MediaItem> MediaItems { get; set; } = [];
}
