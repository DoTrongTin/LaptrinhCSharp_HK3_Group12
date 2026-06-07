using System;

namespace TuneVault.Domain.Entities;

public class Favorite
{
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public Guid MediaItemId { get; set; }
    public MediaItem MediaItem { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
