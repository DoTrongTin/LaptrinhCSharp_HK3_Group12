import api from './api';
import { useAuthStore } from '../store/authStore';
import type { LoginDto, RegisterDto } from '../types/auth';
import type { User } from '../types/user';

export const authService = {
  login: async (credentials: LoginDto): Promise<User> => {

    const response = await api.post('/auth/login', credentials);
    

    const data = response.data.data; 
    const token = data.token;
    
    const user: User = {
      id: data.userId,
      userName: data.userName,
      email: data.email,
      avatarPath: data.avatarPath
    };

    useAuthStore.getState().setAuth(user, token);
    return user;
  },

  register: async (credentials: RegisterDto): Promise<User> => {
    const response = await api.post('/auth/register', credentials);
    
    const data = response.data.data;
    const token = data.token;
    
    const user: User = {
      id: data.userId,
      userName: data.userName,
      email: data.email,
      avatarPath: data.avatarPath
    };

    useAuthStore.getState().setAuth(user, token);
    return user;
  },

  logout: () => {
    useAuthStore.getState().logout();
  }
};