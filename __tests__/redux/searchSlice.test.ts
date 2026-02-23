import searchReducer, {
  fetchSearchResults,
  fetchMoreResults,
  clearResults,
} from '@/lib/redux/searchSlice';

describe('searchSlice', () => {
  const initialState = {
    results: [],
    loading: false,
    error: null,
    query: '',
    offset: 0,
    hasMore: false,
    totalResults: 0,
  };

  it('should return initial state', () => {
    const state = searchReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle clearResults action', () => {
    const stateWithData = {
      ...initialState,
      results: [{ trackId: 1, trackName: 'Test Song' }],
      query: 'test',
      totalResults: 100,
    };

    const newState = searchReducer(stateWithData, clearResults());
    expect(newState).toEqual(initialState);
  });

  it('should set loading to true on fetchSearchResults.pending', () => {
    const action = {
      type: fetchSearchResults.pending.type,
    };
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchSearchResults.fulfilled', () => {
    const mockResults = [
      { trackId: 1, trackName: 'Song 1', artistName: 'Artist 1' },
      { trackId: 2, trackName: 'Song 2', artistName: 'Artist 2' },
    ];

    const action = {
      type: fetchSearchResults.fulfilled.type,
      payload: {
        results: mockResults,
        resultCount: 50,
      },
      meta: {
        arg: 'taylor swift',
      },
    };

    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockResults);
    expect(state.query).toBe('taylor swift');
    expect(state.offset).toBe(2);
    expect(state.hasMore).toBe(false);
    expect(state.totalResults).toBe(50);
    expect(state.error).toBeNull();
  });

  it('should handle fetchSearchResults.rejected', () => {
    const action = {
      type: fetchSearchResults.rejected.type,
      error: {
        message: 'Network error',
      },
    };

    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchMoreResults.fulfilled by appending results', () => {
    const initialResults = [
      { trackId: 1, trackName: 'Song 1' },
      { trackId: 2, trackName: 'Song 2' },
    ];

    const stateWithResults = {
      ...initialState,
      results: initialResults,
      query: 'taylor',
      offset: 2,
      totalResults: 50,
    };

    const moreResults = [
      { trackId: 3, trackName: 'Song 3' },
      { trackId: 4, trackName: 'Song 4' },
    ];

    const action = {
      type: fetchMoreResults.fulfilled.type,
      payload: {
        results: moreResults,
        resultCount: 50,
      },
    };

    const state = searchReducer(stateWithResults, action);
    expect(state.results.length).toBe(4);
    expect(state.results).toEqual([...initialResults, ...moreResults]);
    expect(state.offset).toBe(4);
  });

  it('should set error on fetchMoreResults.rejected', () => {
    const action = {
      type: fetchMoreResults.rejected.type,
      error: {
        message: 'Failed to load more',
      },
    };

    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should handle hasMore correctly with 10 results', () => {
    const mockResults = Array.from({ length: 10 }, (_, i) => ({
      trackId: i + 1,
      trackName: `Song ${i + 1}`,
    }));

    const action = {
      type: fetchSearchResults.fulfilled.type,
      payload: {
        results: mockResults,
        resultCount: 100,
      },
      meta: { arg: 'test' },
    };

    const state = searchReducer(initialState, action);
    expect(state.hasMore).toBe(true);
  });

  it('should set hasMore to false with less than 10 results', () => {
    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      trackId: i + 1,
      trackName: `Song ${i + 1}`,
    }));

    const action = {
      type: fetchSearchResults.fulfilled.type,
      payload: {
        results: mockResults,
        resultCount: 5,
      },
      meta: { arg: 'test' },
    };

    const state = searchReducer(initialState, action);
    expect(state.hasMore).toBe(false);
  });
});