import React from 'react';
import IconButton from './IconButton';

interface PanelHeaderProps {
  playlistTitle: string;
  onClose?: () => void;
  onMenuClick?: () => void;
  onExpandClick?: () => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  playlistTitle,
  onClose,
  onMenuClick,
  onExpandClick,
}) => {
  return (
    <header style={styles.header}>
      <div style={styles.leftGroup}>
        <IconButton label="Ẩn chế độ xem Đang phát" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 4v16M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>

        <h2 style={styles.title}>{playlistTitle}</h2>
      </div>

      <div style={styles.rightGroup}>
        <IconButton label="Tùy chọn" onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="19" cy="12" r="1.7" />
          </svg>
        </IconButton>

        <IconButton label="Mở rộng" onClick={onExpandClick}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: 66,
    padding: '0 20px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
    flexShrink: 0,
    position: 'relative' as const,
  },

  leftGroup: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 12,
    minWidth: 0,
  },

  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  rightGroup: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 10,
    color: '#b3b3b3',
  },
};

export default PanelHeader;