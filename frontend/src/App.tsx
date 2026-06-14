// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

import HomeContent from './components/layout/MainContent';
import PlaylistDetail from './pages/PlaylistDetail';
import Search from './pages/Search';
import Library from './pages/Library';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeContent />} />
          <Route path="playlist/:id" element={<PlaylistDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}