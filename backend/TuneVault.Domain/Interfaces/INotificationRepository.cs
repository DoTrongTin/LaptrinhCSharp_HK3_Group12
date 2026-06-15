using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface INotificationRepository
    {
        // Lấy danh sách thông báo của user (sắp xếp mới nhất lên đầu)
        Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(Guid userId, CancellationToken cancellationToken = default);
        
        Task AddAsync(Notification notification, CancellationToken cancellationToken = default);
        
        // Đánh dấu đã đọc
        void Update(Notification notification);
    }
}