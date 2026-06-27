using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;

namespace TuneVault.Application.Features.Playlist.Commands.DeletePlaylist;

public class DeletePlaylistHandler : IRequestHandler<DeletePlaylistCommand, bool>
{
    private readonly IAppDbContext _context;

    public DeletePlaylistHandler(IAppDbContext context) => _context = context;

    public async Task<bool> Handle(DeletePlaylistCommand request, CancellationToken cancellationToken)
    {
        var playlist = await _context.Playlists
            .FirstOrDefaultAsync(p => p.Id == request.PlaylistId, cancellationToken);

        if (playlist == null || playlist.UserId != request.UserId) 
            return false; // Không tồn tại hoặc không phải chủ sở hữu

        _context.Playlists.Remove(playlist);
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}