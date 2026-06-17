import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div style={{ padding: 24, color: '#ffffff', minHeight: '100%', backgroundColor: '#121212' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Thông báo mới</h1>
      <div style={{ backgroundColor: '#181818', padding: 20, borderRadius: 8 }}>
        <p style={{ color: '#b3b3b3', margin: 0 }}>Bạn hiện không có thông báo nào.</p>
      </div>
    </div>
  );
};

export default Notifications;