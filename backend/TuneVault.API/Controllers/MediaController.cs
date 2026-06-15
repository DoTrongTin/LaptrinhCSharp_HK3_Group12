using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MediaController(AppDbContext context)
        {
            _context = context;
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
    }
}