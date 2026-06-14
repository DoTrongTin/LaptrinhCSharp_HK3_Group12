import React from 'react';

interface ArtistAboutCardProps {
  artistName: string;
  artistImageUrl: string;
  monthlyListeners: string;
  isFollowing?: boolean;
  showAllCredits?: boolean;
  onToggleFollow?: () => void;
  onToggleCredits?: () => void;
}

const ArtistAboutCard: React.FC<ArtistAboutCardProps> = ({
  artistName,
  artistImageUrl,
  monthlyListeners,
  isFollowing = false,
  showAllCredits = false,
  onToggleFollow,
  onToggleCredits,
}) => {
  const credits = showAllCredits
    ? [
        { name: artistName, role: 'Main Artist • Composer' },
        { name: 'Abdelilah Bensaid', role: 'Composer' },
        { name: 'Abdelilah', role: 'Producer' },
        { name: 'TuneVault Studio', role: 'Publisher' },
      ]
    : [
        { name: artistName, role: 'Main Artist • Composer' },
        { name: 'Abdelilah Bensaid', role: 'Composer' },
      ];

  return (
    <>
      <section style={styles.artistCard}>
        <div style={styles.imageWrapper}>
          <img src={artistImageUrl} alt={artistName} style={styles.artistImage} />
          <div style={styles.imageOverlay} />
          <h3 style={styles.aboutTitle}>Giới thiệu về nghệ sĩ</h3>
        </div>

        <div style={styles.artistBody}>
          <div style={styles.artistHeader}>
            <div style={styles.artistName}>
              <span>{artistName}</span>
              <span style={styles.verifyBadge}>✓</span>
            </div>

            <button style={styles.followButton} onClick={onToggleFollow}>
              {isFollowing ? 'Unfollow' : 'Theo dõi'}
            </button>
          </div>

          <p style={styles.listeners}>{monthlyListeners}</p>

          <p style={styles.bio}>
            Hello, I am {artistName}. Những giai điệu được tạo nên từ cảm xúc,
            câu chuyện và những khoảnh khắc rất riêng.
          </p>
        </div>
      </section>

      <section style={styles.creditsCard}>
        <div style={styles.creditsHeader}>
          <h3 style={styles.cardTitle}>Credits</h3>

          <button style={styles.showAllButton} onClick={onToggleCredits}>
            {showAllCredits ? 'Thu gọn' : 'Show all'}
          </button>
        </div>

        <div style={styles.creditList}>
          {credits.map((credit) => (
            <div key={`${credit.name}-${credit.role}`} style={styles.creditItem}>
              <div>
                <div style={styles.creditName}>{credit.name}</div>
                <div style={styles.creditRole}>{credit.role}</div>
              </div>

              {credit.name === artistName && (
                <button style={styles.followButtonSmall} onClick={onToggleFollow}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const styles = {
  artistCard: {
    background: '#1f1f1f',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 20,
  },

  imageWrapper: {
    position: 'relative' as const,
    height: 225,
    overflow: 'hidden',
  },

  artistImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },

  imageOverlay: {
    position: 'absolute' as const,
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.28) 100%)',
  },

  aboutTitle: {
    position: 'absolute' as const,
    top: 19,
    left: 18,
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
  },

  artistBody: {
    padding: '20px 18px 15px',
  },

  artistHeader: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },

  artistName: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 6,
    fontSize: 18,
    fontWeight: 900,
  },

  verifyBadge: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: '#1db954',
    color: '#000000',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 900,
  },

  followButton: {
    minWidth: 93,
    height: 38,
    padding: '0 18px',
    borderRadius: 999,
    border: '1px solid #888888',
    background: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },

  listeners: {
    margin: '16px 0 0',
    color: '#b3b3b3',
    fontSize: 18,
    fontWeight: 700,
  },

  bio: {
    color: '#b3b3b3',
    fontSize: 15,
    lineHeight: 1.45,
    margin: '14px 0 0',
  },

  creditsCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 18,
    marginBottom: 20,
  },

  creditsHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },

  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
  },

  showAllButton: {
    background: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
  },

  creditList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 16,
  },

  creditItem: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    gap: 12,
  },

  creditName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
  },

  creditRole: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
    fontWeight: 600,
  },

  followButtonSmall: {
    minWidth: 90,
    height: 34,
    borderRadius: 999,
    border: '1px solid #888888',
    background: 'transparent',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 800,
    cursor: 'pointer',
  },
};

export default ArtistAboutCard;