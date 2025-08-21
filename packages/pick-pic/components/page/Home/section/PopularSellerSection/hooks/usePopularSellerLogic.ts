import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';

export function usePopularSellerLogic(alias: string) {
  const router = useRouter();
  const resetDate = useResetRecoilState(dateSelectionAtom);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const url = `/store/${alias}`;

  const handleRouter = () => {
    resetDate();
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({ type: 'ALIAS', data: alias }),
      );
    } else {
      router.push(url);
    }
  };

  const handlePrefetch = () => {
    router.prefetch(url);
  };

  useEffect(() => {
    if (!alias) return;
    const img = new Image();
    img.onload = () => setImageSrc(alias);
    img.onerror = () => setImageSrc('');
    img.src = alias;
  }, [alias]);

  return {
    handleRouter,
    handlePrefetch,
    imageSrc,
  };
}
