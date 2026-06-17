import { create } from "zustand";
import type { MediaItem } from "../types/media";
import { mediaService } from "../services/mediaService";

interface PlayerState {
  currentTrack: MediaItem | null;
  queue: MediaItem[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track: MediaItem) => void;
  pause: () => void;
  resume: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (vol: number) => void;
  playNext: () => void;
  addToQueue: (track: MediaItem) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 80,
  
  // TỰ ĐỘNG KÍCH HOẠT LỊCH SỬ PHÁT NHẠC KHI PLAY TRACK NỘI BỘ
  play: (track) => {
    set({ currentTrack: track, isPlaying: true, currentTime: 0 });
    // Gọi API ghi nhận lịch sử ngầm xuống SQL Server
    if (track.id) {
      mediaService.recordPlayHistory(track.id);
    }
  },
  
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (dur) => set({ duration: dur }),
  setVolume: (vol) => set({ volume: vol }),
  playNext: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ currentTrack: next, queue: rest, isPlaying: true, currentTime: 0 });
      if (next.id) {
        mediaService.recordPlayHistory(next.id);
      }
    }
  },
  addToQueue: (track) => set((s) => ({ queue: [...s.queue, track] })),
}));