using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations
{
    public class MediaTagConfiguration : IEntityTypeConfiguration<MediaTag>
    {
        public void Configure(EntityTypeBuilder<MediaTag> builder)
        {
            // 1. Khóa chính kép: Một bài hát không thể có 2 tag trùng tên nhau
            builder.HasKey(mt => new { mt.MediaItemId, mt.TagName });

            // 2. Thiết lập độ dài tối đa cho TagName để tối ưu Database
            builder.Property(mt => mt.TagName)
                   .HasMaxLength(50); // Tag không nên quá dài

            // 3. Cấu hình mối quan hệ với MediaItem
            builder.HasOne(mt => mt.MediaItem)
                   .WithMany(m => m.MediaTags)
                   .HasForeignKey(mt => mt.MediaItemId)
                   .OnDelete(DeleteBehavior.Cascade); // Khi xóa bài hát, xóa luôn các thẻ Tag của nó
        }
    }
}