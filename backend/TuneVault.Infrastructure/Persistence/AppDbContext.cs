using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence
{
    public class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Album> Albums => Set<Album>();
        public DbSet<MediaItem> MediaItems => Set<MediaItem>();
        public DbSet<Playlist> Playlists => Set<Playlist>();
        public DbSet<PlaylistTrack> PlaylistTracks => Set<PlaylistTrack>();
        public DbSet<Favorite> Favorites => Set<Favorite>();
        public DbSet<PlayHistory> PlayHistories => Set<PlayHistory>();
        public DbSet<Follow> Follows => Set<Follow>();
        public DbSet<MediaShare> MediaShares => Set<MediaShare>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<MediaTag> MediaTags => Set<MediaTag>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); 

            // Đổi tên bảng Identity mặc định cho đẹp
            builder.Entity<ApplicationUser>().ToTable("AppUsers");
            builder.Entity<IdentityRole<Guid>>().ToTable("AppRoles");
            builder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles");
            builder.Entity<MediaItem>().HasQueryFilter(m => !m.IsDeleted);

            builder.Entity<Favorite>().HasQueryFilter(f => !f.MediaItem.IsDeleted);
            builder.Entity<PlayHistory>().HasQueryFilter(p => !p.MediaItem.IsDeleted);
            builder.Entity<PlaylistTrack>().HasQueryFilter(pt => !pt.MediaItem.IsDeleted);
            builder.Entity<MediaTag>().HasQueryFilter(mt => !mt.MediaItem.IsDeleted);

            // Tự động quét và áp dụng tất cả các file trong thư mục Configurations
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}