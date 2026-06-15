using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class PlayHistoryConfiguration : IEntityTypeConfiguration<PlayHistory>
    {
        public void Configure(EntityTypeBuilder<PlayHistory> builder)
        {
            // 1. Khóa chính (Primary Key) - Bảng này dùng Id riêng thay vì khóa kép
            builder.HasKey(ph => ph.Id);

            // 2. Liên kết với ApplicationUser
            builder.HasOne(ph => ph.User)
                   .WithMany() // (Để trống nếu trong ApplicationUser bạn không gọi lại List PlayHistories)
                   .HasForeignKey(ph => ph.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Xóa user thì xóa lịch sử nghe nhạc của họ

            // 3. Liên kết với MediaItem (Bắt buộc gọi lại m.PlayHistories để tránh sinh cột bóng ma)
            builder.HasOne(ph => ph.MediaItem)
                   .WithMany(m => m.PlayHistories) 
                   .HasForeignKey(ph => ph.MediaItemId)
                   .OnDelete(DeleteBehavior.Restrict); // Chặn vòng lặp xóa dây chuyền
        }
    }
}