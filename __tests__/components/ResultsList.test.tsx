import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import searchReducer, { SearchState } from '@/lib/redux/searchSlice';
import ResultsList from '@/components/ResultsList';

describe('ResultsList Component', () => {
  let store: ReturnType<typeof configureStore>;

  const mockResults = [
    { trackId: 1, trackName: 'Song 1', artistName: 'Artist 1', artworkUrl100: 'https://example.com/img1.jpg' },
    { trackId: 2, trackName: 'Song 2', artistName: 'Artist 2', artworkUrl100: 'https://example.com/img2.jpg' },
  ];

  const createStore = (preloadedState?: PreloadedState<{ search: SearchState }>) => {
    return configureStore({
      reducer: { search: searchReducer },
      preloadedState,
    });
  };

  it('should render grid of results', () => {
    store = createStore({
      search: {
        results: mockResults,
        loading: false,
        error: null,
        query: 'test',
        offset: 2,
        hasMore: true,
        totalResults: 50,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('should render result cards', () => {
    store = createStore({
      search: {
        results: mockResults,
        loading: false,
        error: null,
        query: 'test',
        offset: 2,
        hasMore: true,
        totalResults: 50,
      },
    });

    render(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );

    const songs = screen.getAllByText(/Song [0-9]/);
    expect(songs.length).toBeGreaterThanOrEqual(2);
  });

  it('should display loading message when loading more', () => {
    store = createStore({
      search: {
        results: mockResults,
        loading: true,
        error: null,
        query: 'test',
        offset: 2,
        hasMore: true,
        totalResults: 50,
      },
    });

    render(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );

    const loadingText = screen.getByText(/loading more results/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('should display "no more results" message when hasMore is false', () => {
    store = createStore({
      search: {
        results: mockResults,
        loading: false,
        error: null,
        query: 'test',
        offset: 50,
        hasMore: false,
        totalResults: 50,
      },
    });

    render(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );

    const noMoreText = screen.getByText(/no more results/i);
    expect(noMoreText).toBeInTheDocument();
  });

  it('should render empty results gracefully', () => {
    store = createStore({
      search: {
        results: [],
        loading: false,
        error: null,
        query: 'test',
        offset: 0,
        hasMore: false,
        totalResults: 0,
      },
    });

    render(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );

    expect(screen.queryByText(/song/i)).not.toBeInTheDocument();
  });
});