import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../redux/searchSlice';

// Initial state for testing
const initialState = {
  query: '',
  results: [],
};

describe('searchSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { search: searchReducer },
      preloadedState: initialState,
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().search;
    expect(state.query).toBe('');
    expect(state.results).toEqual([]);
  });

  it('should handle updating query', () => {
    const query = 'new search query';
    store.dispatch(searchReducer.actions.setQuery(query));
    const state = store.getState().search;
    expect(state.query).toBe(query);
  });

  it('should handle adding search results', () => {
    const results = [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ];
    store.dispatch(searchReducer.actions.setResults(results));
    const state = store.getState().search;
    expect(state.results).toEqual(results);
  });

  it('should handle clearing results', () => {
    store.dispatch(searchReducer.actions.setResults([{ id: 1, name: 'Song 1' }]));
    store.dispatch(searchReducer.actions.clearResults());
    const state = store.getState().search;
    expect(state.results).toEqual([]);
  });
});
