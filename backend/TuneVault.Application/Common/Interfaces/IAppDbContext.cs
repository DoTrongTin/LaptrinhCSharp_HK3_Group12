using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<ApplicationUser> Users { get; }
    DbSet<MediaItem> MediaItems { get; }
    DbSet<Playlist> Playlists { get; }
    DbSet<MediaShare> MediaShares { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}