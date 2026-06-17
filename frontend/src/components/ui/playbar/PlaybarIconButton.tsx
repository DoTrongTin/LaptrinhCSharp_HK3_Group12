import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PlaybarIconButtonProps {
  icon: LucideIcon;
  title: string;
  size?: number;
  variant?: 'subtle' | 'control' | 'play';
  filled?: boolean;
  onClick?: () => void;
}

const PlaybarIconButton: React.FC<PlaybarIconButtonProps> = ({
  icon: Icon,
  title,
  size = 18,
  variant = 'subtle',
  filled = false,
  onClick,
}) => {
  return (
    <button style={{ ...styles.baseButton, ...styles[variant] }} title={title} onClick={onClick}>
      <Icon size={size} fill={filled ? 'currentColor' : 'none'} />
    </button>
  );
};

const styles = {
  baseButton: {
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer' as const,
    padding: 0,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },
  subtle: {
    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    color: '#b3b3b3',
  },
  control: {
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    color: '#b3b3b3',
  },
  play: {
    width: 34,
    height: 34,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
};

export default PlaybarIconButton;