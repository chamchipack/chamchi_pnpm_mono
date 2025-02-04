'use client';

import { useEffect, useState } from 'react';

const useScrollBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setIsBottom(scrollTop + clientHeight >= scrollHeight - 10); // 오차 범위 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 클린업
  }, []);

  return isBottom;
};

export default useScrollBottom;
