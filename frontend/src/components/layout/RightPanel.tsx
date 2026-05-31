import React from 'react';

const RightPanel: React.FC = () => {
  return (
    <aside style={styles.rightPanel}>
      {/* Add right panel content here */}
    </aside>
  );
};

const styles = {
  rightPanel: {
    width: 250,
    backgroundColor: '#9370db',
    height: '100%',
    overflow: 'auto' as const,
  },
};

export default RightPanel;
