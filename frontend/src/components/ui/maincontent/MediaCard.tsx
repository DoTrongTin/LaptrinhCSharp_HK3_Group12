import React from 'react';

interface MediaCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  isCircleImage?: boolean;
  onClick?: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ imageUrl, title, subtitle, isCircleImage = false, onClick }) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          style={{
            ...styles.image,
            borderRadius: isCircleImage ? '50%' : 8,
          }} 
        />
      </div>
      <h4 style={styles.title}>{title}</h4>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#181818',
    padding: 16,
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'background-color 0.3s',
    gap: 12,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '1 / 1',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  title: {
    margin: 0,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    margin: 0,
    color: '#b3b3b3',
    fontSize: 14,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  }
};

export default MediaCard;