import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!isAuthenticated) {
    return (
      <div style={styles.page}>
        <h2 style={{ marginBottom: 12 }}>Bạn chưa đăng nhập</h2>
        <p style={{ color: '#b3b3b3' }}>Đăng nhập để xem hồ sơ, danh sách phát và lịch sử nghe.</p>
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <button style={styles.authBtn} onClick={() => navigate('/login')}>Đăng nhập</button>
          <Link to="/register" style={{ textDecoration: 'none' }}><button style={styles.createBtn}>Đăng ký</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.avatar}>{user?.userName?.[0]?.toUpperCase() || 'U'}</div>
        <div>
          <p style={styles.type}>Hồ sơ</p>
          <h1 style={styles.name}>{user?.userName || 'Người dùng'}</h1>
          <p style={styles.stats}>{user?.email || ''}</p>
        </div>
      </div>

      <div>
        <button
          style={{ ...styles.createBtn, marginTop: 12 }}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Đăng xuất
        </button>
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