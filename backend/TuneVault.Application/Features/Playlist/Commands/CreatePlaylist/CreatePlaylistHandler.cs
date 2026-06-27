using MediatR;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Playlist.DTOs;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Playlist.Commands.CreatePlaylist;

public class CreatePlaylistHandler : IRequestHandler<CreatePlaylistCommand, PlaylistDto>
{
    private readonly IAppDbContext _context;

    public CreatePlaylistHandler(IAppDbContext context) => _context = context;

    public async Task<PlaylistDto> Handle(CreatePlaylistCommand request, CancellationToken cancellationToken)
    {
        var playlist = new Domain.Entities.Playlist
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            UserId = request.UserId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Playlists.Add(playlist);
        await _context.SaveChangesAsync(cancellationToken);

        return new PlaylistDto 
        { 
            Id = playlist.Id, 
            Title = playlist.Title, 
            UserId = playlist.UserId 
        };
    }
}