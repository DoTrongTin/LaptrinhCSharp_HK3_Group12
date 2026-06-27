using Microsoft.OpenApi.Models;
using TuneVault.Application;
using TuneVault.Infrastructure;
using TuneVault.API.Middleware;
using TuneVault.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using TuneVault.Domain.Entities;
using Microsoft.AspNetCore.Http.Features;

using TuneVault.API.Services;
using TuneVault.Application.Common.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// 1. KẾT NỐI CÁC TẦNG KIẾN TRÚC
// ==========================================
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

// ==========================================
// 2. CẤU HÌNH CORS (Bắt buộc cho React SPA)
// ==========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()); // Rất quan trọng nếu sau này dùng SignalR
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Tự động ngắt khi phát hiện vòng lặp, thay vì bị Crash
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();

// ==========================================
// 3. CẤU HÌNH SWAGGER ĐỂ TEST ĐƯỢC JWT TOKEN
// ==========================================
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TuneVault API", Version = "v1" });
    
    // Nút nhập Token trên Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Nhập 'Bearer [khoảng trắng] [Token của bạn]'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // Cho phép upload file lên đến 100MB
});

// THÊM ĐOẠN NÀY ĐỂ KESTREL SERVER KHÔNG NGẮT KẾT NỐI
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 104857600; 
});

builder.Services.AddControllers();

var app = builder.Build();

// ==========================================
// 4. KÍCH HOẠT MIDDLEWARE
// ==========================================
// Cài đặt Middleware bẫy lỗi toàn cục lên đầu tiên
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    app.UseHttpsRedirection(); 
}

app.UseStaticFiles();

// Kích hoạt CORS trước khi Auth
app.UseCors("AllowReactApp");

// THỨ TỰ CỰC KỲ QUAN TRỌNG: Authentication -> Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ĐOẠN CODE KÍCH HOẠT DATA SEEDER
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
// 1. DÒNG NÀY SẼ TỰ ĐỘNG TẠO DATABASE VÀ CÁC BẢNG NẾU CHƯA CÓ
        await context.Database.MigrateAsync(); 
        
        // 2. SAU KHI BẢNG ĐÃ TẠO XONG THÌ MỚI ĐỔ DỮ LIỆU VÀO
        await TuneVaultDbContextSeed.SeedAsync(context, userManager);
        Console.WriteLine("Đã đổ dữ liệu thành công vào TuneVault_DB!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Đã xảy ra lỗi khi đổ dữ liệu: {ex.Message}");
        Console.WriteLine("Backend vẫn chạy bình thường, bạn có thể đăng ký tài khoản thủ công.");
    }
}


app.Run();