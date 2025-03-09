'use client';

import { Box, CircularProgress } from '@mui/material';
import SellerComponent from './SellerComponent';
import { useEffect, useRef } from 'react';
import { useRequestDatasInfinite } from '@/api/client/client-api';
import { DataStructureKey } from '@/types/schema/default';
import useInfiniteScrollObserver from '@/config/utils/hooks/useInfiniteScrollObserver';

export default function ListContainer() {
  const { data, size, setSize, isValidating } =
    useRequestDatasInfinite<DataStructureKey.seller>();
  const items = data ? data.flatMap((page) => page.data.items) : [];
  const observerRef = useRef(null);
  const totalPage = data?.[0]?.data?.page?.totalPage || 1;
  const currentPage = size;

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  return (
    <Box sx={{ my: 2 }}>
      {items.map((item, index) => (
        <Box key={item._id} sx={{ my: 4 }}>
          <SellerComponent {...item} />
        </Box>
      ))}

      {currentPage < totalPage && (
        <Box
          ref={observerRef}
          sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
        >
          {isValidating && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}
