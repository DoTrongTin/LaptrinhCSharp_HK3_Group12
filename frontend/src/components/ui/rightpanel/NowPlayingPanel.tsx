import React from 'react';
import { currentTrack } from '../../../data/currentTrack';

const IconButton: React.FC<{
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
}> = ({ label, children, bordered = false }) => (
  <button
    aria-label={label}
    title={label}
    style={{
      ...styles.iconButton,
      ...(bordered ? styles.borderedIconButton : null),
    }}
  >
    {children}
  </button>
);

const NowPlayingPanel: React.FC = () => {
  return (
    <aside style={styles.rightPanel}>
      <header style={styles.header}>
        <div style={styles.playlistTitleWrap}>
          <IconButton label="Đang phát">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 5h14v14H4z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 8l4 4-4 4V8z" fill="currentColor" />
              <path d="M20 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </IconButton>
          <h2 style={styles.playlistTitle}>{currentTrack.playlistTitle}</h2>
        </div>
        <div style={styles.headerActions}>
          <IconButton label="Tùy chọn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5" cy="12" r="1.7" />
              <circle cx="12" cy="12" r="1.7" />
              <circle cx="19" cy="12" r="1.7" />
            </svg>
          </IconButton>
          <IconButton label="Mở rộng">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 4H4v4M4 4l6 6M16 20h4v-4M20 20l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
        </div>
      </header>

      <section style={styles.scrollArea}>
        <img
          src={currentTrack.artworkUrl}
          alt={`${currentTrack.title} artwork`}
          style={styles.albumCover}
        />

        <div style={styles.trackRow}>
          <div style={styles.trackText}>
            <h1 style={styles.trackTitle}>{currentTrack.title}</h1>
            <p style={styles.artistName}>{currentTrack.artist}</p>
          </div>
          <div style={styles.trackActions}>
            <IconButton label="Chia sẻ">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v12M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v7h12v-7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>
            <IconButton label="Đóng">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </IconButton>
            <IconButton label="Thêm vào thư viện" bordered>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </IconButton>
          </div>
        </div>

        <section style={styles.artistCard}>
          <div style={styles.artistHero}>
            <img
              src={currentTrack.artistImageUrl}
              alt={`${currentTrack.artist} artist`}
              style={styles.artistImage}
            />
            <div style={styles.artistGradient} />
            <h3 style={styles.artistCardTitle}>Giới thiệu về nghệ sĩ</h3>
          </div>
          <div style={styles.artistInfo}>
            <div style={styles.artistInfoHeader}>
              <div style={styles.verifiedName}>
                <span>{currentTrack.artist}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2.5l2.2 1.9 2.9-.3 1.1 2.7 2.5 1.5-.9 2.8.9 2.8-2.5 1.5-1.1 2.7-2.9-.3-2.2 1.9-2.2-1.9-2.9.3-1.1-2.7-2.5-1.5.9-2.8-.9-2.8 2.5-1.5 1.1-2.7 2.9.3L12 2.5z" fill="#9bf6b5" />
                  <path d="M8.5 12.1l2.2 2.2 4.8-5" stroke="#0f1f14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <button style={styles.followButton}>Theo dõi</button>
            </div>
            <p style={styles.monthlyListeners}>{currentTrack.artistMonthlyListeners}</p>
          </div>
        </section>
      </section>
    </aside>
  );
};

const styles = {
  rightPanel: {
    width: 372,
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
  },
  header: {
    height: 66,
    padding: '0 20px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
    flexShrink: 0,
  },
  playlistTitleWrap: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 12,
    minWidth: 0,
  },
  playlistTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 800,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis',
  },
  headerActions: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 13,
    color: '#b3b3b3',
  },
  iconButton: {
    width: 24,
    height: 24,
    border: 'none',
    padding: 0,
    background: 'transparent',
    color: '#b3b3b3',
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    cursor: 'pointer',
    flexShrink: 0,
  },
  borderedIconButton: {
    border: '2px solid #b3b3b3',
    borderRadius: '50%',
    width: 19,
    height: 19,
  },
  scrollArea: {
    padding: '11px 12px 16px 20px',
    overflowY: 'auto' as const,
    minHeight: 0,
  },
  albumCover: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover' as const,
    display: 'block',
    borderRadius: 5,
    boxShadow: '0 8px 28px rgba(0, 0, 0, 0.35)',
  },
  trackRow: {
    display: 'flex' as const,
    alignItems: 'flex-end' as const,
    justifyContent: 'space-between' as const,
    gap: 16,
    paddingTop: 22,
  },
  trackText: {
    minWidth: 0,
  },
  trackTitle: {
    margin: 0,
    fontSize: 28,
    lineHeight: '34px',
    fontWeight: 900,
    letterSpacing: '-1px',
  },
  artistName: {
    margin: '2px 0 0',
    color: '#b3b3b3',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 700,
  },
  trackActions: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 14,
    paddingBottom: 9,
    color: '#b3b3b3',
  },
  artistCard: {
    marginTop: 24,
    background: '#1f1f1f',
    borderRadius: 7,
    overflow: 'hidden' as const,
  },
  artistHero: {
    position: 'relative' as const,
    height: 225,
    overflow: 'hidden' as const,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
  },
  artistGradient: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.28) 100%)',
  },
  artistCardTitle: {
    position: 'absolute' as const,
    top: 19,
    left: 18,
    margin: 0,
    fontSize: 20,
    lineHeight: '25px',
    fontWeight: 900,
  },
  artistInfo: {
    padding: '20px 18px 15px',
  },
  artistInfoHeader: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },
  verifiedName: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 5,
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 900,
  },
  followButton: {
    minWidth: 93,
    height: 38,
    padding: '0 18px',
    borderRadius: 999,
    border: '1px solid #888888',
    background: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },
  monthlyListeners: {
    margin: '16px 0 0',
    color: '#b3b3b3',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 700,
  },
};

export default NowPlayingPanel;