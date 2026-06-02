import React from 'react';

interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, isActive = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        ...styles.pill,
        backgroundColor: isActive ? '#ffffff' : '#2a2a2a',
        color: isActive ? '#000000' : '#ffffff',
      }}
    >
      {label}
    </button>
  );
};

const styles = {
  pill: {
    border: 'none',
    borderRadius: 32,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};

export default FilterPill;