import React from 'react';

interface IconButtonProps {
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
  onClick?: () => void; 
}

const IconButton: React.FC<IconButtonProps> = ({ label, children, bordered = false, onClick }) => (
  <button
    aria-label={label}
    title={label}
    onClick={onClick}
    style={{
      width: 32, height: 32, border: bordered ? '2px solid #b3b3b3' : 'none', 
      padding: 0, background: 'transparent', color: '#b3b3b3', 
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
      cursor: 'pointer', flexShrink: 0, transition: 'color 0.2s', borderRadius: '50%'
    }}
  >
    {children}
  </button>
);

export default IconButton;