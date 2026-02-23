import searchReducer, { fetchSearchResults, clearResults } from '@/lib/redux/searchSlice';

describe('searchSlice', () => {
    const initialState = {
        results: [],
        loading: false,
        error: null,
    };

    it('should return initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle clearResults', () => {
        const state = { ...initialState, results: [{ trackId: 1, trackName: 'Test' }] };
        expect(searchReducer(state, clearResults())).toEqual(initialState);
    });

    it('should set loading to true when fetchSearchResults is pending', () => {
        const state = searchReducer(initialState, fetchSearchResults.pending('', 'test'));
        expect(state.loading).toBe(true);
    });
});
