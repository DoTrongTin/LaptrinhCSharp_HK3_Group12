using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using TuneVault.Application.Features.Media.Commands.UploadMedia;
using TuneVault.Application.Features.Media.Queries.GetMediaStream;
using TuneVault.Application.Features.Media.Queries.SearchMedia;
using TuneVault.Infrastructure.Persistence;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using TuneVault.Application.Features.Media.Commands.DeleteMedia;

namespace TuneVault.API.Controllers
{
    public class UploadMediaRequest
    {
        public IFormFile AudioFile { get; set; } = null!;
        public IFormFile? ImageFile { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty; // Sửa lại thành chuỗi rỗng mặc định để dễ check logic
    }

    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public MediaController(IMediator mediator, AppDbContext context, IWebHostEnvironment env)
        {
            _mediator = mediator;
            _context = context;
            _env = env;
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> UploadMedia([FromForm] UploadMediaRequest request)
        {       
            var authHeader = Request.Headers["Authorization"].ToString();
            Console.WriteLine($"Token nhận được: {authHeader}");
            if (request == null || request.AudioFile == null || request.AudioFile.Length == 0) 
                return BadRequest("Vui lòng chọn file nhạc.");

            var webRoot = string.IsNullOrEmpty(_env.WebRootPath) ? Path.Combine(_env.ContentRootPath, "wwwroot") : _env.WebRootPath;
            var audioDir = Path.Combine(webRoot, "uploads", "audio");
            var coverDir = Path.Combine(webRoot, "uploads", "covers");

            if (!Directory.Exists(audioDir)) Directory.CreateDirectory(audioDir);
            if (!Directory.Exists(coverDir)) Directory.CreateDirectory(coverDir);

            // 1. Lưu file mp3
            var audioFileName = Guid.NewGuid().ToString() + Path.GetExtension(request.AudioFile.FileName);
            var audioFilePath = Path.Combine(audioDir, audioFileName); // Khai báo rõ đường dẫn để TagLib đọc

            await using (var stream = new FileStream(audioFilePath, FileMode.Create))
            {
                await request.AudioFile.CopyToAsync(stream);
            }

            // 2. Lưu ảnh bìa
            string thumbnailPath = "https://via.placeholder.com/150/1a1a1a/ffffff?text=Music";
            if (request.ImageFile != null && request.ImageFile.Length > 0)
            {
                var imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(request.ImageFile.FileName);
                await using (var stream = new FileStream(Path.Combine(coverDir, imageFileName), FileMode.Create))
                {
                    await request.ImageFile.CopyToAsync(stream);
                }
                thumbnailPath = $"/uploads/covers/{imageFileName}";
            }

            // ========================================================
            // 3. TỰ ĐỘNG ĐỌC THÔNG TIN TỪ FILE MP3 (GIAI ĐOẠN 3)
            // ========================================================
            int trackDuration = 0;
            string finalTitle = request.Title;
            string finalArtist = request.Artist;

            try
            {
                var tfile = TagLib.File.Create(audioFilePath);
                
                // Lấy độ dài bài hát (quy ra giây)
                trackDuration = (int)tfile.Properties.Duration.TotalSeconds;

                // Tự động điền Title nếu người dùng không nhập
                if (string.IsNullOrWhiteSpace(finalTitle) && !string.IsNullOrWhiteSpace(tfile.Tag.Title))
                    finalTitle = tfile.Tag.Title;

                // Tự động điền Artist nếu người dùng không nhập
                if (string.IsNullOrWhiteSpace(finalArtist) && tfile.Tag.FirstPerformer != null)
                    finalArtist = tfile.Tag.FirstPerformer;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Không thể đọc metadata: {ex.Message}");
            }
            // ========================================================

            // var owner = await _context.Users.FirstOrDefaultAsync();
            // if (owner == null) return BadRequest("Hệ thống chưa có user mẫu.");
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid ownerId))
            {
                return Unauthorized(new { message = "Không tìm thấy ID người dùng trong Token. Vui lòng đăng nhập lại." });
            }
            // 4. Đẩy toàn bộ dữ liệu (đã có Artist và Duration) sang tầng Application
            var command = new UploadMediaCommand
            {
                Title = string.IsNullOrWhiteSpace(finalTitle) ? "Bài hát chưa đặt tên" : finalTitle,
                Artist = string.IsNullOrWhiteSpace(finalArtist) ? "Nghệ sĩ ẩn danh" : finalArtist,
                Duration = trackDuration, // TRUYỀN SỐ GIÂY VÀO ĐÂY
                FilePath = $"/uploads/audio/{audioFileName}",
                ThumbnailPath = thumbnailPath,
                OwnerId = ownerId
            };

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("stream/{id}")]
        public async Task<IActionResult> StreamAudio(Guid id)
        {
            var filePath = await _mediator.Send(new GetMediaStreamQuery { Id = id });
            if (string.IsNullOrEmpty(filePath)) return NotFound("Không tìm thấy bài hát.");

            var webRoot = string.IsNullOrEmpty(_env.WebRootPath) ? Path.Combine(_env.ContentRootPath, "wwwroot") : _env.WebRootPath;
            var fullPath = Path.Combine(webRoot, filePath.StartsWith("/") ? filePath.Substring(1) : filePath);

            if (!System.IO.File.Exists(fullPath)) return NotFound("Tệp tin không tồn tại.");

            var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(fileStream, "audio/mpeg", enableRangeProcessing: true);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchLocal([FromQuery] string keyword)
        {
            var result = await _mediator.Send(new SearchMediaQuery { Keyword = keyword });
            return Ok(result);
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending([FromQuery] int count = 20)
        {
            var result = await _mediator.Send(new TuneVault.Application.Features.Media.Queries.GetTrendingMedia.GetTrendingMediaQuery { Count = count });
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // 🌟 KHÓA CHỐT: Chỉ user có Role "Admin" trong Token mới được gọi
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _mediator.Send(new DeleteMediaCommand { Id = id });
            if (!result) return NotFound(new { message = "Không tìm thấy bài hát cần xóa" });
            
            return Ok(new { success = true, message = "Đã xóa bài hát thành công" });
        }


    }
}