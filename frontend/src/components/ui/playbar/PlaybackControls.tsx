import React from 'react';
import { Pause, Repeat2, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import ProgressBar from './ProgressBar';
import PlaybarIconButton from './PlaybarIconButton';

interface PlaybackControlsProps {
  currentTime: string;
  duration: string;
  progress: number;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({ currentTime, duration, progress }) => {
  return (
    <section style={styles.playerSection}>
      <div style={styles.controlsRow}>
        <PlaybarIconButton icon={Shuffle} title="Trộn bài" variant="control" />
        <PlaybarIconButton icon={SkipBack} title="Bài trước" variant="control" size={20} filled />
        <PlaybarIconButton icon={Pause} title="Tạm dừng" variant="play" size={20} filled />
        <PlaybarIconButton icon={SkipForward} title="Bài tiếp theo" variant="control" size={20} filled />
        <PlaybarIconButton icon={Repeat2} title="Lặp lại" variant="control" />
      </div>

      <div style={styles.progressRow}>
        <span style={styles.timeText}>{currentTime}</span>
        <ProgressBar value={progress} />
        <span style={styles.timeText}>{duration}</span>
      </div>
    </section>
  );
};

const styles = {
  playerSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    minWidth: 0,
  },
  controlsRow: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 18,
  },
  progressRow: {
    width: '100%',
    maxWidth: 620,
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  timeText: {
    color: '#a7a7a7',
    fontSize: 12,
    minWidth: 36,
    textAlign: 'center' as const,
  },
};

export default PlaybackControls;