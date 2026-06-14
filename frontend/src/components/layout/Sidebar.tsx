import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Folder, ListFilter, Library, Plus, Search, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

type LibraryItemType = 'liked' | 'playlist' | 'podcast' | 'artist' | 'folder';
type ActiveFilter = 'all' | 'playlist' | 'podcast' | 'artist';
type SortMode = 'recent' | 'az';

interface LibraryItem {
  id: number;
  type: LibraryItemType;
  src: string;
  title: string;
  subtitle: string;
  isCircle: boolean;
  isPinned: boolean;
}

const initialLibraryItems: LibraryItem[] = [
  {
    id: 1,
    type: 'liked',
    src: 'https://via.placeholder.com/48/6366f1/ffffff?text=♥',
    title: 'Bài hát đã thích',
    subtitle: 'Danh sách phát • 4 bài hát',
    isCircle: false,
    isPinned: true,
  },
  {
    id: 2,
    type: 'playlist',
    src: 'https://via.placeholder.com/48/1DB954/ffffff?text=P',
    title: 'Danh sách phát của tôi #7',
    subtitle: 'Danh sách phát • Đỗ Trọng Tín',
    isCircle: false,
    isPinned: false,
  },
  {
    id: 3,
    type: 'podcast',
    src: 'https://via.placeholder.com/48/5555bb/ffffff?text=IELTS',
    title: 'IELTS Speaking for Success',
    subtitle: 'Podcast • Podcourses',
    isCircle: false,
    isPinned: false,
  },
  {
    id: 4,
    type: 'artist',
    src: 'https://via.placeholder.com/48/333333/ffffff?text=VPT',
    title: 'Vũ Phụng Tiên',
    subtitle: 'Nghệ sĩ',
    isCircle: true,
    isPinned: false,
  },
  {
    id: 5,
    type: 'artist',
    src: 'https://via.placeholder.com/48/555555/ffffff?text=G',
    title: 'GRAHAM',
    subtitle: 'Nghệ sĩ',
    isCircle: true,
    isPinned: false,
  },
  {
    id: 6,
    type: 'playlist',
    src: 'https://via.placeholder.com/48/ff6b6b/ffffff?text=P',
    title: 'Danh sách phát của tôi #6',
    subtitle: 'Danh sách phát • Đỗ Trọng Tín',
    isCircle: false,
    isPinned: false,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setRightPanelData } = useAppContext();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [isListHovered, setIsListHovered] = useState(false);

  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(initialLibraryItems);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<'playlist' | 'folder'>('playlist');
  const [newName, setNewName] = useState('');

  const handleFilterClick = (filter: ActiveFilter) => {
    setActiveFilter((current) => (current === filter ? 'all' : filter));
  };

  const handleCreateItem = () => {
    const name = newName.trim();

    if (!name) {
      return;
    }

    const newItem: LibraryItem = {
      id: Date.now(),
      type: createType,
      src:
        createType === 'folder'
          ? 'https://via.placeholder.com/48/2a2a2a/ffffff?text=F'
          : 'https://via.placeholder.com/48/1DB954/ffffff?text=P',
      title: name,
      subtitle: createType === 'folder' ? 'Thư mục playlist' : 'Danh sách phát • Bạn',
      isCircle: false,
      isPinned: false,
    };

    setLibraryItems((current) => [newItem, ...current]);
    setSelectedId(newItem.id);
    setNewName('');
    setIsCreateModalOpen(false);
    setIsCreateMenuOpen(false);
  };

  const handleItemClick = (item: LibraryItem) => {
    setSelectedId(item.id);

    if (item.type === 'liked' || item.type === 'playlist') {
      navigate(`/playlist/${item.id}`);
      return;
    }

    if (item.type === 'artist') {
      setRightPanelData({
        title: item.title,
        artist: 'Nghệ sĩ',
        cover: item.src,
        type: 'artist',
      });
      return;
    }

    if (item.type === 'podcast') {
      alert(`Mở podcast: ${item.title}. Tính năng podcast detail sẽ làm sau.`);
      return;
    }

    if (item.type === 'folder') {
      alert(`Mở folder: ${item.title}. Folder sẽ chứa các playlist sau này.`);
    }
  };

  const filteredItems = libraryItems
    .filter((item) => {
      const matchesFilter =
        activeFilter === 'all' ||
        item.type === activeFilter ||
        (activeFilter === 'playlist' && item.type === 'liked');

      const keyword = searchKeyword.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.subtitle.toLowerCase().includes(keyword);

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortMode === 'az') {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: isExpanded ? 340 : 72,
      }}
    >
      <div style={styles.headerContainer}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={styles.libraryToggleBtn}
          title={isExpanded ? 'Thu gọn Thư viện' : 'Mở rộng Thư viện'}
        >
          <Library size={24} strokeWidth={2.2} />
          {isExpanded && <span style={styles.libraryText}>Thư viện</span>}
        </button>

        {isExpanded && (
          <div style={styles.headerActions}>
            <div style={styles.createWrapper}>
              <button
                style={styles.iconBtn}
                title="Tạo playlist, folder hoặc Jam"
                onClick={() => setIsCreateMenuOpen((current) => !current)}
              >
                <Plus size={20} />
              </button>

              {isCreateMenuOpen && (
                <div style={styles.createMenu}>
                  <button
                    style={styles.createMenuItem}
                    onClick={() => {
                      setCreateType('playlist');
                      setIsCreateModalOpen(true);
                      setIsCreateMenuOpen(false);
                    }}
                  >
                    Tạo playlist
                  </button>

                  <button
                    style={styles.createMenuItem}
                    onClick={() => {
                      setCreateType('folder');
                      setIsCreateModalOpen(true);
                      setIsCreateMenuOpen(false);
                    }}
                  >
                    Tạo folder
                  </button>

                  <button
                    style={styles.createMenuItem}
                    onClick={() => {
                      alert('Jam là phòng nghe chung real-time. Tính năng này nên làm sau khi có SignalR.');
                      setIsCreateMenuOpen(false);
                    }}
                  >
                    Tạo Jam
                  </button>
                </div>
              )}
            </div>

            <button
              style={styles.iconBtn}
              title="Đi tới trang Thư viện"
              onClick={() => navigate('/library')}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div style={styles.expandedContent}>
          <div style={styles.filterContainer}>
            {[
              { label: 'Playlist', value: 'playlist' },
              { label: 'Podcast', value: 'podcast' },
              { label: 'Nghệ sĩ', value: 'artist' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterClick(filter.value as ActiveFilter)}
                style={{
                  ...styles.filterPill,
                  backgroundColor: activeFilter === filter.value ? '#ffffff' : '#2a2a2a',
                  color: activeFilter === filter.value ? '#000000' : '#ffffff',
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {showBanner && (
            <div style={styles.promoBanner}>
              <button
                style={styles.closeBannerBtn}
                onClick={() => setShowBanner(false)}
                title="Đóng"
              >
                <X size={16} />
              </button>

              <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>
                Thêm nhạc từ ứng dụng khác
              </h4>

              <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#e5e5e5' }}>
                Mang theo danh sách phát, bài hát và nghệ sĩ bạn yêu thích.
              </p>

              <button
                style={styles.promoActionBtn}
                onClick={() => alert('Sau này nút này sẽ mở chức năng import media.')}
              >
                Thêm thư viện
              </button>
            </div>
          )}

          <div style={styles.searchSortBar}>
            {isSearchOpen ? (
              <div style={styles.searchBox}>
                <Search size={17} color="#b3b3b3" />

                <input
                  autoFocus
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Tìm trong thư viện"
                  style={styles.searchInput}
                />

                {searchKeyword && (
                  <button
                    style={styles.clearSearchBtn}
                    onClick={() => setSearchKeyword('')}
                    title="Xóa tìm kiếm"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ) : (
              <button
                style={styles.iconBtn}
                title="Tìm kiếm trong thư viện"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={18} />
              </button>
            )}

            <button
              style={styles.sortBtn}
              onClick={() => setSortMode((current) => (current === 'recent' ? 'az' : 'recent'))}
              title="Đổi cách sắp xếp"
            >
              {sortMode === 'recent' ? 'Gần đây' : 'A-Z'} <ListFilter size={16} />
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          ...styles.scrollableList,
          overflowY: isListHovered ? 'auto' : 'hidden',
        }}
        onMouseEnter={() => setIsListHovered(true)}
        onMouseLeave={() => setIsListHovered(false)}
      >
        {filteredItems.length === 0 && isExpanded && (
          <div style={styles.emptyState}>Không tìm thấy nội dung phù hợp.</div>
        )}

        {filteredItems.map((item) => {
          const isSelected = selectedId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                ...styles.itemWrapper,
                backgroundColor: isSelected
                  ? '#2a2a2a'
                  : isHovered
                    ? '#1f1f1f'
                    : 'transparent',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                padding: isExpanded ? '8px' : '8px 0',
                width: isExpanded ? '100%' : 48,
              }}
            >
              {item.type === 'folder' ? (
                <div style={styles.folderIcon}>
                  <Folder size={24} />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    ...styles.thumbnail,
                    borderRadius: item.isCircle ? '50%' : '4px',
                  }}
                />
              )}

              {isExpanded && (
                <div style={styles.itemInfo}>
                  <span
                    style={{
                      ...styles.itemTitle,
                      color: isSelected ? '#1db954' : '#ffffff',
                    }}
                  >
                    {item.title}
                  </span>

                  <div style={styles.subtitleRow}>
                    {item.isPinned && <span style={styles.pinIcon}>•</span>}
                    <span style={styles.itemSubtitle}>{item.subtitle}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isCreateModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>
              {createType === 'playlist' ? 'Tạo playlist mới' : 'Tạo folder mới'}
            </h3>

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={createType === 'playlist' ? 'Nhập tên playlist' : 'Nhập tên folder'}
              style={styles.modalInput}
              autoFocus
            />

            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewName('');
                }}
              >
                Hủy
              </button>

              <button style={styles.createBtn} onClick={handleCreateItem}>
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#121212',
    borderRadius: 8,
    height: '100%',
    minHeight: 0,
    flexShrink: 0,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    position: 'relative' as const,
  },

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

  libraryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  headerActions: {
    display: 'flex',
    gap: 8,
    position: 'relative' as const,
  },

  iconBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: 18,
    cursor: 'pointer',
    padding: 4,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  createWrapper: {
    position: 'relative' as const,
  },

  createMenu: {
    position: 'absolute' as const,
    top: 30,
    right: 0,
    backgroundColor: '#282828',
    border: '1px solid #3a3a3a',
    borderRadius: 8,
    padding: 6,
    minWidth: 150,
    zIndex: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
  },

  createMenuItem: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    textAlign: 'left' as const,
    padding: '9px 10px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 13,
  },

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
    gap: 8,
  },

  searchBox: {
    flex: 1,
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: '#242424',
    borderRadius: 6,
    padding: '6px 8px',
  },

  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: 13,
    minWidth: 0,
  },

  clearSearchBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    cursor: 'pointer',
    display: 'flex' as const,
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

  scrollableList: {
    flex: 1,
    overflowY: 'hidden' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    padding: '0 8px',
  },

  emptyState: {
    color: '#b3b3b3',
    fontSize: 13,
    textAlign: 'center' as const,
    padding: '20px 8px',
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    borderRadius: 6,
    boxSizing: 'border-box' as const,
    transition: 'background-color 0.2s ease',
  },

  thumbnail: {
    width: 48,
    height: 48,
    objectFit: 'cover' as const,
    flexShrink: 0,
  },

  folderIcon: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
    color: '#b3b3b3',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },

  itemInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
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
    color: '#1db954',
  },

  itemSubtitle: {
    color: '#b3b3b3',
    fontSize: 13,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  modalOverlay: {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 30,
  },

  modal: {
    width: 260,
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 16,
    border: '1px solid #3a3a3a',
  },

  modalTitle: {
    color: '#ffffff',
    fontSize: 17,
    margin: '0 0 14px 0',
  },

  modalInput: {
    width: '100%',
    boxSizing: 'border-box' as const,
    backgroundColor: '#121212',
    border: '1px solid #3a3a3a',
    color: '#ffffff',
    borderRadius: 6,
    padding: '10px 12px',
    outline: 'none',
    marginBottom: 14,
  },

  modalActions: {
    display: 'flex' as const,
    justifyContent: 'flex-end' as const,
    gap: 8,
  },

  cancelBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    cursor: 'pointer',
    padding: '8px 12px',
  },

  createBtn: {
    backgroundColor: '#1db954',
    color: '#000000',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer',
    fontWeight: 700,
    padding: '8px 16px',
  },
};

export default Sidebar;