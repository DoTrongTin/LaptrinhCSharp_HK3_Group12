namespace TuneVault.Application.Features.Playlist.DTOs;

public class CreatePlaylistDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsPublic { get; set; } = true;
}