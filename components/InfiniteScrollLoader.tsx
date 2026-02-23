'use client';

import React from 'react';

interface InfiniteScrollLoaderProps {
  loading: boolean;
  hasMore: boolean;
}

const InfiniteScrollLoader = React.forwardRef<HTMLDivElement, InfiniteScrollLoaderProps>(
  ({ loading, hasMore }, ref) => {
    if (!hasMore && !loading) return null;

    return (
      <div ref={ref} className="flex justify-center py-6">
        {loading && (
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            role="status"
            aria-label="Loading more results"
          >
            <span className="sr-only">Loading more results...</span>
          </div>
        )}
      </div>
    );
  }
);

InfiniteScrollLoader.displayName = 'InfiniteScrollLoader';

export default InfiniteScrollLoader;
