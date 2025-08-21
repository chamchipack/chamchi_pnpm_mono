'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const usePrefetchOnView = (
  ref: React.RefObject<HTMLElement>,
  url: string,
) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || (window as any).ReactNativeWebView)
      return;
    if (!ref.current || !url) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        router.prefetch(url);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [url, ref]);
};
