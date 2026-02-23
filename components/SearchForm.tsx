'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { fetchSearchResults } from '@/lib/redux/searchSlice';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchResults(query) as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs, artists, or albums..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
      >
        Search
      </button>
    </form>
  );
}
