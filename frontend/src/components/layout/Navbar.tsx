import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const menuItems = ['Tệp', 'Sửa', 'Xem', 'Phát lại', 'Trợ giúp'];

  return (
    <header style={styles.navbar}>
      <div style={styles.leftContent}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuButton}
          title="Menu"
        >
          •••
        </button>
        
        {/* Nhóm 2 mũi tên lại để dễ kiểm soát khoảng cách nội bộ */}
        <div style={styles.arrowsContainer}>
          <button 
            style={styles.arrowButton}
            title="Back"
          >
            {'<'}
          </button>
          <button 
            style={styles.arrowButton}
            title="Forward"
          >
            {'>'}
          </button>
        </div>

        {isOpen && (
          <div style={styles.dropdownMenu}>
            {menuItems.map((item) => (
              <div 
                key={item} 
                style={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.centerContent}>
        <button style={styles.homeButton} title="Home">
          🏠
        </button>
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <button style={styles.cartButton} title="Cart">
          🛒
        </button>
      </div>

      <div style={styles.rightContent}>
        <button style={styles.iconButton} title="Notifications">
          🔔
        </button>
        <button style={styles.iconButton} title="Settings">
          ⚙️
        </button>
        <button style={styles.profileButton}>
          T
        </button>
        <button style={styles.controlButton} title="Minimize">
          −
        </button>
        <button style={styles.controlButton} title="Maximize">
          ⧉
        </button>
        <button style={styles.controlButton} title="Close">
          ✕
        </button>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    height: 56,
    backgroundColor: '#1a1a1a',
    width: '100%',
    display: 'flex' as const,
    alignItems: 'center' as const,
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative' as const,
    gap: 16,
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 24, // Khoảng cách lớn giữa nút Menu và cụm Mũi tên
    position: 'relative' as const,
  },
  arrowsContainer: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 16, // Khoảng cách đều giữa mũi tên trái và phải
  },
  centerContent: {
    flex: 1,
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 12,
    justifyContent: 'center' as const,
  },
  rightContent: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 2, // Đẩy 3 dấu chấm ra xa nhau cho giống ảnh
    cursor: 'pointer' as const,
    padding: 0,
  },
  arrowButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: 22, // Tăng kích thước mũi tên
    opacity: 0.7, // Mũi tên Spotify thường hơi mờ khi chưa hover
    cursor: 'pointer' as const,
    padding: 0,
  },
  homeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer' as const,
    padding: 0,
    color: '#ffffff',
  },
  searchContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    backgroundColor: '#333333',
    borderRadius: 24,
    paddingLeft: 12,
    paddingRight: 12,
    height: 36,
    width: 350,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 14,
    color: '#999999',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 13,
    outline: 'none',
    padding: 0,
  },
  cartButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer' as const,
    padding: 0,
    color: '#ffffff',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer' as const,
    padding: 0,
    color: '#ffffff',
  },
  profileButton: {
    backgroundColor: '#d946ef',
    border: 'none',
    borderRadius: '50%',
    width: 28,
    height: 28,
    fontSize: 14,
    cursor: 'pointer' as const,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  controlButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: 16,
    cursor: 'pointer' as const,
    padding: 0,
  },
  dropdownMenu: {
    position: 'absolute' as const,
    top: 56,
    left: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: 4,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    minWidth: 150,
    zIndex: 1000,
  },
  menuItem: {
    padding: '10px 16px',
    color: '#000000',
    cursor: 'pointer' as const,
    fontSize: 13,
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s',
  },
};

export default Navbar;