namespace TuneVault.Application.Features.Share.DTOs;

public class ShareItemDto
{
    public Guid? MediaItemId { get; set; }
    public Guid? PlaylistId { get; set; }

    public string TargetType { get; set; } = "";
    public string TargetTitle { get; set; } = "";
}