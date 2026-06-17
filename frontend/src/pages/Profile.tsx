import React from 'react';

const Profile: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.avatar}>T</div>
        <div>
          <p style={styles.type}>Hồ sơ</p>
          <h1 style={styles.name}>Tên Người Dùng</h1>
          <p style={styles.stats}>0 Danh sách phát công khai • 10 Đang theo dõi</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: 24, color: '#ffffff', minHeight: '100%', backgroundColor: '#121212' },
  header: { display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' },
  avatar: { width: '192px', height: '192px', borderRadius: '50%', backgroundColor: '#282828', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', fontWeight: 'bold', boxShadow: '0 4px 60px rgba(0,0,0,.5)' },
  type: { margin: 0, fontSize: '14px', fontWeight: 700 },
  name: { margin: '8px 0', fontSize: '72px', fontWeight: 900, letterSpacing: '-0.04em' },
  stats: { margin: 0, color: '#b3b3b3', fontSize: '14px' }
};

export default Profile;