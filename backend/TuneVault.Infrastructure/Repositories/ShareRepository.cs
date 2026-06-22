using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class ShareRepository : IShareRepository
    {
        private readonly AppDbContext _context;

        public ShareRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MediaShare>> GetInboxForUserAsync(Guid receiverId, CancellationToken cancellationToken = default)
        {
            return await _context.MediaShares
                .Include(s => s.Sender)
                .Include(s => s.MediaItem)
                .Include(s => s.Playlist)
                .Where(s => s.ReceiverId == receiverId)
                .OrderByDescending(s => s.SharedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task AddAsync(MediaShare share, CancellationToken cancellationToken = default)
        {
            await _context.MediaShares.AddAsync(share, cancellationToken);
        }
    }
}