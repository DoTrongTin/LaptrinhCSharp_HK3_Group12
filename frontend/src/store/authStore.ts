import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}


const savedToken = localStorage.getItem('token');


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: savedToken,
  isAuthenticated: !!savedToken,

  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));