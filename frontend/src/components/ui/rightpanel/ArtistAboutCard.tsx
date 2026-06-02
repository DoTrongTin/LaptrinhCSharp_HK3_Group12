import React from 'react';

interface ArtistAboutCardProps {
  artistName: string;
  artistImageUrl: string;
  monthlyListeners: string;
}

const ArtistAboutCard: React.FC<ArtistAboutCardProps> = ({ artistName, artistImageUrl, monthlyListeners }) => {
  return (
    <section style={{ background: '#1f1f1f', borderRadius: 7, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 225, overflow: 'hidden' }}>
        <img src={artistImageUrl} alt={artistName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.28) 100%)' }} />
        <h3 style={{ position: 'absolute', top: 19, left: 18, margin: 0, fontSize: 20, fontWeight: 900 }}>Giới thiệu về nghệ sĩ</h3>
      </div>
      <div style={{ padding: '20px 18px 15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 18, fontWeight: 900 }}>
            <span>{artistName}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.5l2.2 1.9 2.9-.3 1.1 2.7 2.5 1.5-.9 2.8.9 2.8-2.5 1.5-1.1 2.7-2.9-.3-2.2 1.9-2.2-1.9-2.9.3-1.1-2.7-2.5-1.5.9-2.8-.9-2.8 2.5-1.5 1.1-2.7 2.9.3L12 2.5z" fill="#9bf6b5" />
              <path d="M8.5 12.1l2.2 2.2 4.8-5" stroke="#0f1f14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <button style={{ minWidth: 93, height: 38, padding: '0 18px', borderRadius: 999, border: '1px solid #888888', background: 'transparent', color: '#ffffff', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            Theo dõi
          </button>
        </div>
        <p style={{ margin: '16px 0 0', color: '#b3b3b3', fontSize: 18, fontWeight: 700 }}>{monthlyListeners}</p>
      </div>
    </section>
  );
};

export default ArtistAboutCard;