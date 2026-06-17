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
  }
};