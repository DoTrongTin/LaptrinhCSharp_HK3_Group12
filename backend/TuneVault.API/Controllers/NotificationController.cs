using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Notification.DTOs;

namespace TuneVault.API.Controllers;

[Authorize]
[ApiController]
[Route("api/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public NotificationsController(
        IAppDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyNotifications(CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (userId == null)
        {
            return Unauthorized(new
            {
                success = false,
                message = "Không xác định được người dùng hiện tại."
            });
        }

        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId.Value)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NotificationDto
            {
                Id = n.Id,
                UserId = n.UserId,
                Type = n.Type,
                Payload = n.Payload,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return Ok(new
        {
            success = true,
            data = notifications
        });
    }

    [HttpPut("{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (userId == null)
        {
            return Unauthorized(new
            {
                success = false,
                message = "Không xác định được người dùng hiện tại."
            });
        }

        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId.Value, cancellationToken);

        if (notification == null)
        {
            return NotFound(new
            {
                success = false,
                message = "Không tìm thấy thông báo."
            });
        }

        notification.IsRead = true;

        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            success = true,
            message = "Đã đánh dấu thông báo là đã đọc."
        });
    }

    [HttpPut("read-all")]
    public async Task<IActionResult> MarkAllAsRead(CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (userId == null)
        {
            return Unauthorized(new
            {
                success = false,
                message = "Không xác định được người dùng hiện tại."
            });
        }

        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId.Value && !n.IsRead)
            .ToListAsync(cancellationToken);

        foreach (var notification in notifications)
        {
            notification.IsRead = true;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            success = true,
            message = "Đã đánh dấu tất cả thông báo là đã đọc.",
            count = notifications.Count
        });
    }
}