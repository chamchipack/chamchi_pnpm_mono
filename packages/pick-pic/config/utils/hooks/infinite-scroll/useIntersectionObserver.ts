// hooks/useIntersectionObserver.ts
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLElement>,
  onIntersect: () => void,
  enabled: boolean = true,
  delay = 500,
) => {
  const tickingRef = useRef(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tickingRef.current) {
          tickingRef.current = true;
          onIntersect();
          setTimeout(() => {
            tickingRef.current = false;
          }, delay);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef, enabled, onIntersect, delay]);
};
