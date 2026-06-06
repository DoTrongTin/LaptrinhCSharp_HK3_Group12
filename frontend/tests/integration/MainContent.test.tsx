import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MainContent from '../../src/components/layout/MainContent';

describe('MainContent integration', () => {
  it('renders filters, sections, and media cards together', () => {
    render(<MainContent />);

    expect(screen.getByRole('button', { name: 'Tất cả' })).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000000',
    });
    expect(
      screen.getByRole('heading', { name: 'Được đề xuất cho hôm nay' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Chillies' })).toBeInTheDocument();
    expect(screen.getByText('2AM')).toBeInTheDocument();
    expect(screen.getByText('JustaTee, BigDaddy')).toBeInTheDocument();
  });

  it('updates the active filter after the user clicks another filter', async () => {
    const user = userEvent.setup();

    render(<MainContent />);

    const allFilter = screen.getByRole('button', { name: 'Tất cả' });
    const musicFilter = screen.getByRole('button', { name: 'Nhạc' });

    await user.click(musicFilter);

    expect(musicFilter).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000000',
    });
    expect(allFilter).toHaveStyle({
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
    });
  });
});
