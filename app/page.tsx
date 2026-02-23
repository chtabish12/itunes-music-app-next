'use client';

import React from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsList from '@/components/ResultsList';
import { useAppSelector } from '@/lib/redux/hooks';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
} from '@/lib/redux/searchSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const results = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectSearchLoading);
  const error = useAppSelector(selectSearchError);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            iTunes Music App
          </h1>
          <p className="text-gray-600">
            Search for your favorite music, artists, and albums
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <SearchForm />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && results.length === 0 && <EmptyState />}
          {!loading && !error && results.length > 0 && <ResultsList />}
        </div>
      </div>
    </main>
  );
}
