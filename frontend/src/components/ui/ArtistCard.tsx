import React from 'react';

interface ArtistCardProps {
  id: string;
  name: string;
  followers?: number;
  imageUrl?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, name, followers, imageUrl }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={imageUrl || 'https://via.placeholder.com/150?text=Artist'}
          alt={name}
          style={styles.image}
        />
      </div>
      <div style={styles.info}>
        <h4 style={styles.name}>{name}</h4>
        {followers && <p style={styles.followers}>{(followers / 1000).toFixed(1)}K followers</p>}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center' as const,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: '50%',
    overflow: 'hidden',
    aspectRatio: '1',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 4px 0',
  },
  followers: {
    color: '#b3b3b3',
    fontSize: 12,
    margin: 0,
  },
};

export default ArtistCard;
