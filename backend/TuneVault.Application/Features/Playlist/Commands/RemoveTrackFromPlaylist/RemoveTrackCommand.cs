using MediatR;

namespace TuneVault.Application.Features.Playlist.Commands.RemoveTrackFromPlaylist;

public class RemoveTrackCommand : IRequest<bool>
{
    public Guid PlaylistId { get; set; }
    public Guid MediaItemId { get; set; }
    public Guid UserId { get; set; } // Để kiểm tra quyền sở hữu playlist
}