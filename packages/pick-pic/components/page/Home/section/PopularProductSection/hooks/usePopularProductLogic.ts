'use client';

import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import type { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

export function usePopularProductLogic(item: Pick<ProductSchema, ProductPick>) {
  const router = useRouter();
  const resetDate = useResetRecoilState(dateSelectionAtom);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const path = `/store/${item?.sellerId?.alias}/${item?._id}`;

  const handleRouter = () => {
    resetDate();

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS_PRODUCT',
          data: `${item?.sellerId?.alias}/${item?._id}`,
        }),
      );
    } else {
      router.push(path);
    }
  };

  const handlePrefetch = () => {
    router.prefetch(path);
  };

  useEffect(() => {
    if (!item?.image || !item.image[0]) return;

    const img = new Image();
    img.onload = () => setImageSrc(item.image[0]);
    img.onerror = () => setImageSrc('');
    img.src = item.image[0];
  }, [item?.image]);

  return {
    handleRouter,
    handlePrefetch,
    imageSrc,
  };
}
