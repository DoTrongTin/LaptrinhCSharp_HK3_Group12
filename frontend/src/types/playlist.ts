import type { MediaItem } from './media';

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverImageUrl: string | null;
  isPublic?: boolean;
  userId?: string;
  createdAt?: string;
  
  // Mảng chứa các bài hát thuộc playlist này (sẽ có dữ liệu khi gọi API GetPlaylistDetail)
  tracks?: MediaItem[]; 
}