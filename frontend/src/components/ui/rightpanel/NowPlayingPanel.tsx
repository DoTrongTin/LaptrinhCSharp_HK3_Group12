import React, { useState } from 'react';

import PanelHeader from './PanelHeader';
import TrackDetails from './TrackDetails';
import ArtistAboutCard from './ArtistAboutCard';
import { mediaService } from '../../../services/mediaService';
import { usePlayerStore } from '../../../store/playerStore';
import api from '../../../services/api';

type ShareUser = {
  id: string;
  userName: string;
  email?: string;
};

interface NowPlayingPanelProps {
  onClose?: () => void;
  trackData: {
    id?: string;
    title: string;
    artist: string;
    cover: string;
    type: 'song' | 'artist';
  } | null;
}

const NowPlayingPanel: React.FC<NowPlayingPanelProps> = ({ onClose, trackData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllCredits, setShowAllCredits] = useState(false);
  const [toast, setToast] = useState('');

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<ShareUser[]>([]);
  const [selectedReceivers, setSelectedReceivers] = useState<ShareUser[]>([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const { currentTrack: currentTrackStore } = usePlayerStore();

  const activeTrack = trackData || (currentTrackStore ? {
    id: currentTrackStore.id,
    title: currentTrackStore.title,
    artist: currentTrackStore.artistName || currentTrackStore.ownerName || 'Ẩn danh',
    cover: currentTrackStore.thumbnailPath
      ? (currentTrackStore.thumbnailPath.startsWith('http') ? currentTrackStore.thumbnailPath : `http://localhost:5078${currentTrackStore.thumbnailPath}`)
      : 'https://via.placeholder.com/300/121212/ffffff?text=No+Cover',
    type: 'song' as const,
  } : null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1800);
  };

  const handleToggleLike = async () => {
    const targetId = currentTrackStore?.id;
    if (!targetId) return;

    try {
      const result = await mediaService.toggleFavorite(targetId);
      setIsLiked(result.data);
      showToast(result.message);
    } catch (error) {
      console.error('Toggle favorite failed:', error);
      showToast('Thao tác yêu thích thất bại.');
    }
  };

  const handleSearchUsers = async () => {
    try {
      setIsSearchingUsers(true);

      const response = await api.get('/users/search', {
        params: {
          keyword: userSearchKeyword,
        },
      });

      const data = response.data?.data ?? response.data ?? [];
      setSearchedUsers(data);
    } catch (error) {
      console.error('Search users failed:', error);
      showToast('Không tìm được người dùng.');
    } finally {
      setIsSearchingUsers(false);
    }
  };

  const handleToggleReceiver = (user: ShareUser) => {
    setSelectedReceivers((prev) => {
      const existed = prev.some((item) => item.id === user.id);

      if (existed) {
        return prev.filter((item) => item.id !== user.id);
      }

      return [...prev, user];
    });
  };

  const handleOpenShareModal = () => {
    setIsMenuOpen(false);
    setIsShareModalOpen(true);
  };

  const handleShare = async () => {
    if (!activeTrack) return;

    try {
      const mediaItemId = activeTrack.id;

      console.log('Sharing media:', {
        mediaItemId,
        title: activeTrack.title,
        selectedReceivers,
      });

      if (!mediaItemId) {
        showToast('Không tìm thấy ID bài hát để chia sẻ.');
        return;
      }

      if (selectedReceivers.length === 0) {
        showToast('Vui lòng chọn ít nhất một người nhận.');
        return;
      }

      setIsSharing(true);

      let successCount = 0;
      let existedCount = 0;

      for (const receiver of selectedReceivers) {
        const response = await api.post('/shares', {
          receiverId: receiver.id,
          mediaItemId,
          playlistId: null,
          message: `Nghe thử bài "${activeTrack.title}" nhé`,
        });

        const data = response.data?.data ?? response.data;

        if (data?.alreadyExisted) {
          existedCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0 && existedCount > 0) {
        showToast(`Đã chia sẻ cho ${successCount} người. ${existedCount} người đã từng nhận bài này.`);
      } else if (successCount > 0) {
        showToast(`Đã chia sẻ bài hát cho ${successCount} người.`);
      } else {
        showToast('Bài này đã từng được chia sẻ cho những người đã chọn.');
      }

      setIsShareModalOpen(false);
      setSelectedReceivers([]);
      setUserSearchKeyword('');
      setSearchedUsers([]);
    } catch (error: any) {
      console.error('Share failed:', error);
      console.error('Share response:', error.response?.data);

      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        'Chia sẻ thất bại. Kiểm tra đăng nhập hoặc backend.';

      showToast(message);
    } finally {
      setIsSharing(false);
      setIsMenuOpen(false);
    }
  };

  if (!activeTrack) {
    return (
      <aside style={styles.rightPanel}>
        <PanelHeader playlistTitle="Đang phát" onClose={onClose} />
        <div style={{ padding: 20, color: '#b3b3b3', textAlign: 'center' }}>
          Không có bài hát nào đang được chọn.
        </div>
      </aside>
    );
  }

  return (
    <aside style={styles.rightPanel}>
      <div style={styles.headerWrapper}>
        <PanelHeader
          playlistTitle={activeTrack.title}
          onClose={onClose}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      <section style={styles.scrollArea}>
        <TrackDetails
          artworkUrl={activeTrack.cover}
          title={activeTrack.title}
          artist={activeTrack.artist}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
          onShare={handleOpenShareModal}
        />

        <ArtistAboutCard
          artistName={activeTrack.artist}
          artistImageUrl={activeTrack.cover}
          monthlyListeners="Đang cập nhật..."
          isFollowing={isFollowing}
          showAllCredits={showAllCredits}
          onToggleFollow={() => setIsFollowing(!isFollowing)}
          onToggleCredits={() => setShowAllCredits(!showAllCredits)}
        />
      </section>

      {isShareModalOpen && (
        <div style={styles.shareModalOverlay}>
          <div style={styles.shareModal}>
            <h3 style={styles.shareModalTitle}>Chia sẻ bài hát</h3>

            <p style={styles.shareSongName}>{activeTrack.title}</p>

            <div style={styles.shareSearchRow}>
              <input
                style={styles.shareSearchInput}
                value={userSearchKeyword}
                onChange={(e) => setUserSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchUsers();
                  }
                }}
                placeholder="Nhập username hoặc email..."
              />

              <button
                style={styles.shareSearchButton}
                onClick={handleSearchUsers}
                disabled={isSearchingUsers}
              >
                {isSearchingUsers ? 'Đang tìm...' : 'Tìm'}
              </button>
            </div>

            <div style={styles.shareUserList}>
              {searchedUsers.length === 0 ? (
                <p style={styles.shareEmptyText}>Chưa có người dùng nào.</p>
              ) : (
                searchedUsers.map((user) => {
                  const selected = selectedReceivers.some((item) => item.id === user.id);

                  return (
                    <button
                      key={user.id}
                      style={{
                        ...styles.shareUserItem,
                        ...(selected ? styles.shareUserItemSelected : {}),
                      }}
                      onClick={() => handleToggleReceiver(user)}
                    >
                      <div>
                        <div style={styles.shareUserName}>{user.userName}</div>
                        <div style={styles.shareUserEmail}>{user.email}</div>
                      </div>

                      <span>{selected ? 'Đã chọn' : 'Chọn'}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div style={styles.shareSelectedText}>
              Đã chọn: {selectedReceivers.length} người
            </div>

            <div style={styles.shareModalActions}>
              <button
                style={styles.shareCancelButton}
                onClick={() => setIsShareModalOpen(false)}
              >
                Hủy
              </button>

              <button
                style={styles.shareSubmitButton}
                onClick={handleShare}
                disabled={isSharing}
              >
                {isSharing ? 'Đang chia sẻ...' : 'Chia sẻ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={styles.toast}>{toast}</div>}
    </aside>
  );
};

const styles = {
  rightPanel: {
    width: '100%',
    height: '100%',
    minHeight: 0,
    flexShrink: 0,
    overflow: 'hidden' as const,
    background: '#121212',
    color: '#ffffff',
    borderRadius: 8,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    fontFamily: 'var(--font-primary)',
    position: 'relative' as const,
  },
  headerWrapper: {
    position: 'relative' as const,
    flexShrink: 0,
  },
  menu: {
    position: 'absolute' as const,
    top: 52,
    right: 16,
    width: 190,
    backgroundColor: '#282828',
    border: '1px solid #3a3a3a',
    borderRadius: 8,
    padding: 6,
    zIndex: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
  },
  menuItem: {
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
  scrollArea: {
    padding: '11px 12px 16px 20px',
    overflowY: 'auto' as const,
    minHeight: 0,
  },
  toast: {
    position: 'absolute' as const,
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: '#1db954',
    color: '#000000',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 800,
    textAlign: 'center' as const,
    zIndex: 30,
  },

  shareModalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 9999,
  },
  shareModal: {
    width: 420,
    maxWidth: '90vw',
    backgroundColor: '#181818',
    border: '1px solid #333',
    borderRadius: 12,
    padding: 20,
    color: '#ffffff',
  },
  shareModalTitle: {
    margin: '0 0 8px 0',
    fontSize: 20,
    fontWeight: 800,
  },
  shareSongName: {
    margin: '0 0 16px 0',
    color: '#b3b3b3',
    fontSize: 14,
  },
  shareSearchRow: {
    display: 'flex' as const,
    gap: 8,
    marginBottom: 12,
  },
  shareSearchInput: {
    flex: 1,
    backgroundColor: '#242424',
    border: '1px solid #3a3a3a',
    borderRadius: 6,
    padding: '10px 12px',
    color: '#ffffff',
    outline: 'none',
  },
  shareSearchButton: {
    backgroundColor: '#1db954',
    border: 'none',
    borderRadius: 6,
    padding: '10px 14px',
    color: '#000000',
    fontWeight: 700,
    cursor: 'pointer' as const,
  },
  shareUserList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 8,
    maxHeight: 240,
    overflowY: 'auto' as const,
    marginBottom: 12,
  },
  shareEmptyText: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  shareUserItem: {
    width: '100%',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: '#242424',
    border: '1px solid #333',
    borderRadius: 8,
    padding: '10px 12px',
    color: '#ffffff',
    cursor: 'pointer' as const,
    textAlign: 'left' as const,
  },
  shareUserItemSelected: {
    borderColor: '#1db954',
    backgroundColor: '#14301f',
  },
  shareUserName: {
    fontSize: 14,
    fontWeight: 700,
  },
  shareUserEmail: {
    fontSize: 12,
    color: '#b3b3b3',
    marginTop: 2,
  },
  shareSelectedText: {
    color: '#b3b3b3',
    fontSize: 13,
    marginBottom: 14,
  },
  shareModalActions: {
    display: 'flex' as const,
    justifyContent: 'flex-end' as const,
    gap: 10,
  },
  shareCancelButton: {
    backgroundColor: '#333',
    border: 'none',
    borderRadius: 6,
    padding: '10px 14px',
    color: '#ffffff',
    cursor: 'pointer' as const,
  },
  shareSubmitButton: {
    backgroundColor: '#1db954',
    border: 'none',
    borderRadius: 6,
    padding: '10px 14px',
    color: '#000000',
    fontWeight: 800,
    cursor: 'pointer' as const,
  },
};

export default NowPlayingPanel;