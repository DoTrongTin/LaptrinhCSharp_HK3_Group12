import React from 'react';
import { Play } from 'lucide-react';

interface PlaylistCardProps {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  songCount?: number;
  onPlay?: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ id, name, description, coverUrl, songCount, onPlay }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={coverUrl || 'https://via.placeholder.com/150?text=Playlist'}
          alt={name}
          style={styles.image}
        />
        {isHovered && (
          <button
            style={styles.playButton}
            onClick={onPlay}
            title="Play playlist"
          >
            <Play size={24} fill="white" color="white" />
          </button>
        )}
      </div>
      <div style={styles.info}>
        <h4 style={styles.title}>{name}</h4>
        {description && <p style={styles.description}>{description}</p>}
        {songCount && <p style={styles.songCount}>{songCount} songs</p>}
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
  description: {
    color: '#b3b3b3',
    fontSize: 12,
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  songCount: {
    color: '#808080',
    fontSize: 11,
    margin: 0,
  },
};

export default PlaylistCard;
