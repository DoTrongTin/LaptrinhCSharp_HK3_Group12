using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IPlayHistoryRepository
    {
        // Tìm một bản ghi PlayHistory theo UserId và MediaItemId (dùng để kiểm tra đã nghe chưa)
        Task<PlayHistory?> GetByUserAndMediaAsync(Guid userId, Guid mediaItemId, CancellationToken cancellationToken = default);

        // Thêm mới một bản ghi PlayHistory
        Task AddAsync(PlayHistory playHistory, CancellationToken cancellationToken = default);
    }
}