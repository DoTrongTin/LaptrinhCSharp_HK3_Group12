import React from 'react';
import { currentTrack } from '../../../data/currentTrack';
import PanelHeader from './PanelHeader';
import TrackDetails from './TrackDetails';
import ArtistAboutCard from './ArtistAboutCard';

interface NowPlayingPanelProps {
  onClose?: () => void;
}

const NowPlayingPanel: React.FC<NowPlayingPanelProps> = ({ onClose }) => {
  return (
    <aside style={styles.rightPanel}>
      
      {/* 1. Gọi Header */}
      <PanelHeader 
        playlistTitle={currentTrack.playlistTitle} 
        onClose={onClose} 
      />

      <section style={styles.scrollArea}>
        
        {/* 2. Gọi Thông tin bài hát & ảnh bìa */}
        <TrackDetails 
          artworkUrl={currentTrack.artworkUrl}
          title={currentTrack.title}
          artist={currentTrack.artist}
        />

        {/* 3. Gọi Card nghệ sĩ */}
        <ArtistAboutCard 
          artistName={currentTrack.artist}
          artistImageUrl={currentTrack.artistImageUrl}
          monthlyListeners={currentTrack.artistMonthlyListeners}
        />

      </section>
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
  },
  scrollArea: { 
    padding: '11px 12px 16px 20px', 
    overflowY: 'auto' as const, 
    minHeight: 0 
  },
};

export default NowPlayingPanel;