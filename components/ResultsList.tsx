'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectSearchQuery,
  selectSearchHasMore,
  selectTotalResults,
  fetchMoreResults,
} from '@/lib/redux/searchSlice';
import ResultCard from './ResultCard';
import InfiniteScrollLoader from './InfiniteScrollLoader';

export default function ResultsList() {
  const results = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectSearchLoading);
  const error = useAppSelector(selectSearchError);
  const query = useAppSelector(selectSearchQuery);
  const hasMore = useAppSelector(selectSearchHasMore);
  const totalResults = useAppSelector(selectTotalResults);
  const dispatch = useAppDispatch();

  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);
  const lastScrollY = useRef(0);

  const loadMore = useCallback(() => {
    if (!isLoadingMore.current && hasMore && query && !loading) {
      isLoadingMore.current = true;
      lastScrollY.current = window.scrollY;
      
      console.log('🔄 Triggering load more at scroll:', lastScrollY.current);
      
      dispatch(
        fetchMoreResults({ 
          query, 
          offset: results.length 
        }) as any
      ).finally(() => {
        isLoadingMore.current = false;
        setTimeout(() => {
          window.scrollTo(0, lastScrollY.current);
        }, 50);
      });
    }
  }, [hasMore, query, results.length, dispatch, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && !isLoadingMore.current) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Trigger 200px before reaching bottom
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, loading, hasMore]);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-semibold">❌ Error</div>
        <p className="text-red-400 text-sm mt-2">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <ResultCard
            key={result.trackId || `${result.collectionId}-${Math.random()}`}
            result={result}
          />
        ))}
      </div>

      {/* Infinite scroll trigger - observer target */}
      <div ref={observerTarget} className="w-full mt-8">
        <InfiniteScrollLoader
          isLoading={loading}
          hasMore={hasMore}
          totalResults={totalResults}
        />
      </div>
    </>
  );
}