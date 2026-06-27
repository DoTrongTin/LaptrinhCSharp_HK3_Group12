import React, { useEffect, useRef } from 'react';
import PlaybackControls from '../ui/playbar/PlaybackControls';
import PlaybarUtilities from '../ui/playbar/PlaybarUtilities';
import TrackInfo from '../ui/playbar/TrackInfo';
import { usePlayerStore } from '../../store/playerStore';
import FavoriteButton from '../ui/playbar/FavoriteButton';
import { mediaService } from '../../services/mediaService';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const Playbar: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasRecordedRef = useRef<string | null>(null);

  const {
    currentTrack: currentTrackStore,
    volume, currentTime, duration,
    isPlaying, setCurrentTime, setDuration, playNext
  } = usePlayerStore();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const rawAudioPath = currentTrackStore?.previewUrl || currentTrackStore?.filePath;
  const safeAudioUrl = rawAudioPath?.startsWith('http')
    ? rawAudioPath
    : rawAudioPath ? `http://localhost:5078${rawAudioPath}` : null;

  const rawImgPath = currentTrackStore?.thumbnailPath;
  const safeImgUrl = rawImgPath?.startsWith('http')
    ? rawImgPath
    : rawImgPath ? `http://localhost:5078${rawImgPath}` : 'https://via.placeholder.com/64/1a1a1a/ffffff?text=Music';

  // LOẠI BỎ TOÀN BỘ MOCK DATA
  const activeTrack = currentTrackStore
    ? {
        artworkUrl: safeImgUrl,
        title: currentTrackStore.title,
        artist: currentTrackStore.artistName || currentTrackStore.ownerName || 'Nghệ sĩ ẩn danh',
        previewUrl: safeAudioUrl,
        currentTime: formatTime(currentTime),
        duration: formatTime(duration ?? currentTrackStore.duration ?? 0),
        progress: progressPercent,
        volume: volume,
      }
    : { 
        artworkUrl: 'https://via.placeholder.com/64/121212/121212', // Ảnh rỗng màu đen
        title: '--', 
        artist: '--', 
        previewUrl: null, 
        currentTime: '0:00', 
        duration: '0:00', 
        progress: 0, 
        volume: volume 
      };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = activeTrack.volume / 100;
      if (isPlaying) {
        audioRef.current.play().catch(() => console.log("Đang đợi stream dữ liệu..."));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack.previewUrl, activeTrack.volume]);

  useEffect(() => {
    hasRecordedRef.current = null;
  }, [currentTrackStore?.id]);

  return (
    <footer style={styles.playbar}>
      {activeTrack.previewUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.previewUrl}
          autoPlay={isPlaying}
          onTimeUpdate={() => {
            const currentObj = audioRef.current;
            if (currentObj) {
              const cTime = currentObj.currentTime;
              setCurrentTime(cTime);

              if (cTime > 10 && currentTrackStore?.id && hasRecordedRef.current !== currentTrackStore.id) {
                hasRecordedRef.current = currentTrackStore.id;
                mediaService.recordPlayHistory(currentTrackStore.id).catch(e => console.log('Không thể lưu lịch sử:', e));
              }
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onCanPlay={() => {
            if (isPlaying) audioRef.current?.play().catch(e => console.log(e));
          }}
          onEnded={playNext}
        />
      )}

      <div style={styles.leftColumn}>
        <TrackInfo
          artworkUrl={activeTrack.artworkUrl}
          title={activeTrack.title}
          artist={activeTrack.artist}
        />
        {currentTrackStore?.id && (
          <FavoriteButton 
            key={currentTrackStore.id} 
            mediaId={currentTrackStore.id} 
            size={20} 
          />
        )}
      </div>

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
  leftColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    minWidth: 0,
  }
};

export default Playbar;