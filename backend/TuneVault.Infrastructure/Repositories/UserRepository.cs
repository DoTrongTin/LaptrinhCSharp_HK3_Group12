using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        }

        public async Task AddFollowAsync(Follow follow, CancellationToken cancellationToken = default)
        {
            await _context.Follows.AddAsync(follow, cancellationToken);
        }

        public void RemoveFollow(Follow follow)
        {
            _context.Follows.Remove(follow);
        }

        public async Task<bool> IsFollowingAsync(Guid followerId, Guid followeeId, CancellationToken cancellationToken = default)
        {
            return await _context.Follows.AnyAsync(f => f.FollowerId == followerId && f.FolloweeId == followeeId, cancellationToken);
        }

        public async Task<IEnumerable<PlayHistory>> GetRecentPlayHistoryAsync(Guid userId, int limit = 10, CancellationToken cancellationToken = default)
        {
            return await _context.PlayHistories
                .Include(p => p.MediaItem)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.PlayedAt)
                .Take(limit)
                .ToListAsync(cancellationToken);
        }

        public async Task AddPlayHistoryAsync(PlayHistory history, CancellationToken cancellationToken = default)
        {
            await _context.PlayHistories.AddAsync(history, cancellationToken);
        }
    }
}