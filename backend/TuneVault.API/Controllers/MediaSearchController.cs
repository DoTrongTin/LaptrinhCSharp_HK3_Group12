using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;

namespace TuneVault.API.Controllers;

[Authorize]
[ApiController]
[Route("api/media")]
public class MediaSearchController : ControllerBase
{
    private readonly IAppDbContext _context;

    public MediaSearchController(IAppDbContext context)
    {
        _context = context;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchMedia(
        [FromQuery] string? keyword,
        CancellationToken cancellationToken)
    {
        keyword = keyword?.Trim() ?? "";

        if (string.IsNullOrWhiteSpace(keyword))
        {
            return Ok(new
            {
                success = true,
                message = "Không có từ khóa tìm kiếm.",
                data = new List<object>()
            });
        }

        var results = await (
            from media in _context.MediaItems
            join user in _context.Users on media.OwnerId equals user.Id into owners
            from owner in owners.DefaultIfEmpty()
            where media.Title.Contains(keyword)
                  || (owner != null && owner.UserName != null && owner.UserName.Contains(keyword))
                  || (owner != null && owner.Email != null && owner.Email.Contains(keyword))
            orderby media.Title
            select new
            {
                id = media.Id,
                title = media.Title,
                artistName = owner != null ? owner.UserName : "Ẩn danh",
                ownerName = owner != null ? owner.UserName : "Ẩn danh",
                thumbnailPath = media.ThumbnailPath,
                type = "song"
            }
        )
        .Take(20)
        .ToListAsync(cancellationToken);

        return Ok(new
        {
            success = true,
            message = "Tìm kiếm media thành công.",
            data = results
        });
    }
}