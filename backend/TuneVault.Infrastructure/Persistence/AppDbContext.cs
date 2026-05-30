using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<MediaItem> MediaItems => Set<MediaItem>();
    public DbSet<Playlist> Playlists => Set<Playlist>();
    public DbSet<PlaylistTrack> PlaylistTracks => Set<PlaylistTrack>();
    public DbSet<MediaShare> MediaShares => Set<MediaShare>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<Favorite> Favorites => Set<Favorite>();
    public DbSet<PlayHistory> PlayHistories => Set<PlayHistory>();
    public DbSet<Follow> Follows => Set<Follow>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
