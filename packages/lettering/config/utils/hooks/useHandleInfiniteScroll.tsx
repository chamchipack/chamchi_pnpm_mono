import { useEffect, useState, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: (nextPage: number) => void;
}

export default function useHandleInfiniteScroll({
  isLoading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollProps) {
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prev) => {
      const nextPage = prev + 1;
      onLoadMore(nextPage);
      return nextPage;
    });
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    if (!hasMore) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }, // 완전히 보일 때만 실행
    );

    const target = lastItemRef.current;
    if (target) observerRef.current.observe(target);

    return () => {
      if (target) observerRef.current?.unobserve(target);
    };
  }, [loadMore, hasMore]);

  return { lastItemRef };
}
