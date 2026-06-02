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
import React, { useState } from 'react';
// Do MainContent nằm trong thư mục layout, nên ta trỏ đường dẫn ra ngoài 1 cấp (../) rồi vào thư mục ui
import FilterPill from '../ui/maincontent/FilterPill';
import SectionHeader from '../ui/maincontent/SectionHeader';
import MediaCard from '../ui/maincontent/MediaCard';

const MainContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  // Dữ liệu giả lập khớp với ảnh
  const recommendedData = [
    { id: 1, title: 'Chịu Cách Mình Nói Thua', subtitle: 'RHYDER, CoolKid, BAN', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=RHYDER' },
    { id: 2, title: '2AM', subtitle: 'JustaTee, BigDaddy', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=2AM' },
    { id: 3, title: 'Bảo Tàng Của Nuối Tiếc', subtitle: 'Vũ.', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=VU' },
    { id: 4, title: 'Yêu 5', subtitle: 'Rhymastic', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=YEU5' },
    { id: 5, title: 'Hẹn Gặp Em Dưới Ánh Trăng', subtitle: 'MANBO, HIEUTHUHAI', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=MANBO' },
  ];

  const chilliesData = [
    { id: 1, title: 'Một Đêm Say (X)', subtitle: 'Thịnh Suy', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=Say' },
    { id: 2, title: 'Với Da LAB, Vũ., GREY D', subtitle: 'Danh sách phát', img: 'https://via.placeholder.com/150/ff6b6b/ffffff?text=Chillies' },
    { id: 3, title: 'Mai Mình Xa', subtitle: 'Thịnh Suy', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=Mai' },
    { id: 4, title: 'Sinh Ra Đã Là Thứ Đối Lập', subtitle: 'Emcee L (Da LAB)', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=DaLab' },
    { id: 5, title: 'Tinh hoa hội tụ', subtitle: 'đầy cảm xúc...', img: 'https://via.placeholder.com/150/1a1a1a/ffffff?text=Indie' },
  ];

  return (
    <main style={styles.mainContent}>
      <div style={styles.innerContainer}>
        
        {/* Thanh Filters */}
        <div style={styles.filtersRow}>
          {['Tất cả', 'Nhạc', 'Podcasts'].map(filter => (
            <FilterPill 
              key={filter} 
              label={filter} 
              isActive={activeFilter === filter} 
              onClick={() => setActiveFilter(filter)} 
            />
          ))}
        </div>

        {/* Section 1: Được đề xuất */}
        <section style={styles.section}>
          <SectionHeader title="Được đề xuất cho hôm nay" />
          <div style={styles.gridContainer}>
            {recommendedData.map(item => (
              <MediaCard key={item.id} title={item.title} subtitle={item.subtitle} imageUrl={item.img} />
            ))}
          </div>
        </section>

        {/* Section 2: Gợi ý nghệ sĩ */}
        <section style={styles.section}>
          <SectionHeader 
            title="Chillies" 
            subtitle="Nội dung khác giống" 
            avatarUrl="https://via.placeholder.com/48/333/fff?text=C" 
          />
          <div style={styles.gridContainer}>
            {chilliesData.map(item => (
              <MediaCard key={item.id} title={item.title} subtitle={item.subtitle} imageUrl={item.img} />
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
};

const styles = {
  // Cấu trúc khung chính của vùng màu xám mà ta đã làm trước đó
  mainContent: {
    flex: 1,
    backgroundColor: '#06100fea',
    borderRadius: 8,
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    margin: '0 10px', 
    overflowY: 'auto' as const,
    flex: 1, 
    backgroundColor: '#121212', 
    borderRadius: 8, 
    height: '100%', 
    overflowY: 'auto' as const, // Kích hoạt thanh cuộn dọc cho vùng này
    display: 'flex' as const,
    flexDirection: 'column' as const,
    position: 'relative' as const,
  },
  // Khoảng cách bên trong của trang web
  innerContainer: {
    padding: '24px 24px 40px 24px', 
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 40, // Khoảng cách giữa cụm filter và các phần Section
  },
  filtersRow: {
    display: 'flex',
    gap: 8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 24,
  }
};

export default MainContent;