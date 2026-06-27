using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Share.DTOs;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Share.Commands.ShareMedia;

public class ShareMediaHandler : IRequestHandler<ShareMediaCommand, ShareMediaDto>
{
    private readonly IAppDbContext _context;

    public ShareMediaHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<ShareMediaDto> Handle(ShareMediaCommand request, CancellationToken cancellationToken)
    {
        var sender = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == request.SenderId, cancellationToken);

        if (sender == null)
        {
            throw new KeyNotFoundException("Không tìm thấy người gửi.");
        }

        var receiver = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == request.ReceiverId, cancellationToken);

        if (receiver == null)
        {
            throw new KeyNotFoundException("Không tìm thấy người nhận.");
        }

        string targetType;
        string targetTitle;

        if (request.MediaItemId.HasValue)
        {
            var media = await _context.MediaItems
                .FirstOrDefaultAsync(m => m.Id == request.MediaItemId.Value, cancellationToken);

            if (media == null)
            {
                throw new KeyNotFoundException("Không tìm thấy media cần chia sẻ.");
            }

            if (!media.IsPublic && media.OwnerId != request.SenderId)
            {
                throw new UnauthorizedAccessException("Bạn không có quyền chia sẻ media này.");
            }

            targetType = media.MediaType.ToString();
            targetTitle = media.Title;
        }
        else
        {
            var playlist = await _context.Playlists
                .FirstOrDefaultAsync(p => p.Id == request.PlaylistId!.Value, cancellationToken);

            if (playlist == null)
            {
                throw new KeyNotFoundException("Không tìm thấy playlist cần chia sẻ.");
            }

            if (!playlist.IsPublic && playlist.UserId != request.SenderId)
            {
                throw new UnauthorizedAccessException("Bạn không có quyền chia sẻ playlist này.");
            }

            targetType = "Playlist";
            targetTitle = playlist.Title;
        }

        var existedShare = await _context.MediaShares
            .FirstOrDefaultAsync(ms =>
                ms.SenderId == request.SenderId &&
                ms.ReceiverId == request.ReceiverId &&
                ms.MediaItemId == request.MediaItemId &&
                ms.PlaylistId == request.PlaylistId,
                cancellationToken);

        if (existedShare != null)
        {
            return new ShareMediaDto
            {
                Id = existedShare.Id,
                SenderId = sender.Id,
                SenderName = sender.UserName ?? "",
                ReceiverId = receiver.Id,
                ReceiverName = receiver.UserName ?? "",
                MediaItemId = existedShare.MediaItemId,
                PlaylistId = existedShare.PlaylistId,
                TargetType = targetType,
                TargetTitle = targetTitle,
                Message = existedShare.Message,
                SharedAt = existedShare.SharedAt,
                AlreadyExisted = true
            };
        }

        var share = new MediaShare
        {
            Id = Guid.NewGuid(),
            SenderId = request.SenderId,
            ReceiverId = request.ReceiverId,
            MediaItemId = request.MediaItemId,
            PlaylistId = request.PlaylistId,
            Message = request.Message,
            SharedAt = DateTime.UtcNow
        };

        _context.MediaShares.Add(share);
        await _context.SaveChangesAsync(cancellationToken);

        return new ShareMediaDto
        {
            Id = share.Id,
            SenderId = sender.Id,
            SenderName = sender.UserName ?? "",
            ReceiverId = receiver.Id,
            ReceiverName = receiver.UserName ?? "",
            MediaItemId = share.MediaItemId,
            PlaylistId = share.PlaylistId,
            TargetType = targetType,
            TargetTitle = targetTitle,
            Message = share.Message,
            SharedAt = share.SharedAt,
            AlreadyExisted = false
        };
    }
}