using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TuneVault.Domain.Entities;
// Import đúng các thư mục bạn vừa tạo
using TuneVault.Infrastructure.Persistence; 
using TuneVault.Infrastructure.Repositories;
using TuneVault.Application.Common.Interfaces  ; 
// using TuneVault.Infrastructure.AI; (Sẽ dùng sau khi tích hợp AI)
// using TuneVault.Infrastructure.Services; (Sẽ dùng sau)

namespace TuneVault.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // ==========================================
            // 1. ĐĂNG KÝ DBCONTEXT (KẾT NỐI DATABASE)
            // Lấy từ thư mục Persistence
            // ==========================================
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            // ==========================================
            // 2. ĐĂNG KÝ IDENTITY (QUẢN LÝ USER)
            // ==========================================
            services.AddIdentityCore<AppUser>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            // ==========================================
            // 3. ĐĂNG KÝ REPOSITORIES
            // Lấy từ thư mục Repositories
            // ==========================================
            // Ví dụ đăng ký PlaylistRepository (Bạn cần tạo IPlaylistRepository ở tầng Application trước)
            // services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            
            // ==========================================
            // 4. ĐĂNG KÝ EXTERNAL SERVICES & AI
            // Lấy từ thư mục AI và Services (Tài liệu yêu cầu Anthropic AI)
            // ==========================================
            // services.AddScoped<IAnthropicService, AnthropicService>();
            
            // ==========================================
            // 5. ĐĂNG KÝ SIGNALR (Nằm ở tầng API nhưng có thể config Hub ở đây nếu chia tách sâu)
            // ==========================================

            return services;
        }
    }
}