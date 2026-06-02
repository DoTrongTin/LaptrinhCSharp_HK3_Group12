export interface CurrentTrack {
  artworkUrl: string;
  title: string;
  artist: string;
  currentTime: string;
  duration: string;
  progress: number;
  volume: number;
  playlistTitle: string;
  artistMonthlyListeners: string;
  artistImageUrl: string;
}

export const currentTrack: CurrentTrack = {
  artworkUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=760&q=80',
  title: 'Detective Conan Main Theme',
  artist: 'Katsuo Ono',
  currentTime: '1:21',
  duration: '3:42',
  progress: 37,
  volume: 72,
  playlistTitle: 'Danh sách phát của tôi #7',
  artistMonthlyListeners: '2.113.382 người nghe hàng tháng',
  artistImageUrl: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=760&q=80',
};