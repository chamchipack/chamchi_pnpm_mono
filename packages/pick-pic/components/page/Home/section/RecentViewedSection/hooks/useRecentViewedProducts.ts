'use client';

import { useProducts } from '@/api/client/product';
import { useViewedProduct } from '@/config/utils/hooks/useViewedProduct';
import { DataStructureKey } from '@/types/schema/default';
import type { ProductSchema } from '@/types/schema/ProductSchema';
import { useMemo } from 'react';

export function useRecentViewedProducts() {
  const { viewedProducts } = useViewedProduct();

  const productIds = useMemo(
    () =>
      viewedProducts?.map(({ productId = '' }) => productId).filter(Boolean) ||
      [],
    [viewedProducts],
  );

  const { data, isLoading, isValidating } =
    useProducts<DataStructureKey.product>(productIds);

  const isLoadingState = isLoading || isValidating;
  const recentViewsArray = data?.data || [];

  const recentViewsMap = new Map(
    recentViewsArray.map((item) => [item._id, item]),
  );

  const sortedRecentViews = productIds
    .map((id) => recentViewsMap.get(id))
    .filter(Boolean) as ProductSchema[];

  return {
    sortedRecentViews,
    isLoading: isLoadingState,
  };
}
