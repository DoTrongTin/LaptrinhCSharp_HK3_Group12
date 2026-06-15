using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class FavoriteConfiguration : IEntityTypeConfiguration<Favorite>
    {
        public void Configure(EntityTypeBuilder<Favorite> builder)
        {
            // 1. Khóa chính kép
            builder.HasKey(f => new { f.UserId, f.MediaItemId });

            // 2. Liên kết với ApplicationUser
            builder.HasOne(f => f.User)
                   .WithMany() // (Để trống nếu trong ApplicationUser bạn không gọi lại List Favorites)
                   .HasForeignKey(f => f.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // 3. Liên kết với MediaItem (Bắt buộc gọi lại m.Favorites để EF Core không tự đẻ cột bóng ma)
            builder.HasOne(f => f.MediaItem)
                   .WithMany(m => m.Favorites) 
                   .HasForeignKey(f => f.MediaItemId)
                   .OnDelete(DeleteBehavior.Restrict); // Chặn vòng lặp xóa dây chuyền
        }
    }
}