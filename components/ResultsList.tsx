'use client';

import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchHasMore,
  selectSearchQuery,
  selectSearchOffset,
  fetchMoreResults,
} from '@/lib/redux/searchSlice';
import ResultCard from './ResultCard';
import InfiniteScrollLoader from './InfiniteScrollLoader';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function ResultsList() {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectSearchLoading);
  const hasMore = useAppSelector(selectSearchHasMore);
  const query = useAppSelector(selectSearchQuery);
  const offset = useAppSelector(selectSearchOffset);

  const handleLoadMore = useCallback(() => {
    if (query && !loading && hasMore) {
      dispatch(fetchMoreResults({ query, offset }));
    }
  }, [dispatch, query, loading, hasMore, offset]);

  const loaderRef = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    loading,
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <ResultCard
            key={result.trackId ?? result.collectionId ?? `${result.trackName}-${result.artistName}-${index}`}
            result={result}
          />
        ))}
      </div>
      <InfiniteScrollLoader ref={loaderRef} loading={loading} hasMore={hasMore} />
    </div>
  );
}
