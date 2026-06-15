namespace TuneVault.Application.Common.Interfaces
{
    public interface INotificationHub
    {
        // Bắn thông báo real-time tới một user cụ thể
        Task SendNotificationToUserAsync(Guid userId, string actionType, string payload);
    }
}