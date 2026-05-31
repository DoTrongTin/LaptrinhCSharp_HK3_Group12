import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  // Quản lý trạng thái đóng/mở của Sidebar (Mặc định cho mở để bạn dễ xem thiết kế)
  const [isExpanded, setIsExpanded] = useState(true);
  const [showBanner, setShowBanner] = useState(true); // Quản lý việc tắt banner quảng cáo

  // Dữ liệu giả lập đã được bổ sung thêm Title và Subtitle
  const libraryItems = [
    { id: 1, type: 'liked', src: 'https://via.placeholder.com/48/6366f1/ffffff?text=♥', title: 'Bài hát đã thích', subtitle: 'Danh sách phát • Đỗ Trọng Tín', isCircle: false, isPinned: true },
    { id: 2, type: 'playlist', src: 'https://via.placeholder.com/48/1DB954/ffffff?text=P', title: 'Danh sách phát của tôi #7', subtitle: 'Danh sách phát • Đỗ Trọng Tín', isCircle: false, isPinned: false },
    { id: 3, type: 'podcast', src: 'https://via.placeholder.com/48/5555bb/ffffff?text=IELTS', title: 'IELTS Speaking for Success', subtitle: 'Podcast • Podcourses', isCircle: false, isPinned: false },
    { id: 4, type: 'artist', src: 'https://via.placeholder.com/48/333333/ffffff?text=VPT', title: 'Vũ Phụng Tiên', subtitle: 'Nghệ sĩ', isCircle: true, isPinned: false },
    { id: 5, type: 'artist', src: 'https://via.placeholder.com/48/555555/ffffff?text=G', title: 'GRAHAM', subtitle: 'Nghệ sĩ', isCircle: true, isPinned: false },
    { id: 6, type: 'playlist', src: 'https://via.placeholder.com/48/ff6b6b/ffffff?text=P', title: 'Danh sách phát của tôi #6', subtitle: 'Danh sách phát • Đỗ Trọng Tín', isCircle: false, isPinned: false },
  ];

  return (
    <aside style={{
      ...styles.sidebar,
      width: isExpanded ? 340 : 72, // Thay đổi chiều rộng linh hoạt
    }}>
      
      {/* 1. KHU VỰC HEADER (Luôn hiển thị) */}
      <div style={styles.headerContainer}>
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          style={styles.libraryToggleBtn}
          title={isExpanded ? "Thu gọn Thư viện" : "Mở rộng Thư viện"}
        >
          <span style={styles.libraryIcon}>|||</span>
          {isExpanded && <span style={styles.libraryText}>Thư viện</span>}
        </button>
        
        {isExpanded && (
          <div style={styles.headerActions}>
            <button style={styles.iconBtn}>+</button>
            <button style={styles.iconBtn}>→</button>
          </div>
        )}
      </div>

      {/* 2. KHU VỰC CHI TIẾT (Chỉ hiện khi mở rộng) */}
      {isExpanded && (
        <div style={styles.expandedContent}>
          
          {/* Bộ lọc (Pills) */}
          <div style={styles.filterContainer}>
            {['Playlist', 'Podcast', 'Nghệ sĩ'].map(filter => (
              <button key={filter} style={styles.filterPill}>{filter}</button>
            ))}
          </div>

          {/* Banner quảng cáo chuyển nhạc */}
          {showBanner && (
            <div style={styles.promoBanner}>
              <button style={styles.closeBannerBtn} onClick={() => setShowBanner(false)}>✕</button>
              <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Thêm nhạc từ ứng dụng khác</h4>
              <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#e5e5e5' }}>Mang theo danh sách phát, bài hát và nghệ sĩ bạn yêu thích.</p>
              <button style={styles.promoActionBtn}>Thêm thư viện</button>
            </div>
          )}

          {/* Thanh Tìm kiếm & Sắp xếp */}
          <div style={styles.searchSortBar}>
            <button style={styles.iconBtn}>🔍</button>
            <button style={styles.sortBtn}>Gần đây ≡</button>
          </div>
        </div>
      )}

      {/* 3. KHU VỰC DANH SÁCH CUỘN */}
      <div style={styles.scrollableList}>
        {libraryItems.map((item) => (
          <div key={item.id} style={{
            ...styles.itemWrapper,
            justifyContent: isExpanded ? 'flex-start' : 'center',
            padding: isExpanded ? '8px' : '8px 0',
            width: isExpanded ? '100%' : 48,
          }}>
            {/* Ảnh đại diện */}
            <img
              src={item.src}
              alt={item.title}
              style={{
                ...styles.thumbnail,
                borderRadius: item.isCircle ? '50%' : '4px',
              }}
            />
            
            {/* Thông tin Text (Chỉ hiện khi mở rộng) */}
            {isExpanded && (
              <div style={styles.itemInfo}>
                <span style={styles.itemTitle}>{item.title}</span>
                <div style={styles.subtitleRow}>
                  {item.isPinned && <span style={styles.pinIcon}>📌</span>}
                  <span style={styles.itemSubtitle}>{item.subtitle}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#121212',
    borderRadius: 8,
    height: '100%',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    transition: 'width 0.3s ease', // Hiệu ứng trượt mượt mà khi đổi kích thước
    overflow: 'hidden',
  },
  // --- Header ---
  headerContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '16px 20px',
  },
  libraryToggleBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 0,
    color: '#b3b3b3',
  },
  libraryIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  libraryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerActions: {
    display: 'flex',
    gap: 8,
  },
  iconBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: 18,
    cursor: 'pointer',
    padding: 4,
  },
  // --- Expanded Content ---
  expandedContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0 16px',
  },
  filterContainer: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: 16,
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  promoBanner: {
    background: 'linear-gradient(135deg, #4b207f 0%, #1c3674 100%)',
    borderRadius: 8,
    padding: '16px',
    color: 'white',
    position: 'relative' as const,
    marginBottom: 16,
  },
  closeBannerBtn: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    background: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    cursor: 'pointer',
  },
  promoActionBtn: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: 20,
    padding: '8px 16px',
    fontWeight: 'bold',
    fontSize: 13,
    cursor: 'pointer',
  },
  searchSortBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sortBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  // --- List Items ---
  scrollableList: {
    flex: 1,
    overflowY: 'auto' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    padding: '0 8px',
  },
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    borderRadius: 6,
    boxSizing: 'border-box' as const,
  },
  thumbnail: {
    width: 48,
    height: 48,
    objectFit: 'cover' as const,
    flexShrink: 0,
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden', // Giúp text dài bị cắt bớt
  },
  itemTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 2,
  },
  subtitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  pinIcon: {
    fontSize: 12,
    color: '#1db954', // Màu xanh lá đặc trưng Spotify
  },
  itemSubtitle: {
    color: '#b3b3b3',
    fontSize: 13,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default Sidebar;