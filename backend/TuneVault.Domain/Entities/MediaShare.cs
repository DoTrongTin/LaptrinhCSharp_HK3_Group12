using System;

namespace TuneVault.Domain.Entities;

public class MediaShare
{
    public Guid Id { get; set; }

    public Guid SenderId { get; set; }
    public ApplicationUser Sender { get; set; } = null!;

    public Guid ReceiverId { get; set; }
    public ApplicationUser Receiver { get; set; } = null!;

    public Guid? MediaItemId { get; set; }
    public MediaItem? MediaItem { get; set; }

    public Guid? PlaylistId { get; set; }
    public Playlist? Playlist { get; set; }

    public string? Message { get; set; }
    public DateTime SharedAt { get; set; } = DateTime.UtcNow;
}
