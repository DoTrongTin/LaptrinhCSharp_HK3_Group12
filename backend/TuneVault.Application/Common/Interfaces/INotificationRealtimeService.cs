using TuneVault.Application.Features.Notification.DTOs;

namespace TuneVault.Application.Common.Interfaces;

public interface INotificationRealtimeService
{
    Task SendNotificationAsync(
        Guid receiverUserId,
        NotificationDto notification,
        CancellationToken cancellationToken = default);
}