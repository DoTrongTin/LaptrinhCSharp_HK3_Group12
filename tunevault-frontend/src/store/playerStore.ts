import { create } from "zustand";
import type { MediaItem } from "../types/media";

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
  play: (track) => set({ currentTrack: track, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (vol) => set({ volume: vol }),
  playNext: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ currentTrack: next, queue: rest, isPlaying: true });
    }
  },
  addToQueue: (track) => set((s) => ({ queue: [...s.queue, track] })),
}));
