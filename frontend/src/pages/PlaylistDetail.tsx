import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePlayerStore } from '../store/playerStore';import { playlistService } from '../services/playlistService';
import type { Playlist } from '../types/playlist';
import { mediaService } from '../services/mediaService';
import type { MediaItem } from '../types/media';

// Hàm xử lý đường dẫn ảnh (Chống lỗi vỡ hình)
const getImageUrl = (path?: string | null) => {
  if (!path) return 'https://via.placeholder.com/40/1a1a1a/ffffff?text=Music';
  if (path.startsWith('http')) return path;
  return `http://localhost:5078${path}`;
};

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setRightPanelData } = useAppContext();
  const play = usePlayerStore((s) => s.play);
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        
        // Phân nhánh: Nếu là danh sách "Bài hát đã thích"
        if (id === 'liked') {
          const favorites = await mediaService.getFavorites();
          setPlaylist({
            id: 'liked',
            title: 'Bài hát đã thích',
            coverImageUrl: 'https://via.placeholder.com/150/6366f1/ffffff?text=♥',
            tracks: favorites
          });
        } 
        // Nếu là Playlist bình thường
        else {
          const data = await playlistService.getPlaylistDetail(id);
          setPlaylist(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách phát:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handlePlayTrack = (song: MediaItem) => {
    // 1. Đẩy thông tin lên Panel bên phải
    setRightPanelData({
      title: song.title,
      artist: song.artistName || song.ownerName || 'Ẩn danh',
      cover: getImageUrl(song.thumbnailPath),
      type: 'song'
    });
    
    // 2. Chuyển bài hát xuống Playbar để phát
    play(song);
  };

  // Trạng thái chờ
  if (loading) {
    return <div style={{ padding: 24, color: '#fff' }}>Đang tải danh sách phát...</div>;
  }

  // Trạng thái lỗi không tìm thấy
  if (!playlist) {
    return <div style={{ padding: 24, color: '#fff' }}>Không tìm thấy danh sách phát này.</div>;
  }

  const songs = playlist.tracks || [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img 
          src={getImageUrl(playlist.coverImageUrl)} 
          alt="Playlist Cover" 
          style={styles.coverImage} 
        />
        <div style={styles.headerInfo}>
          <span style={styles.typeText}>Danh sách phát</span>
          <h2 style={styles.title}>{playlist.title}</h2>
          <p style={styles.stats}>{songs.length} bài hát</p>
        </div>
      </div>
      
      {songs.length === 0 ? (
        <p style={{ color: '#b3b3b3', fontSize: '14px', marginTop: '24px' }}>
          Chưa có bài hát nào trong danh sách phát này.
        </p>
      ) : (
        <div style={styles.trackList}>
          {songs.map((song, index) => (
            <div 
              key={song.id}
              onClick={() => handlePlayTrack(song)}
              style={styles.trackItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2a2a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={styles.trackIndex}>{index + 1}</span>
              <img 
                src={getImageUrl(song.thumbnailPath)} 
                alt={song.title} 
                style={styles.trackImage} 
              />
              <div style={styles.trackInfo}>
                <div style={styles.trackTitle}>{song.title}</div>
                <div style={styles.trackArtist}>
                  {song.artistName || song.ownerName || 'Ẩn danh'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '24px', color: '#ffffff', backgroundColor: '#121212', minHeight: '100%', borderRadius: '8px' },
  header: { display: 'flex', alignItems: 'flex-end', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid #282828' },
  coverImage: { width: '192px', height: '192px', borderRadius: '4px', objectFit: 'cover' as const, boxShadow: '0 4px 60px rgba(0,0,0,.5)' },
  headerInfo: { display: 'flex', flexDirection: 'column' as const },
  typeText: { fontSize: '14px', fontWeight: 700, marginBottom: '8px' },
  title: { fontSize: '64px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-0.04em' },
  stats: { color: '#b3b3b3', fontSize: '14px', margin: 0 },
  trackList: { display: 'flex', flexDirection: 'column' as const, gap: '4px', marginTop: '24px' },
  trackItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.2s' },
  trackIndex: { color: '#b3b3b3', width: '24px', textAlign: 'center' as const, fontSize: '16px' },
  trackImage: { width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' as const },
  trackInfo: { flex: 1 },
  trackTitle: { fontWeight: 600, fontSize: '16px', color: '#ffffff', marginBottom: '4px' },
  trackArtist: { fontSize: '14px', color: '#b3b3b3' }
};

export default PlaylistDetail;