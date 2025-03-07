'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import SellerComponent from './SellerComponent';
import { useRequestDatas } from '@/api/client/client-api';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import useHandleInfiniteScroll from '@/config/utils/hooks/useHandleInfiniteScroll';
import usePaginatedData from '@/config/utils/hooks/usePaginatedData';

export default function ListContainer() {
  const [page, setPage] = useState(1);

  // ✅ 페이지를 반영한 데이터 요청
  const { data, error, isLoading } = useRequestDatas<DataStructureKey.seller>({
    page,
  });

  // ✅ 데이터 관리
  const { items, hasMore } = usePaginatedData<
    StructuredDataSchemas[DataStructureKey.seller]
  >({ data });

  // ✅ 스크롤 감지 및 페이지 증가
  const { lastItemRef } = useHandleInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: (nextPage) => setPage(nextPage),
  });

  return (
    <>
      <Box sx={{ my: 2 }}>
        {items.map((item, index) => (
          <Box
            key={item._id}
            sx={{ my: 4 }}
            ref={index === items.length - 1 ? lastItemRef : null} // ✅ 마지막 아이템 감지
          >
            <SellerComponent {...item} />
          </Box>
        ))}
      </Box>

      {/* ✅ 더 이상 불러올 데이터가 없을 때 메시지 표시 */}
      {!hasMore && (
        <Box sx={{ textAlign: 'center', my: 4, color: 'gray' }}>
          더 이상 불러올 데이터가 없습니다.
        </Box>
      )}
    </>
  );
}
