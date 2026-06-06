import React, { useState,useRef } from 'react';
// Import toàn bộ icon cần thiết từ thư viện
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Search, 
  Disc3, 
  Bell, 
  Settings, 
  Minus, 
  Square, 
  X 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const menuItems = ['Tệp', 'Sửa', 'Xem', 'Phát lại', 'Trợ giúp'];

  return (
    <header style={styles.navbar}>
      <div style={styles.leftContent}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuButton}
          title="Menu"
        >
          <MoreHorizontal size={24} />
        </button>
        
        <div style={styles.arrowsContainer}>
          <button style={styles.arrowButton} title="Back">
            <ChevronLeft size={28} />
          </button>
          <button style={styles.arrowButton} title="Forward">
            <ChevronRight size={28} />
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
        <button
          style={{
            ...styles.iconButton,
            ...styles.homeButton,
            ...(isHomeHovered ? styles.homeButtonHover : {}),
          }}
          title="Home"
          onMouseEnter={() => setIsHomeHovered(true)}
          onMouseLeave={() => setIsHomeHovered(false)}
        >
          <Home size={24} strokeWidth={2.5} />
        </button>

<div style={styles.searchContainer}>
          {/* Bấm vào icon kính lúp cũng tự động focus vào input */}
          <span 
            style={{...styles.searchIcon, cursor: 'text'}} 
            onClick={() => searchInputRef.current?.focus()}
          >
            <Search size={22} strokeWidth={2.4} />
          </span>

          {/* Gắn ref vào thẻ input */}
          <input 
            ref={searchInputRef}
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={styles.searchInput}
          />
          
          <span style={styles.searchDivider} />
          
          {/* Bấm vào nút Duyệt tìm bên phải cũng focus vào input */}
          <button 
            style={styles.searchActionButton} 
            title="Duyệt tìm"
            onClick={() => searchInputRef.current?.focus()}
          >
            <Disc3 size={22} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div style={styles.rightContent}>
        <button style={styles.iconButton} title="Notifications">
          <Bell size={20} />
        </button>
        <button style={styles.iconButton} title="Settings">
          <Settings size={20} />
        </button>
        <button style={styles.profileButton}>
          T
        </button>
        <button style={styles.controlButton} title="Minimize">
          <Minus size={18} />
        </button>
        <button style={styles.controlButton} title="Maximize">
          <Square size={14} />
        </button>
        <button style={styles.controlButton} title="Close">
          <X size={18} />
        </button>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    height: 56,
    backgroundColor: '#000000',
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
    gap: 24,
    position: 'relative' as const,
  },
  arrowsContainer: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 16,
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
    gap: 16, // Tăng nhẹ khoảng cách các nút bên phải cho thoáng
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    opacity: 0.7,
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    backgroundColor: '#2a2a2a',
    border: '1px solid transparent',
    borderRadius: 999,
    paddingLeft: 16,
    paddingRight: 10,
    height: 48,
    width: 520,
    maxWidth: '48vw',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
  },
  searchIcon: {
    marginRight: 12,
    color: '#b3b3b3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#f5f5f5',
    fontSize: 15,
    fontWeight: 500,
    outline: 'none',
    padding: 0,
  },
  searchDivider: {
    width: 1,
    height: 24,
    marginLeft: 14,
    marginRight: 10,
    backgroundColor: '#5a5a5a',
  },
  searchActionButton: {
    width: 34,
    height: 34,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: '#b3b3b3',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer' as const,
    padding: 0,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8, // Giảm độ sáng một chút để khi hover sáng lên sẽ đẹp hơn
  },
  homeButton: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    transition: 'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, transform 0.2s ease',
  },
  homeButtonHover: {
    backgroundColor: '#333333',
    color: '#ffffff',
    opacity: 1,
    transform: 'scale(1.06)',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3', // Đổi màu các nút control (X, -, phóng to) thành xám
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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