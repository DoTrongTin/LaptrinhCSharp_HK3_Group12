namespace TuneVault.Application.Features.Playlist.DTOs;

public class PlaylistDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public Guid UserId { get; set; }
}