import React from 'react';
import IconButton from './IconButton';

interface PanelHeaderProps {
  playlistTitle: string;
  onClose?: () => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ playlistTitle, onClose }) => {
  return (
    <header style={{ height: 66, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <IconButton label="Ẩn chế độ xem Đang phát" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 4v16M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {playlistTitle}
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, color: '#b3b3b3' }}>
        <IconButton label="Tùy chọn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />
          </svg>
        </IconButton>
      </div>
    </header>
  );
};

export default PanelHeader;