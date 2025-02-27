'use client';

import { useRecentSearches } from '@/store/searchData/useRecentSearches';
import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function RecentSearches() {
  const { searches, addSearch, removeSearch, clearSearches } =
    useRecentSearches();
  const [input, setInput] = useState('');

  // 🔹 검색어 추가 핸들러
  const handleAddSearch = () => {
    if (input.trim() !== '') {
      addSearch(input);
      setInput('');
    }
  };

  return (
    <Box
      sx={{ maxWidth: 400, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
    >
      <Typography variant="h6">🔍 최근 검색어</Typography>

      {/* 🔹 검색어 입력 */}
      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        <TextField
          size="small"
          label="검색어 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSearch()}
        />
        <Button variant="contained" onClick={handleAddSearch}>
          추가
        </Button>
      </Box>

      {/* 🔹 최근 검색어 리스트 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {searches.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'gray' }}>
            최근 검색어가 없습니다.
          </Typography>
        ) : (
          searches.map((search, index) => (
            <Chip
              key={index}
              label={search}
              onDelete={() => removeSearch(search)}
              sx={{ cursor: 'pointer' }}
            />
          ))
        )}
      </Box>

      {/* 🔹 전체 삭제 버튼 */}
      {searches.length > 0 && (
        <Button
          variant="outlined"
          color="error"
          onClick={clearSearches}
          sx={{ mt: 2 }}
        >
          전체 삭제
        </Button>
      )}
    </Box>
  );
}
