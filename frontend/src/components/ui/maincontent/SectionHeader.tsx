import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  showAllText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  avatarUrl, 
  showAllText = 'Hiện tất cả' 
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        {avatarUrl && (
          <img src={avatarUrl} alt="Avatar" style={styles.avatar} />
        )}
        <div style={styles.textStack}>
          {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
          <h2 style={styles.title}>{title}</h2>
        </div>
      </div>
      
      <button style={styles.showAllBtn}>{showAllText}</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  textStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  title: {
    margin: 0,
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: '-0.04em',
    cursor: 'pointer',
  },
  showAllBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    padding: 0,
  }
};

export default SectionHeader;