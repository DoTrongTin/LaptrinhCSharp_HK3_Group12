using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence.Configurations;

public class MediaTagConfiguration : IEntityTypeConfiguration<MediaTag>
{
    public void Configure(EntityTypeBuilder<MediaTag> builder)
    {
        builder.HasKey(mt => new { mt.MediaItemId, mt.TagName });

        builder
            .HasOne(mt => mt.MediaItem)
            .WithMany(m => m.MediaTags)
            .HasForeignKey(mt => mt.MediaItemId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(mt => mt.TagName).HasMaxLength(100);
    }
}
