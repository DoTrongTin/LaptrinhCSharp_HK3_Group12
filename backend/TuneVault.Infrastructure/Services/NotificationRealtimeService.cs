using Microsoft.AspNetCore.SignalR;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Notification.DTOs;
using TuneVault.Infrastructure.Hubs;

namespace TuneVault.Infrastructure.Services;

public class NotificationRealtimeService : INotificationRealtimeService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationRealtimeService(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendNotificationAsync(
        Guid receiverUserId,
        NotificationDto notification,
        CancellationToken cancellationToken = default)
    {
        await _hubContext
            .Clients
            .Group(NotificationHub.GetUserGroup(receiverUserId.ToString()))
            .SendAsync("ReceiveNotification", notification, cancellationToken);
    }
}