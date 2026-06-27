using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Share.DTOs;

namespace TuneVault.Application.Features.Share.Queries.GetSharedByMe;

public class GetSharedByMeHandler : IRequestHandler<GetSharedByMeQuery, List<ShareMediaDto>>
{
    private readonly IAppDbContext _context;

    public GetSharedByMeHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ShareMediaDto>> Handle(GetSharedByMeQuery request, CancellationToken cancellationToken)
    {
        return await _context.MediaShares
            .AsNoTracking()
            .Where(ms => ms.SenderId == request.UserId)
            .OrderByDescending(ms => ms.SharedAt)
            .Select(ms => new ShareMediaDto
            {
                Id = ms.Id,
                SenderId = ms.SenderId,
                SenderName = ms.Sender.UserName ?? "",
                ReceiverId = ms.ReceiverId,
                ReceiverName = ms.Receiver.UserName ?? "",
                MediaItemId = ms.MediaItemId,
                PlaylistId = ms.PlaylistId,
                TargetType = ms.MediaItemId != null ? ms.MediaItem!.MediaType.ToString() : "Playlist",
                TargetTitle = ms.MediaItemId != null ? ms.MediaItem!.Title : ms.Playlist!.Title,
                Message = ms.Message,
                SharedAt = ms.SharedAt,
                AlreadyExisted = false
            })
            .ToListAsync(cancellationToken);
    }
}