import api from './api';
import type { Playlist } from '../types/playlist';

export const playlistService = {
  // Tạo playlist mới (Dùng cho Sidebar)
  createPlaylist: async (title: string): Promise<Playlist> => {
    try {
      const response = await api.post('/playlist', { 
        title: title,
        description: "",
        isPublic: true
      });
      return response.data?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Không thể tạo danh sách phát.';
      // eslint-disable-next-line preserve-caught-error
      throw new Error(errorMessage);
    }
  },

  // Lấy danh sách playlist của người dùng
  getUserPlaylists: async (): Promise<Playlist[]> => {
    try {
      const response = await api.get('/playlist/user');
      return response.data?.data ?? [];
    } catch (error) {
      console.error('Lỗi tải danh sách playlist:', error);
      return []; 
    }
  },

  // Lấy chi tiết playlist kèm danh sách bài hát bên trong
  getPlaylistDetail: async (id: string): Promise<Playlist> => {
    try {
      const response = await api.get(`/playlist/${id}`);
      return response.data?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Lỗi tải chi tiết playlist:', error);
      // eslint-disable-next-line preserve-caught-error
      throw new Error('Không tìm thấy danh sách phát này.');
    }
  }
};