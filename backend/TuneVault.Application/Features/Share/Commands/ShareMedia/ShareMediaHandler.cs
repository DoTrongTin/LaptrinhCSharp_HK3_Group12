using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Notification.DTOs;
using TuneVault.Application.Features.Share.DTOs;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Share.Commands.ShareMedia;
using NotificationEntity = TuneVault.Domain.Entities.Notification;

public class ShareMediaHandler : IRequestHandler<ShareMediaCommand, ShareMediaDto>
{
    private readonly IAppDbContext _context;
    private readonly INotificationRealtimeService _notificationRealtimeService;

    public ShareMediaHandler(
        IAppDbContext context,
        INotificationRealtimeService notificationRealtimeService)
    {
        _context = context;
        _notificationRealtimeService = notificationRealtimeService;
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

        var notification = new NotificationEntity
        {
            Id = Guid.NewGuid(),
            UserId = request.ReceiverId,
            Type = "share",
            Payload = JsonSerializer.Serialize(new
            {
                shareId = share.Id,
                senderId = sender.Id,
                senderName = sender.UserName,
                mediaItemId = share.MediaItemId,
                playlistId = share.PlaylistId,
                targetType,
                targetTitle,
                message = share.Message
            }),
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.MediaShares.Add(share);
        _context.Notifications.Add(notification);

        await _context.SaveChangesAsync(cancellationToken);

        var notificationDto = new NotificationDto
        {
            Id = notification.Id,
            UserId = notification.UserId,
            Type = notification.Type,
            Payload = notification.Payload,
            IsRead = notification.IsRead,
            CreatedAt = notification.CreatedAt
        };

        await _notificationRealtimeService.SendNotificationAsync(
            request.ReceiverId,
            notificationDto,
            cancellationToken);

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