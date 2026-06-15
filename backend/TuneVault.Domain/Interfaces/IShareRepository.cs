using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IShareRepository
    {
        // Lấy những bài hát/playlist mà người khác gửi cho user này
        Task<IEnumerable<MediaShare>> GetInboxForUserAsync(Guid receiverId, CancellationToken cancellationToken = default);
        
        Task AddAsync(MediaShare share, CancellationToken cancellationToken = default);
    }
}