using TuneVault.Domain.Entities;

namespace TuneVault.Domain.Interfaces
{
    public interface IPlaylistRepository
    {
        // Lấy chi tiết playlist (bao gồm cả các bài hát trong đó)
        Task<Playlist?> GetByIdWithTracksAsync(Guid id, CancellationToken cancellationToken = default);
        
        // Lấy danh sách playlist do 1 user tạo ra
        Task<IEnumerable<Playlist>> GetUserPlaylistsAsync(Guid userId, CancellationToken cancellationToken = default);
        
        Task AddAsync(Playlist playlist, CancellationToken cancellationToken = default);
        void Update(Playlist playlist);
        void Delete(Playlist playlist);
        
        // Thao tác với bảng trung gian PlaylistTrack
        Task AddTrackAsync(PlaylistTrack playlistTrack, CancellationToken cancellationToken = default);
        void RemoveTrack(PlaylistTrack playlistTrack);
    }
}