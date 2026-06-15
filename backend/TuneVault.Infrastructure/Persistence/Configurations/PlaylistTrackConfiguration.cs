using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class PlaylistTrackConfiguration : IEntityTypeConfiguration<PlaylistTrack>
    {
        public void Configure(EntityTypeBuilder<PlaylistTrack> builder)
        {
            // 1. Khóa chính kép
            builder.HasKey(pt => new { pt.PlaylistId, pt.MediaItemId });

            // 2. Liên kết với Playlist
            builder.HasOne(pt => pt.Playlist)
                   .WithMany(p => p.PlaylistTracks) // Đã gọi đúng List PlaylistTracks trong Playlist.cs
                   .HasForeignKey(pt => pt.PlaylistId)
                   .OnDelete(DeleteBehavior.Cascade);

            // 3. Liên kết với MediaItem (Bắt buộc gọi lại m.PlaylistTracks)
            builder.HasOne(pt => pt.MediaItem)
                   .WithMany(m => m.PlaylistTracks)
                   .HasForeignKey(pt => pt.MediaItemId)
                   .OnDelete(DeleteBehavior.Restrict); // Chặn vòng lặp xóa dây chuyền
        }
    }
}