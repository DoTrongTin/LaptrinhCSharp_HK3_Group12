using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using TuneVault.Infrastructure.Persistence;
using TuneVault.Infrastructure.Services;

namespace TuneVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly SpotifyService _spotifyService;

        public MediaController(AppDbContext context)
        {
            _context = context;
            // SpotifyService should be injected via DI
            _spotifyService = null!;
        }

        // API lấy danh sách bài hát mới nhất (Hiển thị ở trang chủ)
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMedia()
        {
            var media = await _context.MediaItems
                .Include(m => m.Owner) // Kéo theo thông tin người đăng (User)
                .OrderByDescending(m => m.CreatedAt)
                .Take(20) // Lấy 20 bài mới nhất cho nhẹ máy
                .Select(m => new {
                    m.Id,
                    m.Title,
                    m.Duration,
                    m.ThumbnailPath,
                    OwnerName = m.Owner.UserName // Chỉ lấy tên để bảo mật
                })
                .ToListAsync();

            return Ok(media);
        }

        [HttpGet("spotify-trending")]
        public async Task<IActionResult> GetSpotifyTrending()
        {
            // Gọi SpotifyService lấy dữ liệu gốc của Spotify
            var spotifyData = await _spotifyService.GetNewReleasesAsync();
        
            // Ánh xạ (Map) dữ liệu của Spotify về đúng chuẩn MediaItem của TuneVault
            var formattedData = spotifyData.Select(track => new {
                Id = track.Id, // Lưu ID của Spotify thay vì Guid của bạn
                Title = track.Name,
                Duration = track.DurationMs / 1000,
                ThumbnailPath = track.Album.Images.FirstOrDefault()?.Url,
                OwnerName = track.Artists.FirstOrDefault()?.Name,
                PreviewUrl = track.PreviewUrl // Link nhạc demo 30s
            }).ToList();

            return Ok(formattedData);
        }
    }
}