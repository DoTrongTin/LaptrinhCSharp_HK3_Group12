/*Search.tsx
→ gọi service frontend
→ service gọi API backend
→ backend truy vấn database
→ trả kết quả về frontend
→ Search.tsx hiển thị kết quả*/
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const mockSearchData = [
  {
    id: 1,
    type: 'song',
    title: 'Chịu Cách Mình Nói Thua',
    artist: 'RHYDER, CoolKid, BAN',
    cover: 'https://via.placeholder.com/150/1DB954/ffffff?text=RHYDER',
  },
  {
    id: 2,
    type: 'song',
    title: '2AM',
    artist: 'JustaTee, BigDaddy',
    cover: 'https://via.placeholder.com/150/6366f1/ffffff?text=2AM',
  },
  {
    id: 3,
    type: 'song',
    title: 'Bảo Tàng Của Nuối Tiếc',
    artist: 'Vũ.',
    cover: 'https://via.placeholder.com/150/ff6b6b/ffffff?text=VU',
  },
  {
    id: 4,
    type: 'artist',
    title: 'Vũ Phụng Tiên',
    artist: 'Nghệ sĩ',
    cover: 'https://via.placeholder.com/150/333333/ffffff?text=VPT',
  },
  {
    id: 5,
    type: 'playlist',
    title: 'Danh sách phát của tôi #7',
    artist: 'Danh sách phát • Đỗ Trọng Tín',
    cover: 'https://via.placeholder.com/150/1DB954/ffffff?text=P',
  },
  {
    id: 6,
    type: 'podcast',
    title: 'IELTS Speaking for Success',
    artist: 'Podcourses',
    cover: 'https://via.placeholder.com/150/5555bb/ffffff?text=IELTS',
  },
];

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { setRightPanelData } = useAppContext();

  const results = keyword
    ? mockSearchData.filter((item) => {
        const lowerKeyword = keyword.toLowerCase();

        return (
          item.title.toLowerCase().includes(lowerKeyword) ||
          item.artist.toLowerCase().includes(lowerKeyword) ||
          item.type.toLowerCase().includes(lowerKeyword)
        );
      })
    : mockSearchData;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Tìm kiếm</h1>

      {keyword ? (
        <p style={styles.subtitle}>
          Kết quả cho: <span style={styles.keyword}>{keyword}</span>
        </p>
      ) : (
        <p style={styles.subtitle}>
          Nhập từ khóa trên thanh tìm kiếm để tìm bài hát, nghệ sĩ hoặc playlist.
        </p>
      )}

      {results.length === 0 ? (
        <div style={styles.emptyBox}>Không tìm thấy nội dung phù hợp.</div>
      ) : (
        <div style={styles.resultList}>
          {results.map((item) => (
            <div
              key={item.id}
              style={styles.resultItem}
              onClick={() =>
                setRightPanelData({
                  title: item.title,
                  artist: item.artist,
                  cover: item.cover,
                  type: item.type === 'artist' ? 'artist' : 'song',
                })
              }
            >
              <img src={item.cover} alt={item.title} style={styles.cover} />

              <div style={styles.info}>
                <div style={styles.itemTitle}>{item.title}</div>

                <div style={styles.itemSubtitle}>
                  {item.type === 'song'
                    ? 'Bài hát'
                    : item.type === 'artist'
                      ? 'Nghệ sĩ'
                      : item.type === 'playlist'
                        ? 'Playlist'
                        : 'Podcast'}{' '}
                  • {item.artist}
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
  page: {
    padding: 24,
    color: '#ffffff',
    minHeight: '100%',
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 32,
    fontWeight: 800,
    margin: '0 0 8px 0',
  },

  subtitle: {
    color: '#b3b3b3',
    fontSize: 14,
    marginBottom: 24,
  },

  keyword: {
    color: '#ffffff',
    fontWeight: 700,
  },

  emptyBox: {
    color: '#b3b3b3',
    backgroundColor: '#181818',
    padding: 20,
    borderRadius: 8,
  },

  resultList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 8,
  },

  resultItem: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 16,
    padding: '12px 14px',
    backgroundColor: '#181818',
    borderRadius: 8,
    cursor: 'pointer',
  },

  cover: {
    width: 56,
    height: 56,
    borderRadius: 6,
    objectFit: 'cover' as const,
    flexShrink: 0,
  },

  info: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 4,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#ffffff',
  },

  itemSubtitle: {
    fontSize: 13,
    color: '#b3b3b3',
  },
};

export default Search;