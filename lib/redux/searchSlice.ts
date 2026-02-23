import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface SearchResult {
    trackId?: number;
    collectionId?: number;
    trackName?: string;
    artistName?: string;
    collectionName?: string;
    collectionPrice?: number;
    trackPrice?: number;
    artworkUrl100?: string;
}

interface SearchState {
    results: SearchResult[];
    loading: boolean;
    error: string | null;
    query: string;
    offset: number;
    hasMore: boolean;
    totalResults: number; // Add this
}

const LIMIT = 10;

const initialState: SearchState = {
    results: [],
    loading: false,
    error: null,
    query: '',
    offset: 0,
    hasMore: false,
    totalResults: 0, // Add this
};

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (query: string) => {
        console.log('🔍 Fetching initial results for:', query);
        const response = await fetch(
            `/api/search?term=${encodeURIComponent(query)}&limit=${LIMIT}&offset=0`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        console.log('📦 API Response:', data);
        return {
            results: data.results || [],
            resultCount: data.resultCount || 0,
        };
    }
);

export const fetchMoreResults = createAsyncThunk(
    'search/fetchMoreResults',
    async ({ query, offset }: { query: string; offset: number }) => {
        console.log('📥 Loading more results - offset:', offset);
        const response = await fetch(
            `/api/search?term=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch more results');
        }
        const data = await response.json();
        console.log('📦 Pagination Response:', data);
        return {
            results: data.results || [],
            resultCount: data.resultCount || 0,
        };
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearResults: (state) => {
            state.results = [];
            state.query = '';
            state.offset = 0;
            state.hasMore = false;
            state.totalResults = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Initial search
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload.results;
                state.totalResults = action.payload.resultCount;
                state.query = action.meta.arg;
                state.offset = action.payload.results.length;
                state.hasMore = action.payload.results.length >= LIMIT;
                state.error = null;
                console.log('✅ Initial search complete:', action.payload.results.length, 'results');
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred while searching';
                console.error('❌ Search error:', state.error);
            })
            
            // Load more
            .addCase(fetchMoreResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoreResults.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.results.length > 0) {
                    state.results = [...state.results, ...action.payload.results];
                    state.offset += action.payload.results.length;
                    state.hasMore = action.payload.results.length >= LIMIT;
                } else {
                    state.hasMore = false;
                }
                state.error = null;
                console.log('✅ Loaded more:', action.payload.results.length, 'results. Total:', state.results.length);
            })
            .addCase(fetchMoreResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load more results';
                console.error('❌ Load more error:', state.error);
            });
    },
});

export const { clearResults } = searchSlice.actions;
export const selectSearchResults = (state: { search: SearchState }) => state.search.results;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;
export const selectSearchQuery = (state: { search: SearchState }) => state.search.query;
export const selectSearchOffset = (state: { search: SearchState }) => state.search.offset;
export const selectSearchHasMore = (state: { search: SearchState }) => state.search.hasMore;
export const selectTotalResults = (state: { search: SearchState }) => state.search.totalResults;

export default searchSlice.reducer;