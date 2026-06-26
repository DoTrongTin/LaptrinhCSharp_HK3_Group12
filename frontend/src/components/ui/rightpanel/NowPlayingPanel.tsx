import React, { useState } from 'react';
import { currentTrack } from '../../../data/currentTrack';
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

const queueData = [
  {
    id: 1,
    title: 'The Lie',
    artist: 'Long Afternoon',
    cover: 'https://via.placeholder.com/60/1a1a1a/ffffff?text=Lie',
  },
  {
    id: 2,
    title: 'Painted Silence',
    artist: 'Long Afternoon',
    cover: 'https://via.placeholder.com/60/6366f1/ffffff?text=PS',
  },
  {
    id: 3,
    title: '2AM',
    artist: 'JustaTee, BigDaddy',
    cover: 'https://via.placeholder.com/60/1DB954/ffffff?text=2AM',
  },
];

const NowPlayingPanel: React.FC<NowPlayingPanelProps> = ({ onClose, trackData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllCredits, setShowAllCredits] = useState(false);
  const [showQueue, setShowQueue] = useState(true);
  const [toast, setToast] = useState('');

  const [selectedTrack, setSelectedTrack] = useState<{
    title: string;
    artist: string;
    cover: string;
  } | null>(null);

  const { currentTrack: currentTrackStore } = usePlayerStore();

  // 1. Lưu lại track trước đó để so sánh (thay thế cho useEffect)
  const [prevTrackTitle, setPrevTrackTitle] = useState(trackData?.title);

  // 2. Kỹ thuật "Derived State" cập nhật ngay trong lúc Render -> KHÔNG BỊ LỖI ESLINT
  if (trackData?.title !== prevTrackTitle) {
    setPrevTrackTitle(trackData?.title);
    setSelectedTrack(null);
    setIsLiked(false);
    setShowAllCredits(false);
  }

  // 3. Hợp nhất object activeTrack chuẩn hóa
  const activeTrack = selectedTrack
    ? {
        playlistTitle: selectedTrack.artist,
        artworkUrl: selectedTrack.cover,
        title: selectedTrack.title,
        artist: currentTrackStore?.artistName || currentTrackStore?.ownerName || currentTrack.artist,
        artistImageUrl: currentTrack.artistImageUrl,
        artistMonthlyListeners: currentTrack.artistMonthlyListeners,
      }
    : trackData
      ? {
          playlistTitle: trackData.type === 'artist' ? trackData.title : trackData.artist,
          artworkUrl: trackData.cover,
          title: trackData.title,
          artist: trackData.artist,
          artistImageUrl: trackData.cover,
          artistMonthlyListeners: currentTrack.artistMonthlyListeners,
        }
      : {
          playlistTitle: currentTrack.playlistTitle,
          artworkUrl: currentTrackStore?.thumbnailPath || currentTrack.artworkUrl,
          title: currentTrackStore?.title || currentTrack.title,
          artist: currentTrackStore?.ownerName || currentTrack.artist,
          artistImageUrl: currentTrackStore?.thumbnailPath || currentTrack.artistImageUrl,
          artistMonthlyListeners: currentTrack.artistMonthlyListeners,
        };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => {
      setToast('');
    }, 1800);
  };

  const handleShare = async () => {
    const fakeUrl = `${window.location.origin}/track/${encodeURIComponent(activeTrack.title)}`;
    try {
      await navigator.clipboard.writeText(fakeUrl);
      showToast('Đã copy link chia sẻ.');
    } catch {
      showToast('Không thể copy link, nhưng nút Share đã hoạt động.');
    }
    setIsMenuOpen(false);
  };

  // 4. API Tương tác Like thực tế
  const handleToggleLike = async () => {
    const targetId = currentTrackStore?.id;
    
    if (!targetId) {
      showToast('Không có bài hát từ hệ thống đang phát để yêu thích.');
      return;
    }

    try {
      const result = await mediaService.toggleFavorite(targetId);
      setIsLiked(result.data); 
      showToast(result.message);
    } catch (error) {
      showToast('Thao tác tương tác yêu thích thất bại.');
      console.error(error);
    }
    setIsMenuOpen(false);
  };

  const handleToggleFollow = () => {
    setIsFollowing((current) => {
      const next = !current;
      showToast(next ? `Đã theo dõi ${activeTrack.artist}.` : `Đã bỏ theo dõi ${activeTrack.artist}.`);
      return next;
    });
  };

  const handleExpand = () => {
    showToast('Chế độ mở rộng panel sẽ phát triển sau.');
  };

  return (
    <aside style={styles.rightPanel}>
      <div style={styles.headerWrapper}>
        <PanelHeader
          playlistTitle={activeTrack.playlistTitle}
          onClose={onClose}
          onMenuClick={() => setIsMenuOpen((current) => !current)}
          onExpandClick={handleExpand}
        />

        {isMenuOpen && (
          <div style={styles.menu}>
            <button style={styles.menuItem} onClick={handleShare}>
              Chia sẻ
            </button>

            <button style={styles.menuItem} onClick={handleToggleLike}>
              {isLiked ? 'Bỏ khỏi thư viện' : 'Thêm vào thư viện'}
            </button>

            <button
              style={styles.menuItem}
              onClick={() => {
                setShowAllCredits(true);
                setIsMenuOpen(false);
                showToast('Đã mở Credits.');
              }}
            >
              Xem credits
            </button>

            <button
              style={styles.menuItem}
              onClick={() => {
                setShowQueue((current) => !current);
                setIsMenuOpen(false);
              }}
            >
              {showQueue ? 'Ẩn queue' : 'Mở queue'}
            </button>
          </div>
        )}
      </div>

      <section style={styles.scrollArea}>
        <TrackDetails
          artworkUrl={activeTrack.artworkUrl}
          title={activeTrack.title}
          artist={activeTrack.artist}
          isLiked={isLiked}
          onShare={handleShare}
          onToggleLike={handleToggleLike}
        />

        <ArtistAboutCard
          artistName={activeTrack.artist}
          artistImageUrl={activeTrack.artistImageUrl}
          monthlyListeners={activeTrack.artistMonthlyListeners}
          isFollowing={isFollowing}
          showAllCredits={showAllCredits}
          onToggleFollow={handleToggleFollow}
          onToggleCredits={() => setShowAllCredits((current) => !current)}
        />

        <section style={styles.queueCard}>
          <div style={styles.queueHeader}>
            <h3 style={styles.queueTitle}>Next in queue</h3>

            <button
              style={styles.openQueueButton}
              onClick={() => setShowQueue((current) => !current)}
            >
              {showQueue ? 'Hide queue' : 'Open queue'}
            </button>
          </div>

          {showQueue && (
            <div style={styles.queueList}>
              {queueData.map((song) => (
                <div
                  key={song.id}
                  style={styles.queueItem}
                  onClick={() => {
                    setSelectedTrack({
                      title: song.title,
                      artist: song.artist,
                      cover: song.cover,
                    });
                    setIsLiked(false);
                    showToast(`Đang xem: ${song.title}`);
                  }}
                >
                  <img src={song.cover} alt={song.title} style={styles.queueCover} />

                  <div style={styles.queueInfo}>
                    <div style={styles.queueSongTitle}>{song.title}</div>
                    <div style={styles.queueArtist}>{song.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
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