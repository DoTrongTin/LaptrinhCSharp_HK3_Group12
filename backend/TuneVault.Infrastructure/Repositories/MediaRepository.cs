using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly AppDbContext _context;

        public MediaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MediaItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.MediaItems
                .Include(m => m.Owner)
                .FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
        }

        public async Task<IEnumerable<MediaItem>> SearchAsync(string keyword, CancellationToken cancellationToken = default)
        {
            var keywordLower = keyword.ToLower();
            return await _context.MediaItems
                .Include(m => m.Owner)
                .Where(m => m.Title.ToLower().Contains(keywordLower) || 
                           (m.Owner.UserName != null && m.Owner.UserName.ToLower().Contains(keywordLower)))
                .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<MediaItem>> GetTrendingAsync(int count, CancellationToken cancellationToken = default)
        {
            return await _context.MediaItems
                .Include(m => m.Owner)
                .OrderByDescending(m => m.CreatedAt)
                .Take(count)
                .ToListAsync(cancellationToken);
        }

        public async Task AddAsync(MediaItem mediaItem, CancellationToken cancellationToken = default)
        {
            await _context.MediaItems.AddAsync(mediaItem, cancellationToken);
        }

        public void Update(MediaItem mediaItem)
        {
            _context.MediaItems.Update(mediaItem);
        }

        public void Delete(MediaItem mediaItem)
        {
            _context.MediaItems.Remove(mediaItem);
        }
    }
}