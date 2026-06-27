import React, { useState } from 'react';
 
import PanelHeader from './PanelHeader';
import TrackDetails from './TrackDetails';
import ArtistAboutCard from './ArtistAboutCard';
import { mediaService } from '../../../services/mediaService';
import { usePlayerStore } from '../../../store/playerStore';

interface NowPlayingPanelProps {
  onClose?: () => void;
  trackData: {
    title: string;
    artist: string;
    cover: string;
    type: 'song' | 'artist';
  } | null;
}

const NowPlayingPanel: React.FC<NowPlayingPanelProps> = ({ onClose, trackData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllCredits, setShowAllCredits] = useState(false);
  const [toast, setToast] = useState('');

  const { currentTrack: currentTrackStore } = usePlayerStore();

  // Dữ liệu hiển thị ưu tiên:
  // 1. Nếu có trackData từ trang Playlist Detail -> lấy từ đó
  // 2. Nếu không, lấy từ bài hát đang phát (currentTrackStore)
  const activeTrack = trackData || (currentTrackStore ? {
    title: currentTrackStore.title,
    artist: currentTrackStore.artistName || currentTrackStore.ownerName || 'Ẩn danh',
    cover: currentTrackStore.thumbnailPath 
      ? (currentTrackStore.thumbnailPath.startsWith('http') ? currentTrackStore.thumbnailPath : `http://localhost:5078${currentTrackStore.thumbnailPath}`)
      : 'https://via.placeholder.com/300/121212/ffffff?text=No+Cover',
    type: 'song' as const
  } : null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1800);
  };

  const handleToggleLike = async () => {
    const targetId = currentTrackStore?.id;
    if (!targetId) return;
    try {
      const result = await mediaService.toggleFavorite(targetId);
      setIsLiked(result.data); 
      showToast(result.message);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast('Thao tác yêu thích thất bại.');
    }
  };

  if (!activeTrack) {
    return (
      <aside style={styles.rightPanel}>
        <PanelHeader playlistTitle="Đang phát" onClose={onClose} />
        <div style={{ padding: 20, color: '#b3b3b3', textAlign: 'center' }}>
          Không có bài hát nào đang được chọn.
        </div>
      </aside>
    );
  }

  return (
    <aside style={styles.rightPanel}>
      <div style={styles.headerWrapper}>
        <PanelHeader
          playlistTitle={activeTrack.title}
          onClose={onClose}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      <section style={styles.scrollArea}>
        <TrackDetails
          artworkUrl={activeTrack.cover}
          title={activeTrack.title}
          artist={activeTrack.artist}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
        />

        <ArtistAboutCard
          artistName={activeTrack.artist}
          artistImageUrl={activeTrack.cover}
          monthlyListeners="Đang cập nhật..."
          isFollowing={isFollowing}
          showAllCredits={showAllCredits}
          onToggleFollow={() => setIsFollowing(!isFollowing)}
          onToggleCredits={() => setShowAllCredits(!showAllCredits)}
        />
        
        {/* Đã xóa bỏ phần Queue giả ở đây */}
      </section>

      {toast && <div style={styles.toast}>{toast}</div>}
    </aside>
  );
};

const styles = {
  rightPanel: {
    width: '100%',
    height: '100%',
    minHeight: 0,
    flexShrink: 0,
    overflow: 'hidden' as const,
    background: '#121212',
    color: '#ffffff',
    borderRadius: 8,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    fontFamily: 'var(--font-primary)',
    position: 'relative' as const,
  },
  headerWrapper: { position: 'relative' as const, flexShrink: 0 },
  menu: {
    position: 'absolute' as const,
    top: 52,
    right: 16,
    width: 190,
    backgroundColor: '#282828',
    border: '1px solid #3a3a3a',
    borderRadius: 8,
    padding: 6,
    zIndex: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
  },
  menuItem: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    textAlign: 'left' as const,
    padding: '9px 10px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 13,
  },
  scrollArea: {
    padding: '11px 12px 16px 20px',
    overflowY: 'auto' as const,
    minHeight: 0,
  },
  queueCard: { backgroundColor: '#1f1f1f', borderRadius: 8, padding: 18, marginBottom: 20 },
  queueHeader: { display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: 16 },
  queueTitle: { margin: 0, fontSize: 20, fontWeight: 900 },
  openQueueButton: { background: 'transparent', border: 'none', color: '#b3b3b3', fontSize: 15, fontWeight: 800, cursor: 'pointer' },
  queueList: { display: 'flex' as const, flexDirection: 'column' as const, gap: 12 },
  queueItem: { display: 'flex' as const, alignItems: 'center' as const, gap: 12, cursor: 'pointer', borderRadius: 6, padding: 6 },
  queueCover: { width: 48, height: 48, objectFit: 'cover' as const, borderRadius: 4 },
  queueInfo: { minWidth: 0 },
  queueSongTitle: { fontSize: 16, fontWeight: 800, color: '#ffffff' },
  queueArtist: { fontSize: 14, color: '#b3b3b3', marginTop: 3 },
  toast: {
    position: 'absolute' as const,
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: '#1db954',
    color: '#000000',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 800,
    textAlign: 'center' as const,
    zIndex: 30,
  },
};

export default NowPlayingPanel;