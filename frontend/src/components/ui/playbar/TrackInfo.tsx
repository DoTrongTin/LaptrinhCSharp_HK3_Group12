import React from 'react';
import { CirclePlus } from 'lucide-react';
import PlaybarIconButton from './PlaybarIconButton';

interface TrackInfoProps {
  artworkUrl: string;
  title: string;
  artist: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ artworkUrl, title, artist }) => {
  return (
    <section style={styles.trackSection}>
      <img src={artworkUrl} alt="Track artwork" style={styles.albumArt} />
      <div style={styles.trackInfo}>
        <span style={styles.trackTitle}>{title}</span>
        <span style={styles.artistName}>{artist}</span>
      </div>
      <PlaybarIconButton icon={CirclePlus} title="Thêm vào thư viện" />
    </section>
  );
};

const styles = {
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
};

export default TrackInfo;