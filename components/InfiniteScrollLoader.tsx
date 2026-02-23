'use client';

import React from 'react';

interface InfiniteScrollLoaderProps {
  isLoading: boolean;
  hasMore: boolean;
  totalResults: number;
}

export default function InfiniteScrollLoader({
  isLoading,
  hasMore,
  totalResults,
}: InfiniteScrollLoaderProps) {
  if (!hasMore && totalResults === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center py-8">
      {isLoading && (
        <div className="flex flex-col items-center gap-3">
          {/* Spinner */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Loading more results...</p>
        </div>
      )}

      {!isLoading && !hasMore && totalResults > 0 && (
        <div className="text-center">
          <p className="text-gray-500 text-sm">✓ No more results to load</p>
        </div>
      )}

      {!isLoading && !hasMore && totalResults === 0 && (
        <div className="text-center">
          <p className="text-gray-400 text-sm">No results found</p>
        </div>
      )}
    </div>
  );
}
