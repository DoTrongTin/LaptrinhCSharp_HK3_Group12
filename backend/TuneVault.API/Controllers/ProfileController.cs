using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuneVault.Application.Features.Profile.Commands.UpdateProfile;
using TuneVault.Application.Features.Profile.Queries.GetProfile;

namespace TuneVault.API.Controllers;

// 1. TẠO CLASS REQUEST TẠI TẦNG API ĐỂ NHẬN FILE
public class UpdateProfileRequest
{
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public IFormFile? AvatarFile { get; set; } // IFormFile không bị lỗi ở đây
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IWebHostEnvironment _env;

    public ProfileController(IMediator mediator, IWebHostEnvironment env)
    {
        _mediator = mediator;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var result = await _mediator.Send(new GetProfileQuery(userId), cancellationToken);
        return Ok(new { data = result });
    }

    [HttpPut]
    // 2. SỬ DỤNG LỚP REQUEST VỪA TẠO
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        string? avatarPath = null;

        // 3. XỬ LÝ LƯU FILE NGAY TRONG CONTROLLER
        if (request.AvatarFile != null && request.AvatarFile.Length > 0)
        {
            var webRoot = string.IsNullOrEmpty(_env.WebRootPath) ? Path.Combine(_env.ContentRootPath, "wwwroot") : _env.WebRootPath;
            var coverDir = Path.Combine(webRoot, "uploads", "covers");
            
            if (!Directory.Exists(coverDir)) Directory.CreateDirectory(coverDir);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.AvatarFile.FileName);
            var filePath = Path.Combine(coverDir, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.AvatarFile.CopyToAsync(stream);
            }
            
            avatarPath = $"/uploads/covers/{fileName}";
        }

        // 4. GỬI XUỐNG APPLICATION TẦNG DƯỚI (Lúc này chỉ gửi chuỗi AvatarPath)
        var command = new UpdateProfileCommand 
        { 
            UserId = userId, 
            UserName = request.UserName, 
            Bio = request.Bio,
            AvatarPath = avatarPath
        };
        
        var result = await _mediator.Send(command, cancellationToken);
        
        return Ok(new { data = result });
    }

    private Guid GetCurrentUserId()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdValue))
            throw new UnauthorizedAccessException("Không tìm thấy thông tin người dùng.");
        return Guid.Parse(userIdValue);
    }
}