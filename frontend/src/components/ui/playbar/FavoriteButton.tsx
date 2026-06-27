import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { mediaService } from '../../../services/mediaService'; 
import { useAuthStore } from '../../../store/authStore';

interface FavoriteButtonProps {
  mediaId: string;
  initialIsFavorite?: boolean; 
  size?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ mediaId, initialIsFavorite = false, size = 20 }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  
  // Lấy trạng thái đăng nhập để chặn người dùng khách
  const { isAuthenticated } = useAuthStore();

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để lưu bài hát vào thư viện!');
      return;
    }


    setIsFavorite(!isFavorite);

    try {
  
      await mediaService.toggleFavorite(mediaId);
    } catch (error) {
      setIsFavorite(isFavorite);
      console.error('Lỗi khi thả tim:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: isAuthenticated ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isFavorite ? '#1db954' : '#b3b3b3', 
        transition: 'color 0.2s, transform 0.1s',
        transform: isFavorite ? 'scale(1.1)' : 'scale(1)', 
        padding: 0,
      }}
      title={isFavorite ? 'Xóa khỏi thư viện' : 'Lưu vào thư viện'}
    >
      <Heart size={size} fill={isFavorite ? '#1db954' : 'none'} />
    </button>
  );
};

export default FavoriteButton;