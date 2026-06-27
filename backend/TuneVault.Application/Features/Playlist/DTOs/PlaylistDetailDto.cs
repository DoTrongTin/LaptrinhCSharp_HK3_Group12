using TuneVault.Application.Features.Media.DTOs;

namespace TuneVault.Application.Features.Playlist.DTOs;

public class PlaylistDetailDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    
    // Danh sách bài hát (Dùng lại MediaItemDto đã có)
    public List<MediaItemDto> Tracks { get; set; } = new();
}