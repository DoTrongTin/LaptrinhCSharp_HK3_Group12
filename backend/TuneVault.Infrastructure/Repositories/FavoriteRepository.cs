using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.Infrastructure.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly AppDbContext _context;

        public FavoriteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Favorite?> GetByUserAndMediaAsync(Guid userId, Guid mediaItemId, CancellationToken cancellationToken = default)
        {
            return await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.MediaItemId == mediaItemId, cancellationToken);
        }

        public async Task AddAsync(Favorite favorite, CancellationToken cancellationToken = default)
        {
            await _context.Favorites.AddAsync(favorite, cancellationToken);
        }

        public void Remove(Favorite favorite)
        {
            _context.Favorites.Remove(favorite);
        }
    }
}