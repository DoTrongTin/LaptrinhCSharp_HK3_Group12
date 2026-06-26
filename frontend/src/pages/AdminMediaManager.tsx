import React, { useState, useEffect } from 'react';
import { Trash2, ShieldAlert } from 'lucide-react';
import { mediaService } from '../services/mediaService';
import { useAuthStore } from '../store/authStore';
import type { MediaItem } from '../types/media';

const AdminMediaManager: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. KIỂM TRA QUYỀN ADMIN (Giả sử trong store bạn lưu role của user)
  const isAdmin = user?.role === 'Admin'; // Cập nhật lại key role cho khớp với thiết kế của bạn

  useEffect(() => {
    if (!isAdmin) return; // Nếu không phải Admin thì không cần gọi API

    const fetchAllMedia = async () => {
      try {
        setIsLoading(true);
        // Ở thực tế, bạn có thể gọi một API lấy toàn bộ danh sách nhạc dành riêng cho Admin.
        // Tạm thời dùng hàm getTrendingMedia để lấy danh sách hiển thị
        const rawData = await mediaService.getTrendingMedia();
        
        // Lọc bỏ bài đã xóa (Hiển thị các bài đang live)
        setMediaItems(rawData.filter(item => !item.isDeleted));
      } catch (error) {
        console.error('Lỗi khi tải danh sách:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMedia();
  }, [isAdmin]);

  // 2. HÀM XỬ LÝ XÓA BÀI HÁT
  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài hát "${title}" khỏi hệ thống?`)) return;

    try {
      await mediaService.deleteMedia(id);
      
      // Xóa thành công -> Loại bỏ bài hát khỏi bảng UI ngay lập tức
      setMediaItems(prev => prev.filter(item => item.id !== id));
      alert(`Đã xóa bài hát "${title}".`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 3. NẾU KHÔNG PHẢI ADMIN -> HIỂN THỊ CẢNH BÁO
  if (!isAuthenticated || !isAdmin) {
    return (
      <main style={styles.mainContent}>
        <div style={styles.centerBox}>
          <ShieldAlert size={64} color="#f44336" />
          <h2 style={{ color: '#fff', marginTop: 16 }}>Khu vực cấm</h2>
          <p style={{ color: '#b3b3b3' }}>Chỉ tài khoản Quản trị viên (Admin) mới có quyền truy cập trang này.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.mainContent}>
      <div style={styles.innerContainer}>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>Quản lý bài hát</h1>
        
        {isLoading ? (
          <p style={{ color: '#b3b3b3' }}>Đang tải dữ liệu hệ thống...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Tên bài hát</th>
                <th style={styles.th}>Nghệ sĩ</th>
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.map((item) => (
                <tr key={item.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.mediaInfo}>
                      <img src={item.thumbnailPath || 'https://via.placeholder.com/40'} alt="cover" style={styles.cover} />
                      <span style={{ color: '#fff' }}>{item.title}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{item.artistName || 'Ẩn danh'}</td>
                  <td style={styles.td}>
                    {/* NÚT XÓA CHỈ DÀNH CHO ADMIN */}
                    <button 
                      onClick={() => handleDelete(item.id, item.title)}
                      style={styles.deleteBtn}
                      title="Xóa bài hát"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

const styles = {
  mainContent: { flex: 1, backgroundColor: '#121212', borderRadius: 8, height: '100%', overflowY: 'auto' as const, display: 'flex' as const, flexDirection: 'column' as const },
  innerContainer: { padding: '24px 32px' },
  centerBox: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '100%' },
  
  table: { width: '100%', borderCollapse: 'collapse' as const, marginTop: 24 },
  tableHead: { borderBottom: '1px solid #333', textAlign: 'left' as const, color: '#b3b3b3', fontSize: 14 },
  th: { padding: '12px 16px', fontWeight: 500 },
  tableRow: { borderBottom: '1px solid #2a2a2a', transition: 'background-color 0.2s' },
  td: { padding: '12px 16px', color: '#b3b3b3', fontSize: 14, verticalAlign: 'middle' },
  
  mediaInfo: { display: 'flex', alignItems: 'center', gap: 12 },
  cover: { width: 40, height: 40, borderRadius: 4, objectFit: 'cover' as const },
  
  deleteBtn: { background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }
};

export default AdminMediaManager;