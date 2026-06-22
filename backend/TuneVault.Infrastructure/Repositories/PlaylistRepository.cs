using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly AppDbContext _context;

        public PlaylistRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Playlist?> GetByIdWithTracksAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Playlists
                .Include(p => p.User)
                .Include(p => p.PlaylistTracks)
                    .ThenInclude(pt => pt.MediaItem)
                .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        }

        public async Task<IEnumerable<Playlist>> GetUserPlaylistsAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await _context.Playlists
                .Include(p => p.PlaylistTracks)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task AddAsync(Playlist playlist, CancellationToken cancellationToken = default)
        {
            await _context.Playlists.AddAsync(playlist, cancellationToken);
        }

        public void Update(Playlist playlist)
        {
            _context.Playlists.Update(playlist);
        }

        public void Delete(Playlist playlist)
        {
            _context.Playlists.Remove(playlist);
        }

        public async Task AddTrackAsync(PlaylistTrack playlistTrack, CancellationToken cancellationToken = default)
        {
            await _context.PlaylistTracks.AddAsync(playlistTrack, cancellationToken);
        }

        public void RemoveTrack(PlaylistTrack playlistTrack)
        {
            _context.PlaylistTracks.Remove(playlistTrack);
        }
    }
}