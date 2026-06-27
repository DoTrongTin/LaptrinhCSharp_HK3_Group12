using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TuneVault.Domain.Entities;
using TuneVault.Infrastructure.Persistence; 
// using TuneVault.Infrastructure.Repositories;
using TuneVault.Application.Common.Interfaces; 
using TuneVault.Infrastructure.Repositories;
using TuneVault.Infrastructure.Services;
using TuneVault.Domain.Interfaces; // Mở comment để dùng TokenService
using Microsoft.AspNetCore.Http;

namespace TuneVault.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // ==========================================
            // 1. ĐĂNG KÝ DBCONTEXT (KẾT NỐI DATABASE)
            // Đã sửa thành AppDbContext để khớp với thư mục Persistence
            // ==========================================
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

            services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

            // ==========================================
            // 2. ĐĂNG KÝ IDENTITY (QUẢN LÝ USER)
            // Đã sửa thành ApplicationUser để khớp với thư mục Entities
            // ==========================================
            services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            // ==========================================
            // 3. ĐĂNG KÝ REPOSITORIES
            // ==========================================
            // Ví dụ đăng ký PlaylistRepository (Sẽ mở ra khi bạn code class PlaylistRepository)
            // services.AddScoped<IPlaylistRepository, PlaylistRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IMediaRepository, MediaRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IShareRepository, ShareRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<IFavoriteRepository, FavoriteRepository>();
            services.AddScoped<IPlayHistoryRepository, PlayHistoryRepository>();
            
            // ==========================================
            // 4. ĐĂNG KÝ EXTERNAL SERVICES
            // ==========================================
            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddSignalR();
            services.AddScoped<INotificationRealtimeService, NotificationRealtimeService>();
            
            // services.AddScoped<IAnthropicService, AnthropicService>(); // Dùng cho AI sau này
            
            // ==========================================
            // 5. CẤU HÌNH XÁC THỰC (AUTHENTICATION) BẰNG JWT
            // ==========================================
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"]!)),
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JwtSettings:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["JwtSettings:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero //Bỏ qua 5 giây chờ của token
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;

                        if (!string.IsNullOrEmpty(accessToken) &&
                            path.StartsWithSegments("/hubs/notifications"))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            return services;
        }
    }
}