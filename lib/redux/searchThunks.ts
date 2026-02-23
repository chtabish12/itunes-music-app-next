import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItunesSearch = createAsyncThunk('itunes/search', async (searchTerm: string) => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=10`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data from iTunes API');
  }
  const data = await response.json();
  return data.results;
});
