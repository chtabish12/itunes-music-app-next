import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { setQuery, setResults, clearResults } from '@/lib/redux/searchSlice';

type TestStore = ReturnType<typeof configureStore<{ search: ReturnType<typeof searchReducer> }>>;

describe('searchSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { search: searchReducer },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().search;
    expect(state.query).toBe('');
    expect(state.results).toEqual([]);
  });

  it('should handle updating query', () => {
    const query = 'new search query';
    store.dispatch(setQuery(query));
    const state = store.getState().search;
    expect(state.query).toBe(query);
  });

  it('should handle adding search results', () => {
    const results = [
      { trackId: 1, trackName: 'Song 1' },
      { trackId: 2, trackName: 'Song 2' },
    ];
    store.dispatch(setResults(results));
    const state = store.getState().search;
    expect(state.results).toEqual(results);
  });

  it('should handle clearing results', () => {
    store.dispatch(setResults([{ trackId: 1, trackName: 'Song 1' }]));
    store.dispatch(clearResults());
    const state = store.getState().search;
    expect(state.results).toEqual([]);
  });
});
