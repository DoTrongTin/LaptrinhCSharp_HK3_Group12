import React, { useState } from 'react';
import NowPlayingPanel from '../ui/rightpanel/NowPlayingPanel';
import { ChevronLeft } from 'lucide-react';

const RightPanel: React.FC = () => {
  // Trạng thái: Mặc định là mở (true)
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={{
      ...styles.container,
      // Đổi chiều rộng linh hoạt. Khi đóng lại nó chỉ còn 60px
      width: isExpanded ? 372 : 60,
    }}>
      {isExpanded ? (
        // Truyền hàm đóng xuống NowPlayingPanel
        <NowPlayingPanel onClose={() => setIsExpanded(false)} />
      ) : (
        // Khối hiển thị khi đã ẩn (thanh mỏng có mũi tên)
        <aside style={styles.collapsedPanel}>
          <button 
            style={styles.expandButton} 
            onClick={() => setIsExpanded(true)} 
            title="Mở rộng panel"
          >
            <ChevronLeft size={28} />
          </button>
        </aside>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100%',
    flexShrink: 0,
    transition: 'width 0.3s ease', // Hiệu ứng co giãn mượt mà
    marginLeft: 8, // Tạo một rãnh hở với MainContent
  },
  collapsedPanel: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212', // Màu đen chuẩn Spotify
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    paddingTop: 24, // Cách lề trên một chút cho icon
  },
  expandButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    cursor: 'pointer',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default RightPanel;