import React from 'react';

const Library: React.FC = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Thư viện của bạn</h1>

      <p style={styles.description}>
        Đây là trang Library. Sau này trang này sẽ hiển thị toàn bộ playlist, podcast,
        nghệ sĩ và bài hát đã thích của người dùng.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Playlist</h3>
          <p>Danh sách phát của bạn</p>
        </div>

        <div style={styles.card}>
          <h3>Podcast</h3>
          <p>Các podcast đã lưu</p>
        </div>

        <div style={styles.card}>
          <h3>Nghệ sĩ</h3>
          <p>Nghệ sĩ bạn theo dõi</p>
        </div>

        <div style={styles.card}>
          <h3>Bài hát đã thích</h3>
          <p>Những bài hát bạn đã lưu</p>
        </div>
      </div>
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

  description: {
    color: '#b3b3b3',
    fontSize: 14,
    marginBottom: 24,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
  },

  card: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 18,
    color: '#ffffff',
  },
};

export default Library;