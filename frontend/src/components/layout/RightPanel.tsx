import React from 'react';
import { Music, TrendingUp } from 'lucide-react';

interface TrendingSong {
  id: string;
  title: string;
  artist: string;
  rank: number;
  plays?: number;
}

const RightPanel: React.FC = () => {
  const trendingSongs: TrendingSong[] = [
    { id: '1', title: 'Nơi Này Có Anh', artist: 'Sơn Tùng M-TP', rank: 1, plays: 2089296 },
    { id: '2', title: 'Một Chút "Suy"', artist: 'JVKE, BTS, James Arthur', rank: 2, plays: 1856432 },
    { id: '3', title: 'Tuyên Tập của Huynh Văn', artist: 'Lâm Tuấn, Doãn Hiếu', rank: 3, plays: 1743821 },
    { id: '4', title: 'Tuyên Tập của Vũ Phương Tâm', artist: 'UMIE, T.R.I và Kha', rank: 4, plays: 1654329 },
    { id: '5', title: 'Sóng Xanh', artist: 'Sơn Tùng M-TP, Vũ Cát Tường', rank: 5, plays: 1523456 },
  ];

  return (
    <aside style={styles.rightPanel}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <TrendingUp size={20} color="#1DB954" />
          <h3 style={styles.titleText}>Danh sách phát của tôi</h3>
        </div>
      </div>

      {/* Songs List */}
      <div style={styles.songsList}>
        {trendingSongs.map((song) => (
          <div key={song.id} style={styles.songItem}>
            <div style={styles.rankBadge}>
              <span style={styles.rankNumber}>{song.rank}</span>
            </div>
            <div style={styles.songInfo}>
              <h5 style={styles.songTitle}>{song.title}</h5>
              <p style={styles.songArtist}>{song.artist}</p>
              {song.plays && (
                <p style={styles.plays}>
                  <Music size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {(song.plays / 1000).toFixed(0)}K plays
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div style={styles.footer}>
        <p style={styles.footerText}>Updated Daily</p>
      </div>
    </aside>
  );
};

const styles = {
  rightPanel: {
    width: 280,
    backgroundColor: '#0f0f0f',
    height: '100%',
    minHeight: 0,
    flexShrink: 0,
    overflow: 'auto' as const,
    borderLeft: '1px solid #282828',
    padding: '20px 0',
  },
  header: {
    padding: '0 16px 20px 16px',
    borderBottom: '1px solid #282828',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  },
  songsList: {
    padding: '12px 8px',
  },
  songItem: {
    display: 'flex',
    gap: 12,
    padding: '10px 8px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#1DB954',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rankNumber: {
    color: '#000',
    fontWeight: 700,
    fontSize: 16,
  },
  songInfo: {
    flex: 1,
    minWidth: 0,
  },
  songTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    margin: '0 0 2px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 12,
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  plays: {
    color: '#808080',
    fontSize: 11,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    padding: '16px',
    borderTop: '1px solid #282828',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#808080',
    fontSize: 11,
    margin: 0,
  },
};

export default RightPanel;
