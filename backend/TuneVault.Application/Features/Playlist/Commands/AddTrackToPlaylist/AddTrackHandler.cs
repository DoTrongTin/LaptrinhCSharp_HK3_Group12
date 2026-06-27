using MediatR;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Playlist.Commands.AddTrackToPlaylist;

public class AddTrackHandler : IRequestHandler<AddTrackCommand, bool>
{
    private readonly IAppDbContext _context;

    public AddTrackHandler(IAppDbContext context) => _context = context;

    public async Task<bool> Handle(AddTrackCommand request, CancellationToken cancellationToken)
    {
        var track = new PlaylistTrack
        {
            PlaylistId = request.PlaylistId,
            MediaItemId = request.MediaItemId,
            AddedAt = DateTime.UtcNow
        };

        _context.PlaylistTracks.Add(track);
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}