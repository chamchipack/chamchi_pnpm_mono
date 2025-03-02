'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecentSearches } from '@/store/searchData/useRecentSearches';
import { formatTimeAgo } from '@/store/searchData/utils';
import { useRecoilState } from 'recoil';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';

export default function RecentSearches() {
  const router = useRouter();

  const { searches, removeSearch } = useRecentSearches();
  const [clientSearches, setClientSearches] = useState<typeof searches>([]);

  const [selectedDate] = useRecoilState(dateSelectionAtom);

  const handleRouter = (query: string) => {
    const param: { query: string; date?: Dayjs } = { query };

    if (selectedDate) {
      param.date = selectedDate;
    }

    // ✅ selectedDate가 있을 때만 `date`를 포함
    let path = `/application/seller-list?query=${query}`;
    if (selectedDate) {
      path += `&date=${selectedDate}`;
    }

    const isWebView = handleNavigation({
      path: 'seller-list',
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) return router.push(path);
  };

  // ✅ 클라이언트 사이드에서만 상태 적용
  useEffect(() => {
    setClientSearches(searches);
  }, [searches]);

  return (
    <Box sx={{ width: '100%' }}>
      {clientSearches.length > 0 ? (
        clientSearches.map(({ query, timestamp }, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            {/* 검색어 */}
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}
              onClick={() => handleRouter(query)}
            >
              {query}
            </Typography>

            {/* 시간 & 삭제 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: 12, color: 'gray' }}>
                {formatTimeAgo(timestamp)}
              </Typography>
              <IconButton size="small" onClick={() => removeSearch(query)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', color: 'gray', mt: 2 }}>
          최근 검색어가 없습니다.
        </Typography>
      )}
    </Box>
  );
}
