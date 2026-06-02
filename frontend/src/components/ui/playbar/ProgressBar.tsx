import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  width?: number | string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, width = '100%' }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={{ ...styles.track, width }}>
      <div style={{ ...styles.fill, width: `${percent}%` }} />
    </div>
  );
};

const styles = {
  track: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#4d4d4d',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
};

export default ProgressBar;