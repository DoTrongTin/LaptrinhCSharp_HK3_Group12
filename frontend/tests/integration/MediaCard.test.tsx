import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MediaCard from '../../src/components/ui/maincontent/MediaCard';

describe('MediaCard', () => {
  it('renders media title, subtitle, and image alt text', () => {
    render(
      <MediaCard
        imageUrl="https://example.com/song.jpg"
        title="2AM"
        subtitle="JustaTee, BigDaddy"
      />,
    );

    expect(screen.getByRole('img', { name: '2AM' })).toHaveAttribute(
      'src',
      'https://example.com/song.jpg',
    );
    expect(screen.getByText('2AM')).toBeInTheDocument();
    expect(screen.getByText('JustaTee, BigDaddy')).toBeInTheDocument();
  });

  it('uses a circular image when requested', () => {
    render(
      <MediaCard
        imageUrl="https://example.com/artist.jpg"
        title="Chillies"
        subtitle="Nghệ sĩ"
        isCircleImage
      />,
    );

    expect(screen.getByRole('img', { name: 'Chillies' })).toHaveStyle({
      borderRadius: '50%',
    });
  });
});
