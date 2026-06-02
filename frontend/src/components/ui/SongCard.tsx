import React from 'react';
import { Play } from 'lucide-react';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  duration?: number;
  onPlay?: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ id, title, artist, coverUrl, duration, onPlay }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={coverUrl || 'https://via.placeholder.com/150?text=Song'}
          alt={title}
          style={styles.image}
        />
        {isHovered && (
          <button
            style={styles.playButton}
            onClick={onPlay}
            title="Play song"
          >
            <Play size={24} fill="white" color="white" />
          </button>
        )}
      </div>
      <div style={styles.info}>
        <h4 style={styles.title}>{title}</h4>
        <p style={styles.artist}>{artist}</p>
        {duration && <p style={styles.duration}>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</p>}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    ':hover': {
      backgroundColor: '#2a2a2a',
    },
  },
  imageContainer: {
    position: 'relative' as const,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover' as const,
  },
  playButton: {
    position: 'absolute' as const,
    bottom: 8,
    right: 8,
    backgroundColor: '#1DB954',
    border: 'none',
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#1ed760',
      transform: 'scale(1.1)',
    },
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  duration: {
    color: '#808080',
    fontSize: 11,
    margin: 0,
  },
};

export default SongCard;
