import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePlayerStore } from '../store/playerStore';
import { mediaService } from '../services/mediaService';
import type { MediaItem } from '../types/media';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { setRightPanelData } = useAppContext();
  const play = usePlayerStore((s) => s.play);

  // State quản lý kết quả từ LocalDB và trạng thái chờ
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Gọi API tìm kiếm nội bộ từ Backend của bạn
        const data = await mediaService.searchMedia(keyword);
        setResults(data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm bài hát nội bộ:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Áp dụng Debounce (trì hoãn 500ms) để không gửi request liên tục khi đang gõ nhanh
    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const handleItemClick = (item: MediaItem) => {
    // 1. Cập nhật Panel bên phải
    setRightPanelData({
      id: (item as any).id || (item as any).mediaItemId,
      title: item.title,
      artist: item.ownerName || 'Unknown User',
      cover: item.thumbnailPath || 'https://via.placeholder.com/150',
      type: 'song',
    });
    
    // 2. Chuyển bài hát vào Trình phát nhạc toàn cục
    play(item);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Tìm kiếm</h1>

      {keyword ? (
        <p style={styles.subtitle}>Kết quả cho: <span style={styles.keyword}>{keyword}</span></p>
      ) : (
        <p style={styles.subtitle}>Nhập từ khóa trên thanh tìm kiếm để tìm các bài hát đã tải lên hệ thống.</p>
      )}

      {loading ? (
        <div style={styles.emptyBox}>Đang tìm kiếm trong cơ sở dữ liệu...</div>
      ) : results.length === 0 && keyword ? (
        <div style={styles.emptyBox}>Không tìm thấy bài hát nào phù hợp. Bạn hãy thử tải lên một bài hát mới nhé!</div>
      ) : (
        <div style={styles.resultList}>
          {results.map((item) => (
            <div key={item.id} style={styles.resultItem} onClick={() => handleItemClick(item)}>
              <img 
                src={`http://localhost:5078${item.thumbnailPath}`}
                alt={item.title} 
                style={styles.cover} 
              />
              <div style={styles.info}>
                <div style={styles.itemTitle}>{item.title}</div>
                <div style={styles.itemSubtitle}>
                  Bài hát • {item.ownerName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: 24, color: '#ffffff', minHeight: '100%', backgroundColor: '#121212' },
  title: { fontSize: 32, fontWeight: 800, margin: '0 0 8px 0' },
  subtitle: { color: '#b3b3b3', fontSize: 14, marginBottom: 24 },
  keyword: { color: '#ffffff', fontWeight: 700 },
  emptyBox: { color: '#b3b3b3', backgroundColor: '#181818', padding: 20, borderRadius: 8 },
  resultList: { display: 'flex' as const, flexDirection: 'column' as const, gap: 8 },
  resultItem: { display: 'flex' as const, alignItems: 'center' as const, gap: 16, padding: '12px 14px', backgroundColor: '#181818', borderRadius: 8, cursor: 'pointer', transition: 'background-color 0.2s' },
  cover: { width: 56, height: 56, borderRadius: 6, objectFit: 'cover' as const, flexShrink: 0 },
  info: { display: 'flex' as const, flexDirection: 'column' as const, gap: 4 },
  itemTitle: { fontSize: 16, fontWeight: 700, color: '#ffffff' },
  itemSubtitle: { fontSize: 13, color: '#b3b3b3' },
};

export default Search;