import type { MediaItem } from '../types/media';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5078/api';

export const mediaService = {
  // Lấy nhạc trang chủ
  getTrendingMedia: async (): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/media/trending`);
    if (!response.ok) throw new Error('Lỗi tải nhạc');
    return response.json();
  },

  // Tìm kiếm nhạc
  searchMedia: async (keyword: string): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/media/search?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('Lỗi tìm kiếm');
    return response.json();
  },

  // Tương tác yêu thích bài hát (GĐ 2)
  toggleFavorite: async (mediaId: string): Promise<{ success: boolean; data: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/interaction/favorite/${mediaId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Lỗi xử lý yêu thích');
    return response.json();
  },

  // Ghi nhận lịch sử phát nhạc (GĐ 2)
  recordPlayHistory: async (mediaId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/interaction/history/${mediaId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Không thể lưu lịch sử phát nhạc:', error);
    }
  }
};