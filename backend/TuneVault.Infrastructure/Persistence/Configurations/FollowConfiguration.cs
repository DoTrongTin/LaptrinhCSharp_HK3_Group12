using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class FollowConfiguration : IEntityTypeConfiguration<Follow>
    {
        public void Configure(EntityTypeBuilder<Follow> builder)
        {
            // Định nghĩa Khóa chính kép (Composite Key) cho bảng Follows
            builder.HasKey(f => new { f.FollowerId, f.FolloweeId });

            // Cấu hình mối quan hệ cho Người đi theo dõi (Follower)
            builder.HasOne(f => f.Follower)
                   .WithMany(u => u.Followees) // Đổi tên 'Following' nếu trong AppUser bạn đặt tên khác
                   .HasForeignKey(f => f.FollowerId)
                   .OnDelete(DeleteBehavior.Restrict); // <--- CHẶN XÓA DÂY CHUYỀN

            // Cấu hình mối quan hệ cho Người được theo dõi (Followee)
            builder.HasOne(f => f.Followee)
                   .WithMany(u => u.Followers) // Đổi tên 'Followers' nếu trong AppUser bạn đặt tên khác
                   .HasForeignKey(f => f.FolloweeId)
                   .OnDelete(DeleteBehavior.Restrict); // <--- CHẶN XÓA DÂY CHUYỀN
        }
    }
}