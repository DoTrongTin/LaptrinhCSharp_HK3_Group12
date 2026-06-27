import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Dữ liệu mẫu khớp với danh sách phát bên Sidebar của Đỗ Trọng Tín để bạn test logic
const mockSongs = [
  { id: 's1', playlistId: '1', title: 'Detective Conan Main Theme', artist: 'Katsuo Ono', cover: 'https://via.placeholder.com/150/6366f1/ffffff?text=Conan' },
  { id: 's2', playlistId: '1', title: 'Chịu Cách Mình Nói Thua', artist: 'RHYDER, CoolKid, BAN', cover: 'https://via.placeholder.com/150/1DB954/ffffff?text=Rhyder' },
  { id: 's3', playlistId: '2', title: 'IELTS Listening Practice', artist: 'Podcourses', cover: 'https://via.placeholder.com/150/5555bb/ffffff?text=IELTS' },
  { id: 's4', playlistId: '4', title: 'Nụ Cười Chút Nắng', artist: 'Vũ Phụng Tiên', cover: 'https://via.placeholder.com/150/333333/ffffff?text=VPT' },
];

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL /playlist/:id
  const { setRightPanelData } = useAppContext();

  // Lọc ra các bài hát thuộc Playlist đang xem
  const songs = mockSongs.filter(song => song.playlistId === id);

  return (
    <div style={{ padding: '24px', color: '#ffffff', backgroundColor: '#121212', minHeight: '100%', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Chi tiết Danh sách phát #{id}</h2>
      
      {songs.length === 0 ? (
        <p style={{ color: '#b3b3b3', fontSize: '14px' }}>Chưa có bài hát nào trong danh sách phát này hoặc ID không khớp.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {songs.map((song, index) => (
            <div 
              key={song.id}
              onClick={() => setRightPanelData({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                id: (song as any).id || (song as any).mediaItemId,
                title: song.title,
                artist: song.artist,
                cover: song.cover,
                type: 'song'
              })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                backgroundColor: '#181818',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2a2a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181818')}
            >
              <span style={{ color: '#b3b3b3', width: '24px', textAlign: 'center' }}>{index + 1}</span>
              <img src={song.cover} alt={song.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '15px', color: '#ffffff' }}>{song.title}</div>
                <div style={{ fontSize: '13px', color: '#b3b3b3', marginTop: '4px' }}>{song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;