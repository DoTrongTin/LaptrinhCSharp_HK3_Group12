using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class PlaylistConfiguration : IEntityTypeConfiguration<Playlist>
    {
        public void Configure(EntityTypeBuilder<Playlist> builder)
        {
            // Playlist bắt buộc phải thuộc về 1 User
            builder.HasOne(p => p.User)
                   .WithMany(u => u.Playlists) // Xóa nếu ApplicationUser không có public ICollection<Playlist> Playlists
                   .HasForeignKey(p => p.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Xóa User thì xóa Playlist của họ
        }
    }
}