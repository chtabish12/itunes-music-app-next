import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function useInfiniteScroll({ onLoadMore, hasMore, loading }: UseInfiniteScrollOptions) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, loading]
  );

  useEffect(() => {
    const element = loaderRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  return loaderRef;
}
