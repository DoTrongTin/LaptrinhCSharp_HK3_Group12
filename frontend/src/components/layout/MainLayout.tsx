import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import Playbar from './Playbar';
import '../../styles/globals.css';

const MainLayout: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000000', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, backgroundColor: '#000000' }} />
        <RightPanel />
      </div>
      <Playbar />
    </div>
  );
};

export default MainLayout;

