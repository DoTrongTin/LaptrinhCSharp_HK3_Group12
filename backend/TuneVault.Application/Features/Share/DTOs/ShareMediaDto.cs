namespace TuneVault.Application.Features.Share.DTOs;

public class ShareMediaDto
{
    public Guid Id { get; set; }

    public Guid SenderId { get; set; }
    public string SenderName { get; set; } = "";

    public Guid ReceiverId { get; set; }
    public string ReceiverName { get; set; } = "";

    public Guid? MediaItemId { get; set; }
    public Guid? PlaylistId { get; set; }

    public string TargetType { get; set; } = "";
    public string TargetTitle { get; set; } = "";

    public string? Message { get; set; }
    public DateTime SharedAt { get; set; }

    public bool AlreadyExisted { get; set; }
}