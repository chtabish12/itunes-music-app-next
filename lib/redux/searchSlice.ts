import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
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
    query: string;
    results: SearchResult[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    results: [],
    loading: false,
    error: null,
};

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (query: string) => {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song,album,artist&limit=20`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        return data.results;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<SearchResult[]>) => {
            state.results = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<SearchResult[]>) => {
                state.loading = false;
                state.results = action.payload;
                state.error = null;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred while searching';
            });
    },
});

export const { setQuery, setResults, clearResults } = searchSlice.actions;
export const selectSearchResults = (state: { search: SearchState }) => state.search.results;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;

export default searchSlice.reducer;