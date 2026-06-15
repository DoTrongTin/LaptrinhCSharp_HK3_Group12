using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class MediaShareConfiguration : IEntityTypeConfiguration<MediaShare>
    {
        public void Configure(EntityTypeBuilder<MediaShare> builder)
        {
            // 1. Cấu hình mối quan hệ cho Người Gửi (Sender)
            builder.HasOne(ms => ms.Sender)
                   .WithMany(u => u.SentShares) // Thay 'SentShares' bằng tên thuộc tính tương ứng trong class ApplicationUser nếu bạn đặt tên khác
                   .HasForeignKey(ms => ms.SenderId)
                   .OnDelete(DeleteBehavior.Restrict); // Bắt buộc dùng Restrict để chặn lỗi "Multiple Cascade Paths" trong SQL Server

            // 2. Cấu hình mối quan hệ cho Người Nhận (Receiver)
            builder.HasOne(ms => ms.Receiver)
                   .WithMany(u => u.ReceivedShares)
                   .HasForeignKey(ms => ms.ReceiverId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}