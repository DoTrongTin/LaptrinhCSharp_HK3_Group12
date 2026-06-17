using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneVault.Infrastructure.Persistence;
using TuneVault.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace TuneVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InteractionController(AppDbContext context) => _context = context;

        // API Yêu thích/Bỏ thích bài hát
        [HttpPost("favorite/{mediaId}")]
        public async Task<IActionResult> ToggleFavorite(Guid mediaId)
        {
            // Tạm thời lấy UserID mặc định (để test trước khi làm Auth)
            var userId = await _context.Users.Select(u => u.Id).FirstOrDefaultAsync();
            
            var existing = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.MediaItemId == mediaId);

            if (existing != null) {
                _context.Favorites.Remove(existing);
                await _context.SaveChangesAsync();
                return Ok(new { IsFavorite = false });
            }

            _context.Favorites.Add(new Favorite { UserId = userId, MediaItemId = mediaId });
            await _context.SaveChangesAsync();
            return Ok(new { IsFavorite = true });
        }

        // API Ghi lịch sử nghe (được gọi mỗi khi nhạc bắt đầu Play)
        [HttpPost("history/{mediaId}")]
        public async Task<IActionResult> RecordHistory(Guid mediaId)
        {
            var userId = await _context.Users.Select(u => u.Id).FirstOrDefaultAsync();
            
            var history = new PlayHistory { 
                Id = Guid.NewGuid(),
                UserId = userId, 
                MediaItemId = mediaId, 
                PlayedAt = DateTime.UtcNow 
            };
            
            _context.PlayHistories.Add(history);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}