using System;

namespace TuneVault.Domain.Entities;

public class PlayHistory
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public Guid MediaItemId { get; set; }
    public MediaItem MediaItem { get; set; } = null!;

    public DateTime PlayedAt { get; set; } = DateTime.UtcNow;
}
