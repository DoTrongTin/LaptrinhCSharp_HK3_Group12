using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuneVault.Domain.Entities;

namespace TuneVault.API.Controllers;

[Authorize]
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("search")]
    public IActionResult SearchUsers([FromQuery] string? keyword)
    {
        keyword = keyword?.Trim() ?? "";

        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                            ?? User.FindFirstValue("sub")
                            ?? User.FindFirstValue("uid");

        var query = _userManager.Users.AsQueryable();

        if (Guid.TryParse(currentUserId, out var currentGuid))
        {
            query = query.Where(u => u.Id != currentGuid);
        }

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(u =>
                (u.UserName != null && u.UserName.Contains(keyword)) ||
                (u.Email != null && u.Email.Contains(keyword)));
        }

        var users = query
            .OrderBy(u => u.UserName)
            .Take(20)
            .Select(u => new
            {
                id = u.Id,
                userName = u.UserName,
                email = u.Email
            })
            .ToList();

        return Ok(new
        {
            success = true,
            message = "Lấy danh sách người dùng thành công.",
            data = users
        });
    }
}