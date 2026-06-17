import React, { useEffect, useRef } from 'react';
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
  const audioRef = useRef<HTMLAudioElement>(null); // Trình phát nhạc ẩn
  
  // Lấy toàn bộ state từ Store
  const { 
    currentTrack: currentTrackStore, 
    volume, currentTime, duration, 
    isPlaying, setCurrentTime, playNext 
  } = usePlayerStore();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Lấy thông tin bài hát (Dùng từ Store hoặc Mock mặc định)
  const activeTrack = currentTrackStore
    ? {
        artworkUrl: currentTrackStore.thumbnailPath || 'https://via.placeholder.com/64/1a1a1a/ffffff?text=Music',
        title: currentTrackStore.title,
        artist: currentTrackStore.ownerName || 'Unknown Artist',
        previewUrl: currentTrackStore.previewUrl, // <--- Cần thiết để phát nhạc
        currentTime: formatTime(currentTime),
        duration: formatTime(duration || currentTrackStore.duration),
        progress: progressPercent,
        volume: volume,
      }
    : { ...currentTrack, previewUrl: null };

  // ĐỒNG BỘ PLAY/PAUSE & ÂM LƯỢNG
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = activeTrack.volume / 100;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Lỗi tự động phát:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack.previewUrl, activeTrack.volume]);

  return (
    <footer style={styles.playbar}>
      {/* THẺ AUDIO ẨN: Cỗ máy phát nhạc thực sự */}
      {activeTrack.previewUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.previewUrl}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onEnded={playNext} // Hết bài tự chuyển bài tiếp
        />
      )}

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