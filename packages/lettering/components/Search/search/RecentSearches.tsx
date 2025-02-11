'use client';
import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function RecentSearches() {
  const [searches, setSearches] = useState([
    { term: '아이폰 15', timeAgo: '2시간 전' },
    { term: '맥북 프로', timeAgo: '5시간 전' },
    { term: '닌텐도 스위치', timeAgo: '10시간 전' },
  ]);

  const handleRemove = (index: number) => {
    setSearches((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: '100%' }}>
      {searches.map((search, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // borderBottom: '1px solid #ddd',
          }}
        >
          {/* 검색어 */}
          <Typography
            sx={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}
          >
            {search.term}
          </Typography>

          {/* 우측: 시간 & 닫기 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 12, color: 'gray' }}>
              {search.timeAgo}
            </Typography>
            <IconButton size="small" onClick={() => handleRemove(index)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* 검색어가 없을 때 */}
      {searches.length === 0 && (
        <Typography sx={{ textAlign: 'center', color: 'gray', mt: 2 }}>
          최근 검색어가 없습니다.
        </Typography>
      )}
    </Box>
  );
}
