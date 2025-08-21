import { useEffect } from 'react';

interface UseInfiniteScrollObserverProps {
  observerRef: React.RefObject<HTMLElement>;
  isValidating: boolean;
  currentPage: number;
  totalPage: number;
  loadMore: () => void;
}

const useInfiniteScrollObserver = ({
  observerRef,
  isValidating,
  currentPage,
  totalPage,
  loadMore,
}: UseInfiniteScrollObserverProps) => {
  useEffect(() => {
    if (currentPage >= totalPage) return; // 모든 페이지 로드 완료 시 중지

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isValidating) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, isValidating, currentPage, totalPage, loadMore]);
};

export default useInfiniteScrollObserver;
