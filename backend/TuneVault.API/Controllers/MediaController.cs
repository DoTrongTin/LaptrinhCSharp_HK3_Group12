using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneVault.Infrastructure.Persistence;
using TuneVault.Domain.Entities;

namespace TuneVault.API.Controllers
{
    // 1. TẠO CLASS WRAPPER: Gói các trường lại giúp Swagger dễ dàng đọc định dạng form-data
    public class UploadMediaRequest
    {
        public IFormFile AudioFile { get; set; } = null!;
        public IFormFile? ImageFile { get; set; } // Dấu ? vì ảnh là tùy chọn
        public string Title { get; set; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public MediaController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // CHỨC NĂNG 1: UPLOAD NHẠC
[HttpPost("upload")]
public async Task<IActionResult> UploadMedia([FromForm] UploadMediaRequest request)
{
    if (request == null || request.AudioFile == null || request.AudioFile.Length == 0) 
        return BadRequest("Vui lòng chọn file nhạc (AudioFile là bắt buộc).");

    try
    {
        var webRoot = string.IsNullOrEmpty(_env.WebRootPath) ? Path.Combine(_env.ContentRootPath, "wwwroot") : _env.WebRootPath;
        var uploadPath = Path.Combine(webRoot, "uploads");
        if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);

        var audioFileName = Guid.NewGuid().ToString() + Path.GetExtension(request.AudioFile.FileName);
        var audioFilePath = Path.Combine(uploadPath, audioFileName);
        using (var stream = new FileStream(audioFilePath, FileMode.Create))
        {
            await request.AudioFile.CopyToAsync(stream);
        }

        // Lưu file Image (Nếu có)
        string? imageFileName = null;
        if (request.ImageFile != null && request.ImageFile.Length > 0)
        {
            imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(request.ImageFile.FileName);
            var imageFilePath = Path.Combine(uploadPath, imageFileName);
            using (var stream = new FileStream(imageFilePath, FileMode.Create))
            {
                await request.ImageFile.CopyToAsync(stream);
            }
        }

        // 3. SỬA LỖI KHÓA NGOẠI (Foreign Key) - Đảm bảo luôn có User hợp lệ
        var owner = await _context.Users.FirstOrDefaultAsync();
        if (owner == null)
        {
            // Nếu Database trống trơn, tự động tạo 1 user "System" để chứa nhạc
            owner = new ApplicationUser 
            { 
                Id = Guid.NewGuid(), 
                UserName = "System", 
                Email = "system@tunevault.local",
                CreatedAt = DateTime.UtcNow
            };
            _context.Users.Add(owner);
            await _context.SaveChangesAsync();
        }


        var hostUrl = $"{Request.Scheme}://{Request.Host}"; // Lấy địa chỉ Backend (http://localhost:5078)
        var newMedia = new MediaItem
        {
            Title = string.IsNullOrWhiteSpace(request.Title) ? "Bài hát chưa đặt tên" : request.Title,
            FilePath = $"/uploads/{audioFileName}",
       
            ThumbnailPath = imageFileName != null ? $"{hostUrl}/uploads/{imageFileName}" : "https://via.placeholder.com/150",
            OwnerId = owner.Id,
            CreatedAt = DateTime.UtcNow,
            MediaType = TuneVault.Domain.Enums.MediaType.Audio
        };

        _context.MediaItems.Add(newMedia);
        await _context.SaveChangesAsync();

        // THAY THẾ DÒNG RETURN CŨ BẰNG ĐOẠN NÀY
        return Ok(new 
        { 
            Message = "Upload thành công!", 
            Media = new 
            {
                Id = newMedia.Id,
                Title = newMedia.Title,
                FilePath = newMedia.FilePath,
                ThumbnailPath = newMedia.ThumbnailPath,
                OwnerName = owner.UserName // Tránh ném toàn bộ Object owner vào đây
            } 
        });
    }
    catch (Exception ex)
    {
        // 5. Bẫy lỗi tại chỗ: Nếu vẫn có lỗi, nó sẽ in thẳng ra Swagger để ta biết cần sửa gì
        return StatusCode(500, $"Lỗi chi tiết: {ex.Message} --- Inner: {ex.InnerException?.Message}");
    }
}
        // CHỨC NĂNG 2: LẤY NHẠC TRANG CHỦ
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMedia()
        {
            var media = await _context.MediaItems
                .OrderByDescending(m => m.CreatedAt)
// Sửa trong cả 2 hàm GetTrendingMedia và SearchLocal:
.Select(m => new {
    m.Id,
    m.Title,
    m.Duration,
    // Sửa dòng ThumbnailPath thành như sau:
    ThumbnailPath = m.ThumbnailPath!.StartsWith("http") 
                    ? m.ThumbnailPath 
                    : "http://localhost:5078" + m.ThumbnailPath,
    OwnerName = "TuneVault User",
    PreviewUrl = "http://localhost:5078" + m.FilePath
})
                .ToListAsync();

            return Ok(media);
        }

        // CHỨC NĂNG 3: TÌM KIẾM NỘI BỘ
        [HttpGet("search")]
        public async Task<IActionResult> SearchLocal([FromQuery] string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword)) return Ok(new List<object>());

            var keywordLower = keyword.ToLower();
            var results = await _context.MediaItems
                .Where(m => m.Title.ToLower().Contains(keywordLower))
                .Select(m => new {
                    m.Id,
                    m.Title,
                    m.Duration,
                    m.ThumbnailPath,
                    OwnerName = "TuneVault User",
                    PreviewUrl = "http://localhost:5078" + m.FilePath
                })
                .ToListAsync();

            return Ok(results);
        }
    }
}