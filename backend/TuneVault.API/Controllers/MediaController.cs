using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using TuneVault.Infrastructure.Persistence;

namespace TuneVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Chỉ giữ lại AppDbContext
        public MediaController(AppDbContext context)
        {
            _context = context;
        }

        // API lấy danh sách bài hát mới nhất từ Database nội bộ
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMedia()
        {
            var media = await _context.MediaItems
                .Include(m => m.Owner)
                .OrderByDescending(m => m.CreatedAt)
                .Take(20)
                .Select(m => new {
                    m.Id,
                    m.Title,
                    m.Duration,
                    m.ThumbnailPath,
                    OwnerName = m.Owner.UserName 
                })
                .ToListAsync();

            return Ok(media);
        }
    }
}