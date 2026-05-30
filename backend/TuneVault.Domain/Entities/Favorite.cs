namespace TuneVault.Domain.Entities;

public class Favorite
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = "";
    public Guid MediaItemId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser User { get; set; } = null!;
    public MediaItem MediaItem { get; set; } = null!;
}
