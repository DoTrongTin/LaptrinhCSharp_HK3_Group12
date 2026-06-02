import React from 'react';
import SongCard from '../components/ui/SongCard.tsx';
import PlaylistCard from '../components/ui/PlaylistCard.tsx';

const Home: React.FC = () => {
  const recommendedSongs = [
    { id: '1', title: 'Nơi Này Có Anh', artist: 'Sơn Tùng M-TP', duration: 240 },
    { id: '2', title: 'Một Chút "Suy"', artist: 'JVKE, BTS, James Arthur', duration: 200 },
    { id: '3', title: 'Buồn Không Biết Nói với Ai', artist: 'Erik, Phương Ly', duration: 215 },
    { id: '4', title: 'Cô Gái M52', artist: 'Anh Tú ST', duration: 190 },
  ];

  const playlists = [
    { id: '1', name: 'Chill Vibes', description: 'Relax and unwind', songCount: 45 },
    { id: '2', name: 'Top Hits 2024', description: 'Most popular songs', songCount: 52 },
    { id: '3', name: 'Workout Mix', description: 'Get pumped up', songCount: 38 },
    { id: '4', name: 'Late Night Vibes', description: 'For midnight moments', songCount: 41 },
    { id: '5', name: 'Lo-fi Hip Hop', description: 'Study & focus music', songCount: 29 },
    { id: '6', name: 'Summer Playlist', description: 'Beach season hits', songCount: 56 },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Đề xuất dành cho bạn</h1>
        <p style={styles.subtitle}>Khám phá âm nhạc yêu thích</p>
      </div>

      {/* Recommended Songs Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Recommended for You</h2>
        <div style={styles.grid}>
          {recommendedSongs.map((song) => (
            <SongCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              duration={song.duration}
              onPlay={() => console.log(`Playing: ${song.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Playlists Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Playlists</h2>
        <div style={styles.grid}>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              description={playlist.description}
              songCount={playlist.songCount}
              onPlay={() => console.log(`Playing: ${playlist.name}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    height: '100%',
    overflowY: 'auto' as const,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 14,
    margin: 0,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
    margin: '0 0 16px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 16,
  },
};

export default Home;
