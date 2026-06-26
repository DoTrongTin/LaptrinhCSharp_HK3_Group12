using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class PlayHistoryRepository : IPlayHistoryRepository
    {
        private readonly AppDbContext _context;

        public PlayHistoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PlayHistory?> GetByUserAndMediaAsync(Guid userId, Guid mediaItemId, CancellationToken cancellationToken = default)
        {
            return await _context.PlayHistories
                .FirstOrDefaultAsync(h => h.UserId == userId && h.MediaItemId == mediaItemId, cancellationToken);
        }

        public async Task AddAsync(PlayHistory playHistory, CancellationToken cancellationToken = default)
        {
            await _context.PlayHistories.AddAsync(playHistory, cancellationToken);
        }
    }
}