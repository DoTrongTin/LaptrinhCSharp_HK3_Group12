using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<ApplicationUser?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        
        // Xử lý bảng Follows
        Task AddFollowAsync(Follow follow, CancellationToken cancellationToken = default);
        void RemoveFollow(Follow follow);
        Task<bool> IsFollowingAsync(Guid followerId, Guid followeeId, CancellationToken cancellationToken = default);
        
        // Lấy lịch sử nghe nhạc gần đây (Phục vụ chức năng 10)
        Task<IEnumerable<PlayHistory>> GetRecentPlayHistoryAsync(Guid userId, int limit = 10, CancellationToken cancellationToken = default);
        Task AddPlayHistoryAsync(PlayHistory history, CancellationToken cancellationToken = default);
    }
}