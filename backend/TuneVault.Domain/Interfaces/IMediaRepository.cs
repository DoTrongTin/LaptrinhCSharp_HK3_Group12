using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IMediaRepository
    {
        Task<MediaItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        
        // Dùng cho chức năng tìm kiếm bài hát/video
        Task<IEnumerable<MediaItem>> SearchAsync(string keyword, CancellationToken cancellationToken = default);
        
        // Lấy danh sách nhạc mới nhất / trending
        Task<IEnumerable<MediaItem>> GetTrendingAsync(int count, CancellationToken cancellationToken = default);
        
        Task AddAsync(MediaItem mediaItem, CancellationToken cancellationToken = default);
        void Update(MediaItem mediaItem);
        void Delete(MediaItem mediaItem);
    }
}