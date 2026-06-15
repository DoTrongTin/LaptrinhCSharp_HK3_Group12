namespace TuneVault.Domain.Entities;

public class Notification
{
    public Guid Id { get; set; } 
    public Guid UserId { get; set; }
    public string Type { get; set; } = ""; // share | follow | like
    public string Payload { get; set; } = "{}";
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser User { get; set; } = null!;
}
