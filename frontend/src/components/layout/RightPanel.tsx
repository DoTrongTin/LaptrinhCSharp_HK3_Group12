import React, { useState } from 'react';
import NowPlayingPanel from '../ui/rightpanel/NowPlayingPanel';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext'; // ĐÃ THÊM: Import context tổng để lắng nghe bài hát

const RightPanel: React.FC = () => {
  // Trạng thái: Mặc định là mở (true)
  const [isExpanded, setIsExpanded] = useState(true);
  
  // ĐÃ THÊM: Lấy dữ liệu bài hát được chọn từ Context
  const { rightPanelData } = useAppContext();

  return (
    <div style={{
      ...styles.container,
      // Đổi chiều rộng linh hoạt. Khi đóng lại nó chỉ còn 60px
      width: isExpanded ? 372 : 60,
    }}>
      {isExpanded ? (
        // ĐÃ CHỈNH SỬA: Truyền thêm prop trackData xuống cho component hiển thị giao diện
        <NowPlayingPanel 
          onClose={() => setIsExpanded(false)} 
          trackData={rightPanelData} 
        />
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