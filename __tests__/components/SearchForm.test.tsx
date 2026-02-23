// __tests__/components/SearchForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../../components/SearchForm'; // Adjust the path if necessary.

describe('SearchForm Component', () => {
  test('renders SearchForm component', () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  test('allows user to input search term', () => {
    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  test('calls onSubmit prop when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(handleSubmit).toHaveBeenCalledWith('test');
  });

  // Add more tests as required for other functionalities of SearchForm
});
