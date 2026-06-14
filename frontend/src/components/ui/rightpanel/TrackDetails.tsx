import React from 'react';
import IconButton from './IconButton';

interface TrackDetailsProps {
  artworkUrl: string;
  title: string;
  artist: string;
  isLiked?: boolean;
  onShare?: () => void;
  onToggleLike?: () => void;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({
  artworkUrl,
  title,
  artist,
  isLiked = false,
  onShare,
  onToggleLike,
}) => {
  return (
    <div style={styles.wrapper}>
      <img src={artworkUrl} alt={title} style={styles.artwork} />

      <div style={styles.infoRow}>
        <div style={styles.textGroup}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.artist}>{artist}</p>
        </div>

        <div style={styles.actions}>
          <IconButton label="Chia sẻ" onClick={onShare}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v12M8 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12v7h12v-7"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>

          <IconButton
            label={isLiked ? 'Đã thêm vào thư viện' : 'Thêm vào thư viện'}
            bordered
            onClick={onToggleLike}
          >
            {isLiked ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12.5l4 4L19 7"
                  stroke="#1db954"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    marginBottom: 24,
  },

  artwork: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover' as const,
    borderRadius: 5,
    boxShadow: '0 8px 28px rgba(0, 0, 0, 0.35)',
  },

  infoRow: {
    display: 'flex' as const,
    alignItems: 'flex-end' as const,
    justifyContent: 'space-between' as const,
    gap: 16,
    paddingTop: 22,
  },

  textGroup: {
    minWidth: 0,
  },

  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: '-1px',
  },

  artist: {
    margin: '2px 0 0',
    color: '#b3b3b3',
    fontSize: 18,
    fontWeight: 700,
  },

  actions: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 14,
    paddingBottom: 9,
  },
};

export default TrackDetails;