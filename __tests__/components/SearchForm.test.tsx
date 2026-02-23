import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/lib/redux/searchSlice';
import SearchForm from '@/components/SearchForm';

describe('SearchForm Component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { search: searchReducer },
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [], resultCount: 0 }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input and button', () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should update input value on user type', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for/i) as HTMLInputElement;
    await user.type(input, 'taylor swift');

    expect(input.value).toBe('taylor swift');
  });

  it('should handle search submission', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'taylor');
    await user.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('should not submit empty search', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    // Fetch should not be called with empty input
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should submit on Enter key press', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for/i);
    await user.type(input, 'taylor{Enter}');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('should have search button type submit', () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});