using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IFavoriteRepository
    {
        // Tìm một bản ghi Favorite theo UserId và MediaItemId (dùng để kiểm tra đã thích chưa)
        Task<Favorite?> GetByUserAndMediaAsync(Guid userId, Guid mediaItemId, CancellationToken cancellationToken = default);

        // Thêm mới một bản ghi Favorite
        Task AddAsync(Favorite favorite, CancellationToken cancellationToken = default);

        // Xóa một bản ghi Favorite
        void Remove(Favorite favorite);
    }
}