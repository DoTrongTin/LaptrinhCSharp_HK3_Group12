import React from 'react';
import { Outlet } from 'react-router-dom'; // ĐỒNG BỘ ROUTER: Cổng chờ cho vùng trung tâm
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import Playbar from './Playbar';
import '../../styles/globals.css';

const MainLayout: React.FC = () => {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.contentArea}>
        {/* 1. Thanh điều hướng bên trái cố định */}
        <Sidebar />
        
        {/* 2. VÙNG TRUNG TÂM TỰ ĐỘNG THAY ĐỔI: 
            Thay <MainContent /> bằng <Outlet />. Khi URL thay đổi, 
            các trang con (như HomeContent hoặc PlaylistDetail) sẽ tự động hiển thị ở đây. */}
        <div style={styles.mainContentWrapper}>
          <Outlet />
        </div>
        
        {/* 3. Panel bên phải hiển thị chi tiết nghệ sĩ/bài hát */}
        <RightPanel />
      </div>
      <Playbar />
    </div>
  );
};

const styles = {
  layout: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000000',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  contentArea: {
    display: 'flex' as const,
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    gap: 8,             // ĐIỂM CỐT LÕI: Tạo rãnh đen 8px giữa 3 cột
    padding: '0 8px',   // Đẩy 3 cột thụt vào so với mép màn hình trái/phải 8px
  },
  // Thêm style bọc ngoài Outlet để đảm bảo vùng trung tâm có thể cuộn nội dung độc lập
  mainContentWrapper: {
    minWidth: 0,
    height: '100%',
    flex: 1,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    overflowY: 'auto' as const, // Cho phép cuộn dọc nội dung khi danh sách bài hát quá dài
    backgroundColor: '#121212', // Màu nền tối cho vùng trung tâm giống Spotify
    borderRadius: 8,            // Bo góc đồng bộ với các khối khác
  }
};

export default MainLayout;