import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { profileService } from '../services/profileService';

const Profile: React.FC = () => {
  const { user, isAuthenticated, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    userName: user?.userName || '', 
    bio: user?.bio || '' 
  });

  const handleUpdate = async () => {
    try {
      const updatedUser = await profileService.updateProfile(formData);
      // Giả sử service trả về user mới, cập nhật lại store
      setAuth({ ...user!, ...updatedUser }, localStorage.getItem('token')!);
      setIsEditing(false);
      alert("Cập nhật thành công!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };

  if (!isAuthenticated) return <div style={styles.container}>Vui lòng đăng nhập.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatarLarge}>{user?.userName?.[0]?.toUpperCase()}</div>
        <div style={styles.info}>
          <p style={styles.subTitle}>Hồ sơ</p>
          {isEditing ? (
            <input 
              style={styles.input} 
              value={formData.userName} 
              onChange={(e) => setFormData({...formData, userName: e.target.value})} 
            />
          ) : (
            <h1 style={styles.title}>{user?.userName}</h1>
          )}
        </div>
      </div>

      <div style={styles.bioSection}>
        <h3>Bio</h3>
        {isEditing ? (
          <textarea 
            style={styles.textarea} 
            value={formData.bio} 
            onChange={(e) => setFormData({...formData, bio: e.target.value})} 
          />
        ) : (
          <p style={styles.bioText}>{user?.bio || "Chưa có tiểu sử."}</p>
        )}
      </div>

      <button style={styles.editButton} onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}>
        {isEditing ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ"}
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '40px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px' },
  avatarLarge: { width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' },
  title: { fontSize: '60px', fontWeight: 900 },
  subTitle: { color: '#b3b3b3', textTransform: 'uppercase' as const },
  // THÊM THUỘC TÍNH NÀY VÀO:
  info: { display: 'flex', flexDirection: 'column' as const, gap: '8px' }, 
  input: { fontSize: '40px', background: 'transparent', color: '#fff', border: '1px solid #555', padding: '5px' },
  bioSection: { backgroundColor: '#181818', padding: '20px', borderRadius: '8px', maxWidth: '600px' },
  textarea: { width: '100%', height: '100px', background: '#333', color: '#fff', padding: '10px', marginTop: '10px' },
  bioText: { color: '#b3b3b3', marginTop: '10px' },
  editButton: { marginTop: '20px', padding: '10px 25px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
};

export default Profile;