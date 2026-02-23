import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('should render error message', () => {
    const errorMsg = 'Failed to fetch results';
    render(<ErrorMessage message={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('should render with error styling', () => {
    const { container } = render(<ErrorMessage message="Test error" />);
    const errorElement = container.firstChild;
    // Check for error styling classes
    expect(errorElement).toHaveClass('bg-red-50');
    expect(errorElement).toHaveClass('border-l-4');
    expect(errorElement).toHaveClass('border-red-500');
  });
});