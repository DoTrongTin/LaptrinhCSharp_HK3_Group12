import React from 'react';
import {
  CirclePlus,
  ListMusic,
  Maximize2,
  Mic2,
  MonitorSpeaker,
  Pause,
  PictureInPicture2,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';

const Playbar: React.FC = () => {
  return (
    <footer style={styles.playbar}>
      <section style={styles.trackSection}>
        <img
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=96&q=80"
          alt="Track artwork"
          style={styles.albumArt}
        />
        <div style={styles.trackInfo}>
          <span style={styles.trackTitle}>Detective Conan Main Theme</span>
          <span style={styles.artistName}>Katsuo Ono</span>
        </div>
        <button style={styles.subtleButton} title="Thêm vào thư viện">
          <CirclePlus size={18} />
        </button>
      </section>

      <section style={styles.playerSection}>
        <div style={styles.controlsRow}>
          <button style={styles.controlButton} title="Trộn bài">
            <Shuffle size={18} />
          </button>
          <button style={styles.controlButton} title="Bài trước">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button style={styles.playButton} title="Tạm dừng">
            <Pause size={20} fill="currentColor" />
          </button>
          <button style={styles.controlButton} title="Bài tiếp theo">
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button style={styles.controlButton} title="Lặp lại">
            <Repeat2 size={18} />
          </button>
        </div>

        <div style={styles.progressRow}>
          <span style={styles.timeText}>1:21</span>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill} />
          </div>
          <span style={styles.timeText}>3:42</span>
        </div>
      </section>

      <section style={styles.utilitySection}>
        <button style={styles.subtleButton} title="Lời bài hát">
          <Mic2 size={18} />
        </button>
        <button style={styles.subtleButton} title="Danh sách phát">
          <ListMusic size={18} />
        </button>
        <button style={styles.subtleButton} title="Kết nối thiết bị">
          <MonitorSpeaker size={18} />
        </button>
        <button style={styles.subtleButton} title="Chế độ thu nhỏ">
          <PictureInPicture2 size={18} />
        </button>
        <div style={styles.volumeGroup}>
          <button style={styles.subtleButton} title="Âm lượng">
            <Volume2 size={18} />
          </button>
          <div style={styles.volumeTrack}>
            <div style={styles.volumeFill} />
          </div>
        </div>
        <button style={styles.subtleButton} title="Toàn màn hình">
          <Maximize2 size={17} />
        </button>
      </section>
    </footer>
  );
};

const styles = {
  playbar: {
    height: 88,
    backgroundColor: '#000000',
    width: '100%',
    flexShrink: 0,
    display: 'grid' as const,
    gridTemplateColumns: 'minmax(260px, 1fr) minmax(360px, 1.3fr) minmax(260px, 1fr)',
    alignItems: 'center' as const,
    columnGap: 24,
    padding: '0 16px',
    boxSizing: 'border-box' as const,
    color: '#ffffff',
  },
  trackSection: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    minWidth: 0,
    gap: 12,
  },
  albumArt: {
    width: 56,
    height: 56,
    borderRadius: 4,
    objectFit: 'cover' as const,
    flexShrink: 0,
  },
  trackInfo: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    minWidth: 0,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  artistName: {
    color: '#a7a7a7',
    fontSize: 12,
    marginTop: 3,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  playerSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    minWidth: 0,
  },
  controlsRow: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 18,
  },
  controlButton: {
    width: 28,
    height: 28,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: '#b3b3b3',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  playButton: {
    width: 34,
    height: 34,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    color: '#000000',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  progressRow: {
    width: '100%',
    maxWidth: 620,
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  timeText: {
    color: '#a7a7a7',
    fontSize: 12,
    minWidth: 36,
    textAlign: 'center' as const,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#4d4d4d',
    overflow: 'hidden',
  },
  progressFill: {
    width: '37%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  utilitySection: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
    gap: 12,
    minWidth: 0,
  },
  subtleButton: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#b3b3b3',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },
  volumeGroup: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  volumeTrack: {
    width: 92,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#4d4d4d',
    overflow: 'hidden',
  },
  volumeFill: {
    width: '72%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
};

export default Playbar;
