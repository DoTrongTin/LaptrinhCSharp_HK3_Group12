using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace TuneVault.Infrastructure.Hubs;

[Authorize]
public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? Context.User?.FindFirstValue("sub")
                     ?? Context.User?.FindFirstValue("uid");

        if (!string.IsNullOrWhiteSpace(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, GetUserGroup(userId));
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? Context.User?.FindFirstValue("sub")
                     ?? Context.User?.FindFirstValue("uid");

        if (!string.IsNullOrWhiteSpace(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, GetUserGroup(userId));
        }

        await base.OnDisconnectedAsync(exception);
    }

    public static string GetUserGroup(string userId)
    {
        return $"user-{userId}";
    }
}