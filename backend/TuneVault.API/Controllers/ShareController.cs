using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuneVault.Application.Features.Share.Commands.ShareMedia;
using TuneVault.Application.Features.Share.Queries.GetSharedByMe;
using TuneVault.Application.Features.Share.Queries.GetSharedWithMe;

namespace TuneVault.API.Controllers;

public class ShareMediaRequest
{
    public Guid ReceiverId { get; set; }
    public Guid? MediaItemId { get; set; }
    public Guid? PlaylistId { get; set; }
    public string? Message { get; set; }
}

[ApiController]
[Route("api/shares")]
[Authorize]
public class SharesController : ControllerBase
{
    private readonly IMediator _mediator;

    public SharesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> ShareMedia([FromBody] ShareMediaRequest request, CancellationToken cancellationToken)
    {
        var senderId = GetCurrentUserId();

        var command = new ShareMediaCommand
        {
            SenderId = senderId,
            ReceiverId = request.ReceiverId,
            MediaItemId = request.MediaItemId,
            PlaylistId = request.PlaylistId,
            Message = request.Message
        };

        var result = await _mediator.Send(command, cancellationToken);

        return Ok(new
        {
            success = true,
            message = result.AlreadyExisted
                ? "Media hoặc playlist này đã được chia sẻ trước đó."
                : "Chia sẻ thành công.",
            data = result
        });
    }

    [HttpGet("with-me")]
    public async Task<IActionResult> GetSharedWithMe(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();

        var result = await _mediator.Send(new GetSharedWithMeQuery(userId), cancellationToken);

        return Ok(new
        {
            success = true,
            data = result
        });
    }

    [HttpGet("by-me")]
    public async Task<IActionResult> GetSharedByMe(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();

        var result = await _mediator.Send(new GetSharedByMeQuery(userId), cancellationToken);

        return Ok(new
        {
            success = true,
            data = result
        });
    }

    private Guid GetCurrentUserId()
    {
        var userIdValue =
            User.FindFirstValue(ClaimTypes.NameIdentifier) ??
            User.FindFirstValue("sub") ??
            User.FindFirstValue("uid");

        if (string.IsNullOrWhiteSpace(userIdValue))
        {
            throw new UnauthorizedAccessException("Không tìm thấy UserId trong token.");
        }

        return Guid.Parse(userIdValue);
    }
}