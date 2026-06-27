using MediatR;

namespace TuneVault.Application.Features.Playlist.Commands.DeletePlaylist;

public class DeletePlaylistCommand : IRequest<bool>
{
    public Guid PlaylistId { get; set; }
    public Guid UserId { get; set; } // Để kiểm tra quyền sở hữu
}