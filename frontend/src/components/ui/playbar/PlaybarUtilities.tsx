import React from 'react';
import { ListMusic, Maximize2, Mic2, MonitorSpeaker, PictureInPicture2, Volume2 } from 'lucide-react';
import ProgressBar from './ProgressBar';
import PlaybarIconButton from './PlaybarIconButton';

interface PlaybarUtilitiesProps {
  volume: number;
}

const PlaybarUtilities: React.FC<PlaybarUtilitiesProps> = ({ volume }) => {
  return (
    <section style={styles.utilitySection}>
      <PlaybarIconButton icon={Mic2} title="Lời bài hát" />
      <PlaybarIconButton icon={ListMusic} title="Danh sách phát" />
      <PlaybarIconButton icon={MonitorSpeaker} title="Kết nối thiết bị" />
      <PlaybarIconButton icon={PictureInPicture2} title="Chế độ thu nhỏ" />
      <div style={styles.volumeGroup}>
        <PlaybarIconButton icon={Volume2} title="Âm lượng" />
        <ProgressBar value={volume} width={92} />
      </div>
      <PlaybarIconButton icon={Maximize2} title="Toàn màn hình" size={17} />
    </section>
  );
};

const styles = {
  utilitySection: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
    gap: 12,
    minWidth: 0,
  },
  volumeGroup: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
};

export default PlaybarUtilities;