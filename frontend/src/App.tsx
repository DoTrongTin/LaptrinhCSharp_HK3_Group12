import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout chính
import MainLayout from './components/layout/MainLayout';

// Các trang có thanh nhạc (Nằm trong MainLayout)
import HomeContent from './components/layout/MainContent';
import PlaylistDetail from './pages/PlaylistDetail';
import Search from './pages/Search';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import ShareInbox from './pages/ShareInbox';
import VideoPlayer from './pages/VideoPlayer';

// Các trang độc lập
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nhóm Route độc lập không có Sidebar/Playbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Nhóm Route bọc trong MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeContent />} />
          <Route path="playlist/:id" element={<PlaylistDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="share" element={<ShareInbox />} />
          <Route path="video" element={<VideoPlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}