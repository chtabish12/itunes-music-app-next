import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '@/components/EmptyState';

describe('EmptyState Component', () => {
  it('should render empty state message', () => {
    render(<EmptyState />);
    expect(screen.getByText(/no results yet/i)).toBeInTheDocument();
  });

  it('should display help text', () => {
    render(<EmptyState />);
    expect(screen.getByText(/start searching/i)).toBeInTheDocument();
  });

  it('should display instructions', () => {
    render(<EmptyState />);
    expect(screen.getByText(/use the search bar/i)).toBeInTheDocument();
  });
});