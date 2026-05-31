import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside style={styles.sidebar}>
      {/* Add sidebar content here */}
    </aside>
  );
};

const styles = {
  sidebar: {
    width: 100,
    backgroundColor: '#9370db',
    height: '100%',
    overflow: 'auto' as const,
  },
};

export default Sidebar;
