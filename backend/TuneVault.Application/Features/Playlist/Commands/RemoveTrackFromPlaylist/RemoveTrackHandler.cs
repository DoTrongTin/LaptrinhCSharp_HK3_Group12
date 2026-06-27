using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;

namespace TuneVault.Application.Features.Playlist.Commands.RemoveTrackFromPlaylist;

public class RemoveTrackHandler : IRequestHandler<RemoveTrackCommand, bool>
{
    private readonly IAppDbContext _context;

    public RemoveTrackHandler(IAppDbContext context) => _context = context;

    public async Task<bool> Handle(RemoveTrackCommand request, CancellationToken cancellationToken)
    {
        // Kiểm tra playlist có thuộc về user không
        var playlist = await _context.Playlists.FindAsync(new object[] { request.PlaylistId }, cancellationToken);
        if (playlist == null || playlist.UserId != request.UserId) 
            return false;

        // Tìm track cần xóa trong join table
        var track = await _context.PlaylistTracks
            .FirstOrDefaultAsync(pt => pt.PlaylistId == request.PlaylistId && pt.MediaItemId == request.MediaItemId, cancellationToken);
        
        if (track == null) return false;

        _context.PlaylistTracks.Remove(track);
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}