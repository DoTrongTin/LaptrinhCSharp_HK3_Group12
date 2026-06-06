import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import FilterPill from './FilterPill';

describe('FilterPill', () => {
  it('renders an active filter with selected styles', () => {
    render(<FilterPill label="Nhạc" isActive />);

    const button = screen.getByRole('button', { name: 'Nhạc' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000000',
    });
  });

  it('calls onClick when the user selects it', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<FilterPill label="Podcasts" onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: 'Podcasts' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
