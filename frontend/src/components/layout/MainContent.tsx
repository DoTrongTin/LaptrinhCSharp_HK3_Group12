import React from 'react';

// Định nghĩa props để nhận nội dung (các trang Home, Search...) truyền vào giữa
interface MainContentProps {
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main style={styles.mainContent}>
      {children}
    </main>
  );
};

const styles = {
  mainContent: {
    flex: 1, // Lệnh quan trọng nhất: Ép khối này chiếm hết không gian trống giữa 2 thanh bar
    backgroundColor: '#06100fea', // Màu xám đen chuẩn vùng nội dung Spotify
    borderRadius: 8, // Bo tròn các góc
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    margin: '0 10px', 
    overflowY: 'auto' as const, // Cho phép cuộn dọc nếu nội dung bên trong (danh sách bài hát) quá dài
    display: 'flex' as const,
    flexDirection: 'column' as const,
    position: 'relative' as const,
    
  },
};

export default MainContent;