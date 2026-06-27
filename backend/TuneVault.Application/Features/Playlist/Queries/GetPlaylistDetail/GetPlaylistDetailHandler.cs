using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Playlist.DTOs;
using TuneVault.Application.Features.Media.DTOs;

namespace TuneVault.Application.Features.Playlist.Queries.GetPlaylistDetail;

public class GetPlaylistDetailHandler : IRequestHandler<GetPlaylistDetailQuery, PlaylistDetailDto>
{
    private readonly IAppDbContext _context;
    public GetPlaylistDetailHandler(IAppDbContext context) => _context = context;

    public async Task<PlaylistDetailDto> Handle(GetPlaylistDetailQuery request, CancellationToken ct)
    {
        var playlist = await _context.Playlists
            .Include(p => p.PlaylistTracks).ThenInclude(pt => pt.MediaItem)
            .FirstOrDefaultAsync(p => p.Id == request.PlaylistId, ct);

        if (playlist == null) throw new KeyNotFoundException("Không tìm thấy playlist.");

        return new PlaylistDetailDto
        {
            Id = playlist.Id,
            Title = playlist.Title,
            Description = playlist.Description,
            CoverImageUrl = playlist.CoverImageUrl,
            Tracks = playlist.PlaylistTracks.Select(pt => new MediaItemDto
            {
                Id = pt.MediaItem.Id,
                Title = pt.MediaItem.Title,
                FilePath = pt.MediaItem.FilePath,
                ThumbnailPath = pt.MediaItem.ThumbnailPath ?? "",
                ArtistName = pt.MediaItem.Artist
            }).ToList()
        };
    }
}