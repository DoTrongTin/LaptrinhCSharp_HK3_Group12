import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Trạng thái mặc định khi người dùng mới vào web lần đầu
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        // Vẫn ghi ra ngoài cho các hàm Axios hoặc hàm fetch gọi API dùng
        localStorage.setItem('token', token); 
        
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // 3. Tên "chiếc hộp" sẽ lưu trong LocalStorage
    }
  )
);