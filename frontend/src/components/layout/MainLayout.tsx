import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import Playbar from './Playbar';
import MainContent from './MainContent';
import '../../styles/globals.css';

const MainLayout: React.FC = () => {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.contentArea}>
        <Sidebar />
        <MainContent/>
        <RightPanel />
      </div>
      <Playbar />
    </div>
  );
};

const styles = {
  layout: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000000',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  contentArea: {
    display: 'flex' as const,
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  },
};

export default MainLayout;


