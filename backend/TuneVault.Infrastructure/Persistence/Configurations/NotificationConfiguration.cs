using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.HasOne(n => n.User) // Mối quan hệ 1 Notification thuộc về 1 User
                   .WithMany() // 1 User có nhiều Notification (để trống nếu class User ko khai báo ICollection<Notification>)
                   .HasForeignKey(n => n.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Xóa user thì xóa luôn thông báo
        }
    }
}