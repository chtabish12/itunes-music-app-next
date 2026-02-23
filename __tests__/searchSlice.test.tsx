import searchReducer, { fetchSearchResults, clearResults } from '@/lib/redux/searchSlice';

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
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearResults', () => {
    const state = { ...initialState, results: [{ trackId: 1, trackName: 'Test' }], query: 'test', totalResults: 100 };
    expect(searchReducer(state, clearResults())).toEqual(initialState);
  });

  it('should set loading to true when fetchSearchResults is pending', () => {
    const action = { type: fetchSearchResults.pending.type };
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle fetchSearchResults fulfilled', () => {
    const results = [
      { trackId: 1, trackName: 'Song 1', artistName: 'Artist 1' },
      { trackId: 2, trackName: 'Song 2', artistName: 'Artist 2' },
    ];
    const action = {
      type: fetchSearchResults.fulfilled.type,
      payload: { results, resultCount: 50 },
      meta: { arg: 'test' },
    };
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.results).toEqual(results);
    expect(state.query).toBe('test');
    expect(state.totalResults).toBe(50);
  });

  it('should handle fetchSearchResults rejected', () => {
    const action = {
      type: fetchSearchResults.rejected.type,
      error: { message: 'Network error' },
    };
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
  });
});