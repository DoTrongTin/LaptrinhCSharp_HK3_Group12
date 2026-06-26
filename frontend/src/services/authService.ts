import api from './api';
import { useAuthStore } from '../store/authStore';
import type { LoginDto, RegisterDto } from '../types/auth';
import type { User } from '../types/user';
import { jwtDecode } from 'jwt-decode'; // 1. THÊM IMPORT NÀY

// 2. KHAI BÁO CẤU TRÚC TOKEN TỪ BACKEND TRẢ VỀ
interface MyJwtPayload {
  nameid: string;
  unique_name: string;
  role?: string | string[]; // ASP.NET Core tự động map quyền vào key 'role'
  exp: number;
}

export const authService = {
  login: async (credentials: LoginDto): Promise<User> => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      const data = response.data.data; 
      const token = data.token;
      
      // 3. GIẢI MÃ TOKEN ĐỂ LẤY ROLE
      const decoded = jwtDecode<MyJwtPayload>(token);
      const userRole = Array.isArray(decoded.role) ? decoded.role[0] : decoded.role;
      
      const user: User = {
        id: data.userId,
        userName: data.userName,
        email: data.email,
        avatarPath: data.avatarPath,
        role: userRole // 🌟 GÁN QUYỀN VÀO OBJECT USER
      };

      // Cập nhật State toàn cục
      useAuthStore.getState().setAuth(user, token);
      
      // Chốt an toàn: Ghi thẳng vào ví trình duyệt 
      localStorage.setItem('token', token);

      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
      // eslint-disable-next-line preserve-caught-error
      throw new Error(errorMessage);
    }
  },

  register: async (credentials: RegisterDto): Promise<User> => {
    try {
      const response = await api.post('/auth/register', credentials);
      
      const data = response.data.data;
      const token = data.token;
      
      // Tương tự, giải mã khi Đăng ký (nếu Backend trả về token ngay sau đăng ký)
      const decoded = jwtDecode<MyJwtPayload>(token);
      const userRole = Array.isArray(decoded.role) ? decoded.role[0] : decoded.role;
      
      const user: User = {
        id: data.userId,
        userName: data.userName,
        email: data.email,
        avatarPath: data.avatarPath,
        role: userRole // 🌟 GÁN QUYỀN
      };

      useAuthStore.getState().setAuth(user, token);
      localStorage.setItem('token', token);

      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      // eslint-disable-next-line preserve-caught-error
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    // Dọn dẹp State trong Zustand
    useAuthStore.getState().logout();
    
    // Dọn dẹp Token cứng
    localStorage.removeItem('token');
    
    // Dọn dẹp bộ nhớ đệm của Zustand (nếu bạn có dùng devtools/persist)
    localStorage.removeItem('auth-storage'); 
    
    // Tải lại trang và đá văng người dùng về trang chủ để reset mọi dữ liệu rác
    window.location.href = '/'; 
  }
};