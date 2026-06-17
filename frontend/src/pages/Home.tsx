// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import type { MediaItem } from '../types/media';
import { mediaService } from '../services/mediaService';

interface HomeProps {
  onPlay: (song: MediaItem) => void;
}

const Home: React.FC<HomeProps> = ({ onPlay }) => {
  const [songs, setSongs] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const data = await mediaService.getTrendingMedia();
        setSongs(data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  if (loading) return <div>Đang tải nhạc...</div>;

  return (
    <div>
      <h2>🎵 Dành cho bạn</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {songs.map((song) => (
          <div 
            key={song.id} 
            onClick={() => onPlay(song)}
            style={{ backgroundColor: '#181818', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <img 
              src={song.thumbnailPath || 'https://via.placeholder.com/150'} 
              alt={song.title} 
              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h4 style={{ margin: '10px 0 5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {song.title}
            </h4>
            <p style={{ margin: 0, color: '#b3b3b3', fontSize: '14px' }}>{song.ownerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;