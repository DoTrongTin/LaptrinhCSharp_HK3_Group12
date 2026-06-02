import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';

const MainContent: React.FC = () => {
  return (
    <main style={styles.mainContent}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here */}
      </Routes>
    </main>
  );
};

const styles = {
  mainContent: {
    flex: 1,
    backgroundColor: '#06100fea',
    borderRadius: 8,
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    margin: '0 10px', 
    overflowY: 'auto' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    position: 'relative' as const,
  },
};

export default MainContent;