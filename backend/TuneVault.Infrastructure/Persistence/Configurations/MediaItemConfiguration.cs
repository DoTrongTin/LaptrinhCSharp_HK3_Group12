using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class MediaItemConfiguration : IEntityTypeConfiguration<MediaItem>
    {
        public void Configure(EntityTypeBuilder<MediaItem> builder)
        {
            // Đã đổi thành m.Owner và m.OwnerId theo đúng file Entity của bạn
            builder.HasOne(m => m.Owner)
                   .WithMany(u => u.MediaItems) // (Xóa đoạn 'u => u.MediaItems' chỉ để lại '.WithMany()' nếu trong ApplicationUser bạn không khai báo list này)
                   .HasForeignKey(m => m.OwnerId)
                   .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}