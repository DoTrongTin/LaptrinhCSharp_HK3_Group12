import api from './api';

export type SearchMediaItem = {
  id: string;
  title: string;
  artistName?: string;
  ownerName?: string;
  thumbnailPath?: string;
  type: 'song';
};

export const searchService = {
  async searchMedia(keyword: string): Promise<SearchMediaItem[]> {
    const response = await api.get('/media/search', {
      params: { keyword },
    });

    return response.data?.data ?? response.data ?? [];
  },
};