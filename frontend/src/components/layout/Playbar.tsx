import React from 'react';
import PlaybackControls from '../ui/playbar/PlaybackControls';
import PlaybarUtilities from '../ui/playbar/PlaybarUtilities';
import TrackInfo from '../ui/playbar/TrackInfo';
import { currentTrack } from '../../data/currentTrack';
import { usePlayerStore } from '../../store/playerStore';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const Playbar: React.FC = () => {
  const currentTrackStore = usePlayerStore((s) => s.currentTrack);
  const volume = usePlayerStore((s) => s.volume);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);

  // Calculate progress percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // If a track is selected from the store, use it; otherwise fallback to default
  const activeTrack = currentTrackStore
    ? {
        artworkUrl: currentTrackStore.thumbnailPath || 'https://via.placeholder.com/64/1a1a1a/ffffff?text=Music',
        title: currentTrackStore.title,
        artist: currentTrackStore.ownerName || 'Unknown Artist',
        currentTime: formatTime(currentTime),
        duration: formatTime(duration || currentTrackStore.duration),
        progress: progressPercent,
        volume: volume,
      }
    : {
        artworkUrl: currentTrack.artworkUrl,
        title: currentTrack.title,
        artist: currentTrack.artist,
        currentTime: currentTrack.currentTime,
        duration: currentTrack.duration,
        progress: currentTrack.progress,
        volume: currentTrack.volume,
      };

  return (
    <footer style={styles.playbar}>
      <TrackInfo
        artworkUrl={activeTrack.artworkUrl}
        title={activeTrack.title}
        artist={activeTrack.artist}
      />

      <PlaybackControls
        currentTime={activeTrack.currentTime}
        duration={activeTrack.duration}
        progress={activeTrack.progress}
      />
      <PlaybarUtilities volume={activeTrack.volume} />
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
};

export default Playbar;