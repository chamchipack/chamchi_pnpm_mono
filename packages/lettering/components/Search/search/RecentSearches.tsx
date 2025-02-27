'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecentSearches } from '@/store/searchData/useRecentSearches';
import { formatTimeAgo } from '@/store/searchData/utils';

export default function RecentSearches() {
  const { searches, removeSearch } = useRecentSearches();
  const [clientSearches, setClientSearches] = useState<typeof searches>([]);

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
