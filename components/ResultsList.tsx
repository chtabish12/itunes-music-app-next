'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectSearchQuery,
  selectSearchHasMore,
  fetchMoreResults,
} from '@/lib/redux/searchSlice';
import ResultCard from './ResultCard';

export default function ResultsList() {
  const results = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectSearchLoading);
  const error = useAppSelector(selectSearchError);
  const query = useAppSelector(selectSearchQuery);
  const hasMore = useAppSelector(selectSearchHasMore);
  const dispatch = useAppDispatch();

  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);
  const lastScrollY = useRef(0);

  const loadMore = useCallback(() => {
    if (!isLoadingMore.current && hasMore && query && !loading) {
      isLoadingMore.current = true;
      lastScrollY.current = window.scrollY; // Save scroll position
      
      console.log('🔄 Triggering load more at scroll:', lastScrollY.current);
      
      dispatch(
        fetchMoreResults({ 
          query, 
          offset: results.length 
        }) as any
      ).finally(() => {
        isLoadingMore.current = false;
        // Restore scroll position after render
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
      { threshold: 0.1, rootMargin: '100px' }
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
    return <div className="text-red-500">Error: {error}</div>;
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

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="py-8 text-center w-full">
        {loading && (
          <div className="text-gray-600 text-lg">⏳ Loading more results...</div>
        )}
        {!loading && !hasMore && results.length > 0 && (
          <div className="text-gray-500 text-sm">✅ No more results</div>
        )}
      </div>
    </>
  );
}