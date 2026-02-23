import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching search results
export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (query) => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${query}&entity=song`);
    return response.data.results;
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
                state.error = null;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectSearchResults = (state) => state.search.results;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export default searchSlice.reducer;