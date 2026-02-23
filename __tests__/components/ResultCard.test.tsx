import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultCard from '@/components/ResultCard';

describe('ResultCard Component', () => {
  const mockResult = {
    trackId: 12345,
    trackName: 'Love Story',
    artistName: 'Taylor Swift',
    collectionName: 'Fearless',
    artworkUrl100: 'https://example.com/artwork.jpg',
    trackPrice: 1.29,
    collectionPrice: 11.99,
  };

  it('should render track name', () => {
    render(<ResultCard result={mockResult} />);
    expect(screen.getByText('Love Story')).toBeInTheDocument();
  });

  it('should render artist name', () => {
    render(<ResultCard result={mockResult} />);
    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
  });

  it('should render collection name', () => {
    render(<ResultCard result={mockResult} />);
    expect(screen.getByText('Fearless')).toBeInTheDocument();
  });

  it('should render track price', () => {
    render(<ResultCard result={mockResult} />);
    expect(screen.getByText('$1.29')).toBeInTheDocument();
  });

  it('should render artwork image', () => {
    render(<ResultCard result={mockResult} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should handle missing optional fields', () => {
    const minimalResult = {
      trackId: 12345,
    };

    render(<ResultCard result={minimalResult as any} />);
    expect(screen.queryByText('Love Story')).not.toBeInTheDocument();
  });

  it('should render card container', () => {
    const { container } = render(<ResultCard result={mockResult} />);
    const card = container.querySelector('[class*="result-card"]');
    expect(card).toBeInTheDocument();
  });
});