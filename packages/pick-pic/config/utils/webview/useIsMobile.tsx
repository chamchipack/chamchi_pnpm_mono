'use client';

import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex = /android|iphone|ipad|ipod|windows phone/i;
      setIsMobile(mobileRegex.test(userAgent));
    }
  }, []);

  return isMobile;
}
