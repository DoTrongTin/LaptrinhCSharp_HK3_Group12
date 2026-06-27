namespace TuneVault.Application.Features.Notification.DTOs;

public class NotificationDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public string Type { get; set; } = "";
    public string Payload { get; set; } = "{}";

    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
}