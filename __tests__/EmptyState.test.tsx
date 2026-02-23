import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '@/components/EmptyState';

describe('EmptyState Component', () => {
  it('renders empty state message', () => {
    render(<EmptyState />);
    expect(screen.getByText('No Results Yet')).toBeInTheDocument();
  });

  it('displays help text', () => {
    render(<EmptyState />);
    expect(screen.getByText(/Start searching/i)).toBeInTheDocument();
  });
});