import type { MediaItem } from '../types/media';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5078/api';

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token'); 
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const mediaService = {
  // 1. Lấy nhạc trang chủ (Public - Không cần đăng nhập)
  getTrendingMedia: async (): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/media/trending`);
    if (!response.ok) throw new Error('Lỗi tải nhạc');
    const body = await response.json();
    return body?.data ?? [];
  },

  // 2. Tìm kiếm nhạc (Public - Không cần đăng nhập)
  searchMedia: async (keyword: string): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/media/search?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('Lỗi tìm kiếm');
    return response.json();
  },

  // 3. Tải nhạc lên (Private - Yêu cầu Đăng nhập)
  uploadMedia: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: {
        ...getAuthHeader() // Kẹp vé Token vào cửa
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Bạn cần đăng nhập để tải nhạc lên.');
      throw new Error('Lỗi tải bài hát lên server');
    }
    return response.json();
  },

  // 4. Tương tác yêu thích bài hát (Private - Yêu cầu Đăng nhập)
  toggleFavorite: async (mediaId: string): Promise<{ success: boolean; data: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/interaction/favorite/${mediaId}`, {
      method: 'POST',
      headers: {
        ...getAuthHeader() // Kẹp vé Token để BE biết ai đang thả tim
      }
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Bạn cần đăng nhập để yêu thích bài hát.');
      throw new Error('Lỗi xử lý yêu thích');
    }
    return response.json();
  },

  // 5. Ghi nhận lịch sử phát nhạc (Private - Cần Token nếu muốn lưu lịch sử cá nhân)
  recordPlayHistory: async (mediaId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/interaction/history/${mediaId}`, {
        method: 'POST',
        headers: {
          ...getAuthHeader() 
        }
      });
    } catch (error) {
      console.error('Không thể lưu lịch sử phát nhạc:', error);
    }
  },
  // 6. Lấy danh sách bài hát đã thích (Private)
  getFavorites: async (): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/interaction/favorites`, {
      headers: { ...getAuthHeader() }
    });
    if (!response.ok) throw new Error('Lỗi tải danh sách yêu thích');
    const body = await response.json();
    return body?.data ?? [];
  },

  // 7. Lấy lịch sử nghe nhạc gần đây (Private - Tối đa 10 bài theo chuẩn CQRS)
  getPlayHistory: async (): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/interaction/history`, {
      headers: { ...getAuthHeader() }
    });
    if (!response.ok) throw new Error('Lỗi tải lịch sử nghe nhạc');
    const body = await response.json();
    return body?.data ?? [];
  },
  deleteMedia: async (mediaId: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/media/${mediaId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader() // Kẹp vé Token để BE kiểm tra quyền
      }
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Bạn cần đăng nhập để thực hiện chức năng này.');
      if (response.status === 404) throw new Error('Không tìm thấy bài hát cần xóa.');
      
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Lỗi hệ thống khi xóa bài hát');
    }
    
    return response.json();
  }


};