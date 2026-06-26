export interface User {
  id: string;
  userName: string;
  email: string;
  bio?: string;
  avatarPath?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
