import React from 'react';
import PlaybackControls from '../ui/playbar/PlaybackControls';
import PlaybarUtilities from '../ui/playbar/PlaybarUtilities';
import TrackInfo from '../ui/playbar/TrackInfo';
import { currentTrack } from '../../data/currentTrack';

const Playbar: React.FC = () => {
  return (
    <footer style={styles.playbar}>
      <TrackInfo artworkUrl={currentTrack.artworkUrl} title={currentTrack.title} artist={currentTrack.artist} />
      <PlaybackControls
        currentTime={currentTrack.currentTime}
        duration={currentTrack.duration}
        progress={currentTrack.progress}
      />
      <PlaybarUtilities volume={currentTrack.volume} />
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
