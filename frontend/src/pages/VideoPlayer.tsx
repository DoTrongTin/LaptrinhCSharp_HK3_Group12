import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID video từ URL nếu có
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Quay lại
      </button>
      
      <div style={styles.videoContainer}>
        {/* Placeholder cho thẻ <video> thực tế sau này */}
        <div style={styles.videoPlaceholder}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          <p style={{ margin: 0 }}>Trình phát Video</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#b3b3b3', fontWeight: 'normal' }}>
            {id ? `Đang tải nội dung cho ID: ${id}` : 'Chưa có nội dung video'}
          </p>
        </div>
      </div>

      <div style={styles.infoContainer}>
        <h1 style={styles.title}>Tính năng Video đang được phát triển</h1>
        <p style={styles.artist}>TuneVault Studio</p>
        <p style={styles.description}>
          Đây là không gian dành riêng cho các MV ca nhạc hoặc Podcast định dạng Video. 
          Trong các bản cập nhật sắp tới, hệ thống sẽ tích hợp một trình phát video tùy chỉnh, 
          hỗ trợ thu nhỏ khung hình (Picture-in-Picture) để bạn vừa xem video vừa lướt web.
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '24px',
    color: '#ffffff',
    minHeight: '100%',
    backgroundColor: '#121212',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#b3b3b3',
    fontSize: '15px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    padding: '8px 16px',
    fontWeight: 'bold',
    borderRadius: '20px',
    backgroundColor: '#282828',
    transition: 'background-color 0.2s',
  },
  videoContainer: {
    width: '100%',
    maxWidth: '1000px',
    aspectRatio: '16 / 9', // Tỉ lệ chuẩn của video
    backgroundColor: '#000000',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
  },
  videoPlaceholder: {
    textAlign: 'center' as const,
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  infoContainer: {
    maxWidth: '1000px',
    padding: '10px 0',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    fontWeight: 800,
  },
  artist: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    color: '#b3b3b3',
    fontWeight: 'bold',
  },
  description: {
    margin: 0,
    fontSize: '14px',
    color: '#a7a7a7',
    lineHeight: '1.6',
  },
};

export default VideoPlayer;