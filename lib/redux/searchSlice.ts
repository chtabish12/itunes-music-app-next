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
}

const LIMIT = 10;

const initialState: SearchState = {
    results: [],
    loading: false,
    error: null,
    query: '',
    offset: 0,
    hasMore: false,
};

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (query: string) => {
        const response = await fetch(
            `/api/search?term=${encodeURIComponent(query)}&limit=${LIMIT}&offset=0`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        return data.results as SearchResult[];
    }
);

export const fetchMoreResults = createAsyncThunk(
    'search/fetchMoreResults',
    async ({ query, offset }: { query: string; offset: number }) => {
        const response = await fetch(
            `/api/search?term=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch more results');
        }
        const data = await response.json();
        return data.results as SearchResult[];
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
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<SearchResult[]>) => {
            state.results = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
                state.query = action.meta.arg;
                state.offset = action.payload.length;
                state.hasMore = action.payload.length >= LIMIT;
                state.error = null;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred while searching';
            })
            .addCase(fetchMoreResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoreResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = [...state.results, ...action.payload];
                state.offset = state.results.length;
                state.hasMore = action.payload.length >= LIMIT;
                state.error = null;
            })
            .addCase(fetchMoreResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred while searching';
            });
    },
});

export const { clearResults, setQuery, setResults } = searchSlice.actions;
export const selectSearchResults = (state: { search: SearchState }) => state.search.results;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;
export const selectSearchQuery = (state: { search: SearchState }) => state.search.query;
export const selectSearchOffset = (state: { search: SearchState }) => state.search.offset;
export const selectSearchHasMore = (state: { search: SearchState }) => state.search.hasMore;

export default searchSlice.reducer;