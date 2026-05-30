namespace TuneVault.Domain.Entities;

public class PlayHistory
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = "";
    public Guid MediaItemId { get; set; }
    public DateTime PlayedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser User { get; set; } = null!;
    public MediaItem MediaItem { get; set; } = null!;
}
