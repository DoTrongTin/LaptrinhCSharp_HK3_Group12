import React from 'react';
import PlaybackControls from '../ui/playbar/PlaybackControls';
import PlaybarUtilities from '../ui/playbar/PlaybarUtilities';
import TrackInfo from '../ui/playbar/TrackInfo';
import { currentTrack } from '../../data/currentTrack';
import { useAppContext } from '../../context/AppContext'; // ĐÃ THÊM: Import context tổng của ứng dụng

const Playbar: React.FC = () => {
  const { rightPanelData } = useAppContext(); // ĐÃ THÊM: Lấy thông tin bài hát được chọn từ Context

  // Kiểm tra: Nếu có bài hát được click từ vùng trung tâm thì lấy thông tin bài đó, ngược lại dùng bài mặc định (currentTrack)
  const activeTrack = rightPanelData ? {
    artworkUrl: rightPanelData.cover,
    title: rightPanelData.title,
    artist: rightPanelData.artist
  } : {
    artworkUrl: currentTrack.artworkUrl,
    title: currentTrack.title,
    artist: currentTrack.artist
  };

  return (
    <footer style={styles.playbar}>
      {/* ĐÃ CHỈNH SỬA: Truyền dữ liệu động activeTrack thay vì currentTrack cố định */}
      <TrackInfo 
        artworkUrl={activeTrack.artworkUrl} 
        title={activeTrack.title} 
        artist={activeTrack.artist} 
      />
      
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