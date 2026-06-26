import React, { useEffect, useRef } from 'react';
import PlaybackControls from '../ui/playbar/PlaybackControls';
import PlaybarUtilities from '../ui/playbar/PlaybarUtilities';
import TrackInfo from '../ui/playbar/TrackInfo';
import { currentTrack } from '../../data/currentTrack';
import { usePlayerStore } from '../../store/playerStore';
import FavoriteButton from '../ui/FavoriteButton';
import { mediaService } from '../../services/mediaService'; // Import service để gọi API

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

  // Xử lý link nhạc và ảnh an toàn tuyệt đối
  const rawAudioPath = currentTrackStore?.previewUrl || currentTrackStore?.filePath;
  const safeAudioUrl = rawAudioPath?.startsWith('http')
    ? rawAudioPath
    : rawAudioPath ? `http://localhost:5078${rawAudioPath}` : null;

  const rawImgPath = currentTrackStore?.thumbnailPath;
  const safeImgUrl = rawImgPath?.startsWith('http')
    ? rawImgPath
    : rawImgPath ? `http://localhost:5078${rawImgPath}` : 'https://via.placeholder.com/64/1a1a1a/ffffff?text=Music';

  const activeTrack = currentTrackStore
    ? {
        artworkUrl: safeImgUrl,
        title: currentTrackStore.title,
        artist: currentTrackStore.artistName || 'Nghệ sĩ ẩn danh',
        previewUrl: safeAudioUrl,
        currentTime: formatTime(currentTime),
        duration: formatTime(duration ?? currentTrackStore.duration ?? 0),
        progress: progressPercent,
        volume: volume,
      }
    : { ...currentTrack, previewUrl: null };

  // ĐỒNG BỘ PLAY/PAUSE
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

  // 2. Reset bộ đếm lịch sử mỗi khi chuyển sang bài hát khác
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

              // 3. THỰC THI RecordPlayHistoryCommand: Ghi nhận lịch sử nghe khi bài hát trôi qua 10 giây
              if (cTime > 10 && currentTrackStore?.id && hasRecordedRef.current !== currentTrackStore.id) {
                hasRecordedRef.current = currentTrackStore.id; // Đánh dấu là đã lưu
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

      {/* 4. THỰC THI ToggleFavoriteCommand: Gắn nút thả tim vào giao diện */}
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
  // Bổ sung style cho cột chứa thông tin bài hát và nút tim
  leftColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    minWidth: 0, // Giữ cho nội dung không bị đẩy tràn khỏi grid
  }
};

export default Playbar;