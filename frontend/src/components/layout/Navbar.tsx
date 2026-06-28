import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import { useNotifications } from '../../hooks/useNotifications';
import { searchService, type SearchMediaItem } from '../../services/searchService';
import { useAppContext } from '../../context/AppContext';

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
  X,
} from 'lucide-react';

type PopupType = 'menu' | 'notifications' | 'settings' | 'profile' | null;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuthStore();
  const { unread, notifications, markAsRead, clearUnread } = useNotifications();

  const { setRightPanelData } = useAppContext();

  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchMediaItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const menuItems = ['Tệp', 'Sửa', 'Xem', 'Phát lại', 'Trợ giúp'];

  const handleTogglePopup = (popup: PopupType) => {
    setActivePopup((current) => (current === popup ? null : popup));
  };

  useEffect(() => {
    const keyword = searchKeyword.trim();

    if (!keyword) {
      setSearchResults([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setIsSearching(true);
        const results = await searchService.searchMedia(keyword);
        setSearchResults(results);
      } catch (error) {
        console.error('Search media failed:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchKeyword]);

  const handleSelectSearchResult = (item: SearchMediaItem) => {
    const cover = item.thumbnailPath
      ? item.thumbnailPath.startsWith('http')
        ? item.thumbnailPath
        : `http://localhost:5078${item.thumbnailPath}`
      : 'https://via.placeholder.com/300/121212/ffffff?text=No+Cover';

    setRightPanelData({
      id: item.id,
      title: item.title,
      artist: item.artistName || item.ownerName || 'Ẩn danh',
      cover,
      type: 'song',
    });

    setSearchKeyword('');
    setSearchResults([]);
    setActivePopup(null);
  };

  const handleLogout = () => {
    logout();
    setActivePopup(null);
    navigate('/login');
  };

  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  const handleHome = () => {
    navigate('/');
    setActivePopup(null);
  };

  const handleSearchSubmit = () => {
    const keyword = searchKeyword.trim();

    if (!keyword) {
      searchInputRef.current?.focus();
      return;
    }

    if (searchResults.length > 0) {
      handleSelectSearchResult(searchResults[0]);
      return;
    }

    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setActivePopup(null);
  };

  const handleBrowse = () => {
    navigate('/search');
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleMinimize = () => alert('Trình duyệt không cho web tự thu nhỏ cửa sổ. Nút này hiện đang để mô phỏng UI.');

  const handleMaximize = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      alert('Không thể bật/tắt fullscreen trên trình duyệt này.');
    }
  };

  const handleClose = () => alert('Web app không thể tự đóng tab nếu tab không được mở bằng script. Đây là nút mô phỏng giao diện.');

  const getNotificationText = (notification: any) => {
    let payload: any = {};

    try {
      payload = JSON.parse(notification.payload || '{}');
    } catch {
      payload = {};
    }

    if (notification.type === 'share') {
      const senderName = payload.senderName || 'Một người dùng';
      const targetTitle = payload.targetTitle || 'một bài hát';
      const message = payload.message ? ` - "${payload.message}"` : '';

      return `${senderName} đã chia sẻ ${targetTitle} với bạn${message}`;
    }

    return 'Bạn có thông báo mới.';
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.leftContent}>
        <button onClick={() => handleTogglePopup('menu')} style={styles.menuButton} title="Menu">
          <MoreHorizontal size={24} />
        </button>

        <div style={styles.arrowsContainer}>
          <button style={styles.arrowButton} title="Back" onClick={handleBack}>
            <ChevronLeft size={28} />
          </button>
          <button style={styles.arrowButton} title="Forward" onClick={handleForward}>
            <ChevronRight size={28} />
          </button>
        </div>

        {activePopup === 'menu' && (
          <div style={styles.dropdownMenu}>
            {menuItems.map((item) => (
              <div
                key={item}
                style={styles.menuItem}
                onClick={() => {
                  alert(`Bạn vừa chọn: ${item}`);
                  setActivePopup(null);
                }}
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
          onClick={handleHome}
          onMouseEnter={() => setIsHomeHovered(true)}
          onMouseLeave={() => setIsHomeHovered(false)}
        >
          <Home size={24} strokeWidth={2.5} />
        </button>

        <div style={styles.searchContainer}>
          <span style={{ ...styles.searchIcon, cursor: 'text' }} onClick={() => searchInputRef.current?.focus()}>
            <Search size={22} strokeWidth={2.4} />
          </span>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
            style={styles.searchInput}
          />

          <span style={styles.searchDivider} />

          <button style={styles.searchActionButton} title="Duyệt tìm" onClick={handleBrowse}>
            <Disc3 size={22} strokeWidth={2.2} />
          </button>

          {searchKeyword.trim() && (
            <div style={styles.searchDropdown}>
              {isSearching ? (
                <div style={styles.searchEmpty}>Đang tìm...</div>
              ) : searchResults.length === 0 ? (
                <div style={styles.searchEmpty}>Không tìm thấy bài hát.</div>
              ) : (
                searchResults.map((item) => (
                  <button
                    key={item.id}
                    style={styles.searchResultItem}
                    onClick={() => handleSelectSearchResult(item)}
                  >
                    <div style={styles.searchResultTitle}>{item.title}</div>
                    <div style={styles.searchResultArtist}>
                      {item.artistName || item.ownerName || 'Ẩn danh'}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div style={styles.rightContent}>
        {isAuthenticated ? (
          <>
            <div style={styles.popupWrapper}>
              <button
                style={{ ...styles.iconButton, position: 'relative' }}
                title="Notifications"
                onClick={() => {
                  handleTogglePopup('notifications');
                  clearUnread();
                }}
              >
                <Bell size={20} />

                {unread > 0 && <span style={styles.notificationBadge}>{unread}</span>}
              </button>

              {activePopup === 'notifications' && (
                <div style={styles.rightPopup}>
                  <h4 style={styles.popupTitle}>Thông báo</h4>

                  {notifications.length === 0 ? (
                    <p style={styles.popupText}>Chưa có thông báo mới.</p>
                  ) : (
                    <div style={styles.notificationList}>
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          style={{
                            ...styles.notificationItem,
                            ...(notification.isRead ? {} : styles.notificationItemUnread),
                          }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div style={styles.notificationText}>
                            {getNotificationText(notification)}
                          </div>

                          <div style={styles.notificationTime}>
                            {new Date(notification.createdAt).toLocaleString('vi-VN')}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={styles.popupWrapper}>
              <button style={styles.iconButton} title="Settings" onClick={() => handleTogglePopup('settings')}>
                <Settings size={20} />
              </button>

              {activePopup === 'settings' && (
                <div style={styles.rightPopup}>
                  <h4 style={styles.popupTitle}>Cài đặt</h4>
                  <button style={styles.popupButton}>Dark mode</button>
                  <button style={styles.popupButton}>Ngôn ngữ</button>
                  <button style={styles.popupButton}>Chất lượng phát</button>
                </div>
              )}
            </div>

            <div style={styles.popupWrapper}>
              <button
                style={styles.profileButton}
                title="Profile"
                onClick={() => handleTogglePopup('profile')}
              >
                {user?.avatarPath ? (
                  <img src={user.avatarPath} alt="Avatar" style={styles.avatarImage} />
                ) : (
                  user?.userName?.charAt(0).toUpperCase() || 'U'
                )}
              </button>

              {activePopup === 'profile' && (
                <div style={styles.rightPopup}>
                  <h4 style={styles.popupTitle}>Tài khoản ({user?.userName})</h4>
                  <button
                    style={styles.popupButton}
                    onClick={() => {
                      navigate('/profile');
                      setActivePopup(null);
                    }}
                  >
                    Hồ sơ
                  </button>
                  <button style={styles.popupButton} onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={styles.authButtonsContainer}>
            <Link to="/register" style={styles.registerBtn}>Đăng ký</Link>
            <Link to="/login" style={styles.loginBtn}>Đăng nhập</Link>
          </div>
        )}

        <div style={styles.windowControls}>
          <button style={styles.controlButton} title="Minimize" onClick={handleMinimize}>
            <Minus size={18} />
          </button>
          <button style={styles.controlButton} title="Maximize" onClick={handleMaximize}>
            <Square size={14} />
          </button>
          <button style={styles.controlButton} title="Close" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>
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
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 24,
    position: 'relative' as const,
  },

  arrowsContainer: {
    display: 'flex' as const,
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
    gap: 16,
    position: 'relative' as const,
  },

  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  arrowButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    opacity: 0.7,
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  searchContainer: {
    position: 'relative' as const,
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
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
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

  searchDropdown: {
    position: 'absolute' as const,
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: '#181818',
    border: '1px solid #333',
    borderRadius: 10,
    padding: 8,
    zIndex: 9999,
    boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
  },

  searchResultItem: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    textAlign: 'left' as const,
    padding: '10px 12px',
    borderRadius: 8,
    cursor: 'pointer' as const,
  },

  searchResultTitle: {
    fontSize: 14,
    fontWeight: 800,
  },

  searchResultArtist: {
    fontSize: 12,
    color: '#b3b3b3',
    marginTop: 3,
  },

  searchEmpty: {
    color: '#b3b3b3',
    fontSize: 14,
    padding: 12,
  },

  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer' as const,
    padding: 0,
    color: '#ffffff',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    opacity: 0.8,
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
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },

  authButtonsContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '16px',
    marginRight: '8px',
  },

  registerBtn: {
    color: '#a7a7a7',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '15px',
    transition: 'color 0.2s',
  },

  loginBtn: {
    backgroundColor: '#ffffff',
    color: '#000000',
    textDecoration: 'none',
    padding: '10px 24px',
    borderRadius: '500px',
    fontWeight: 700,
    fontSize: '15px',
    transition: 'transform 0.2s',
  },

  windowControls: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '16px',
    marginLeft: '8px',
  },

  controlButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  dropdownMenu: {
    position: 'absolute' as const,
    top: 56,
    left: 0,
    backgroundColor: '#282828',
    border: '1px solid #3a3a3a',
    borderRadius: 6,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
    minWidth: 150,
    zIndex: 1000,
    overflow: 'hidden',
  },

  menuItem: {
    padding: '10px 16px',
    color: '#ffffff',
    cursor: 'pointer' as const,
    fontSize: 13,
    borderBottom: '1px solid #3a3a3a',
    transition: 'background-color 0.2s',
  },

  popupWrapper: {
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
  },

  rightPopup: {
    position: 'absolute' as const,
    top: 38,
    right: 0,
    width: 220,
    backgroundColor: '#282828',
    border: '1px solid #3a3a3a',
    borderRadius: 8,
    padding: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
    zIndex: 1000,
  },

  popupTitle: {
    color: '#ffffff',
    fontSize: 15,
    margin: '0 0 10px 0',
  },

  popupText: {
    color: '#b3b3b3',
    fontSize: 13,
    margin: 0,
  },

  popupButton: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    textAlign: 'left' as const,
    cursor: 'pointer' as const,
    padding: '8px 6px',
    borderRadius: 4,
    fontSize: 13,
  },

  notificationBadge: {
    position: 'absolute' as const,
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    padding: '0 4px',
    borderRadius: 999,
    backgroundColor: '#1db954',
    color: '#000000',
    fontSize: 10,
    fontWeight: 900,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  notificationList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 8,
    maxHeight: 280,
    overflowY: 'auto' as const,
  },

  notificationItem: {
    width: '100%',
    backgroundColor: '#1f1f1f',
    border: '1px solid #3a3a3a',
    color: '#ffffff',
    textAlign: 'left' as const,
    cursor: 'pointer' as const,
    padding: '10px',
    borderRadius: 6,
  },

  notificationItemUnread: {
    borderColor: '#1db954',
    backgroundColor: '#14301f',
  },

  notificationText: {
    fontSize: 13,
    lineHeight: 1.35,
    color: '#ffffff',
  },

  notificationTime: {
    marginTop: 6,
    fontSize: 11,
    color: '#b3b3b3',
  },
};

export default Navbar;