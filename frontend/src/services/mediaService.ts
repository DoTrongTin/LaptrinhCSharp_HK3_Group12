import type { MediaItem } from '../types/media';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export const mediaService = {
  getTrendingMedia: async (): Promise<MediaItem[]> => {
    const response = await fetch(`${API_BASE_URL}/media/trending`);

    if (!response.ok) {
      throw new Error('Không thể tải danh sách nhạc từ hệ thống');
    }

    return response.json();
  },

  getMediaById: async (id: string): Promise<MediaItem> => {
    const response = await fetch(`${API_BASE_URL}/media/${id}`);

    if (!response.ok) {
      throw new Error('Không thể tải thông tin bài hát');
    }

    return response.json();
  },
};