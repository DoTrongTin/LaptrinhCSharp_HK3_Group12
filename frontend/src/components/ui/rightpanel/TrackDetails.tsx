import React from 'react';
import IconButton from './IconButton';

interface TrackDetailsProps {
  artworkUrl: string;
  title: string;
  artist: string;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ artworkUrl, title, artist }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <img src={artworkUrl} alt={title} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 5, boxShadow: '0 8px 28px rgba(0, 0, 0, 0.35)' }} />
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, paddingTop: 22 }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: '-1px' }}>{title}</h1>
          <p style={{ margin: '2px 0 0', color: '#b3b3b3', fontSize: 18, fontWeight: 700 }}>{artist}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 9 }}>
          <IconButton label="Chia sẻ">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12v7h12v-7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
          <IconButton label="Thêm vào thư viện" bordered>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;