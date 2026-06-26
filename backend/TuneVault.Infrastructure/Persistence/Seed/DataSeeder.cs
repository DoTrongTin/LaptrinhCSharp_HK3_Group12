using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Persistence
{
    public static class TuneVaultDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            // Nếu trong DB đã có user rồi thì bỏ qua, không đổ thêm nữa
            if (await context.Users.AnyAsync())
            {
                return;
            }

            // 1. Tạo tài khoản mẫu chuẩn (có thể dùng để test)
            
            var defaultUser = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "admin",
                Email = "admin@tunevault.com",
                EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
            };

            var createResult = await userManager.CreateAsync(defaultUser, "Admin@123");
            if (!createResult.Succeeded)
            {
                throw new Exception($"Không thể tạo user mặc định: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
            }

            // 2. Tạo danh sách 10 Người dùng mẫu
            var userFaker = new Faker<ApplicationUser>()
                .RuleFor(u => u.Id, f => Guid.NewGuid())
                .RuleFor(u => u.UserName, f => f.Internet.UserName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.PasswordHash, f => "hashed_password_mock"); // Thực tế nên dùng UserManager để tạo user thật

            var users = userFaker.Generate(10);
            await context.Set<ApplicationUser>().AddRangeAsync(users);

            // 2. Tạo danh sách 100 Bài hát mẫu, lấy ngẫu nhiên ID của những người dùng trên làm Chủ sở hữu
            var mediaFaker = new Faker<MediaItem>()
                .RuleFor(m => m.Id, f => Guid.NewGuid())
                .RuleFor(m => m.Title, f => f.Lorem.Sentence(3))
                .RuleFor(m => m.Description, f => f.Lorem.Paragraph())
                .RuleFor(m => m.Duration, f => f.Random.Number(120, 400)) // Từ 2 đến 6 phút
                .RuleFor(m => m.FilePath, f => f.Internet.Url())
                .RuleFor(m => m.ThumbnailPath, f => f.Image.PicsumUrl())
                .RuleFor(m => m.OwnerId, f => f.PickRandom(users).Id)
                .RuleFor(m => m.Artist, f => f.Name.FullName())
                .RuleFor(m => m.CreatedAt, f => f.Date.Past());

            var mediaItems = mediaFaker.Generate(100);
            await context.MediaItems.AddRangeAsync(mediaItems);

            // Lưu toàn bộ xuống SQL Server
            await context.SaveChangesAsync();
        }
    }
}
