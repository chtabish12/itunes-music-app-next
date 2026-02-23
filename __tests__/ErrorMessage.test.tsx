import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    const errorText = 'Test error message';
    render(<ErrorMessage message={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it('displays error title', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
