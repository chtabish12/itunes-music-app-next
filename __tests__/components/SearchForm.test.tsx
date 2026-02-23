// __tests__/components/SearchForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchForm from '../../components/SearchForm';
import searchReducer from '../../lib/redux/searchSlice';

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({ reducer: { search: searchReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('SearchForm Component', () => {
  test('renders SearchForm component', () => {
    renderWithStore(<SearchForm />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  test('allows user to input search term', () => {
    renderWithStore(<SearchForm />);
    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  test('calls onSubmit prop when form is submitted', () => {
    const handleSubmit = jest.fn();
    renderWithStore(<SearchForm onSubmit={handleSubmit} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('search').querySelector('form')!);
    expect(handleSubmit).toHaveBeenCalledWith('test');
  });

  // Add more tests as required for other functionalities of SearchForm
});
