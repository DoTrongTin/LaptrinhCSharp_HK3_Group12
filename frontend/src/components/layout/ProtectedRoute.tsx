import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute: React.FC = () => {
  // Lấy trạng thái đăng nhập từ store
  const { isAuthenticated } = useAuthStore();

  // Nếu chưa đăng nhập, lập tức điều hướng về trang Login
  // Dùng replace để người dùng không thể bấm nút Back trên trình duyệt để quay lại trang được bảo vệ
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép render các component con (như Home, Playlist...)
  return <Outlet />;
};

export default ProtectedRoute;