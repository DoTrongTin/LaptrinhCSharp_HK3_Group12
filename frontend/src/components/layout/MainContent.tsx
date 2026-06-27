import React, { useState, useEffect } from 'react';
import FilterPill from '../ui/maincontent/FilterPill';
import SectionHeader from '../ui/maincontent/SectionHeader';
import MediaCard from '../ui/maincontent/MediaCard';
import { mediaService } from '../../services/mediaService';
import { useAppContext } from '../../context/AppContext';
import { usePlayerStore } from '../../store/playerStore';
import type { MediaItem } from '../../types/media';

const MainContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setRightPanelData } = useAppContext();
  const play = usePlayerStore((s) => s.play);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await mediaService.getTrendingMedia();
        setMediaItems(data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch media:', err);
        setError('Không thể tải danh sách nhạc. Vui lòng kiểm tra kết nối đến server.');
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // 1. THÊM HÀM NÀY ĐỂ XỬ LÝ URL ẢNH
  const getImageUrl = (path?: string | null) => {
    if (!path) return 'https://via.placeholder.com/150/1a1a1a/ffffff?text=Music';
    if (path.startsWith('http')) return path; 
    return `http://localhost:5078${path}`;   
  };


const handleMediaClick = (item: MediaItem) => {
    setRightPanelData({
      id: (item as any).id || (item as any).mediaItemId,
      title: item.title,
      // Tự động nhận diện chuẩn mới hoặc cũ
      artist: item.artistName || item.ownerName || 'Unknown Artist',
      cover: getImageUrl(item.thumbnailPath),
      type: 'song',
    });
    play(item);
  };

const formatDuration = (seconds?: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Filter items based on active filter
  const filteredItems = mediaItems.filter((item) => {
    if (activeFilter === 'Tất cả') return true;
    if (activeFilter === 'Nhạc') return item.mediaType === undefined || item.mediaType === 0;
    if (activeFilter === 'Podcasts') return item.mediaType === 1;
    return true;
  });

  // Split into two groups for display
  const firstHalf = filteredItems.slice(0, 10);
  const secondHalf = filteredItems.slice(10, 20);

  if (loading) {
    return (
      <main style={{ ...styles.mainContent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#b3b3b3', fontSize: 18 }}>Đang tải dữ liệu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ ...styles.mainContent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#f44336', fontSize: 16, textAlign: 'center', maxWidth: 400 }}>{error}</p>
      </main>
    );
  }

  return (
    <main style={styles.mainContent}>
      <div style={styles.innerContainer}>

        {/* Thanh Filters */}
        <div style={styles.filtersRow}>
          {['Tất cả', 'Nhạc', 'Podcasts'].map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {/* Section 1: Mới nhất */}
        {firstHalf.length > 0 && (
          <section style={styles.section}>
            <SectionHeader title="Mới nhất" />
          <div style={styles.gridContainer}>
            {mediaItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                // Hiển thị nghệ sĩ thực tế từ DB
                subtitle={item.artistName || 'Nghệ sĩ ẩn danh'} 
                imageUrl={getImageUrl(item.thumbnailPath)}
                onClick={() => handleMediaClick(item)}
              />
            ))}
          </div>
          </section>
        )}

        {/* Section 2: Gợi ý thêm */}
        {secondHalf.length > 0 && (
          <section style={styles.section}>
            <SectionHeader title="Gợi ý cho bạn" subtitle="Từ cộng đồng" />
            <div style={styles.gridContainer}>
              {secondHalf.map((item) => (
                <MediaCard
                  key={item.id}
                  title={item.title}
                  subtitle={`${item.artistName || 'Nghệ sĩ ẩn danh'}${item.duration ? ` • ${formatDuration(item.duration)}` : ''}`}
                  imageUrl={getImageUrl(item.thumbnailPath)}
                  onClick={() => handleMediaClick(item)}
                />
              ))}
            </div>
          </section>
        )}

        {filteredItems.length === 0 && !loading && !error && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#b3b3b3', fontSize: 16 }}>Không có nội dung phù hợp với bộ lọc.</p>
          </div>
        )}
      </div>
    </main>
  );
};

const styles = {
  mainContent: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 8,
    height: '100%',
    overflowY: 'auto' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    position: 'relative' as const,
  },
  innerContainer: {
    padding: '24px 24px 40px 24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 40,
  },
  filtersRow: {
    display: 'flex',
    gap: 8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 24,
  },
};

export default MainContent;