'use client';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

interface Props {
  isAllowed: boolean;
  selectedDate?: string;
  placeholder?: string;
}

export default function SearchInput({
  isAllowed = false,
  selectedDate = '',
  placeholder = '',
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!isAllowed) return;

    if (query.trim()) {
      let path = `/application/store-list?query=${query}&date=${selectedDate}`;
      const isWebView = handleNavigation({
        path: 'store-list',
        status: 'forward',
      });
      if (!isWebView) return router.push(path);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAllowed) return;

    if (event.key === 'Enter') {
      handleSearch();

      if (query.trim()) {
        let path = `/application/store-list?${query}&date=${selectedDate}`;
        const isWebView = handleNavigation({
          path: 'store-list',
          status: 'forward',
        });
        if (!isWebView) return router.push(path);
      }
    }
  };

  const handleRouter = () => {
    if (isAllowed) return;

    let path = '/application/search';
    const isWebView = handleNavigation({
      path: 'search',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || '검색어를 입력하세요'}
        value={query}
        onChange={(e) => {
          if (!isAllowed) return;
          setQuery(e.target.value);
        }}
        onBlur={(e) => e.target.blur()}
        onKeyDown={handleKeyDown} // 엔터 키 감지
        onClick={handleRouter}
        InputProps={{
          readOnly: !isAllowed,
          sx: {
            borderRadius: 30,
            height: 45, // 인풋 높이
            paddingRight: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'common.gray', // 기본 테두리 색상
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'gray', // 호버 시 테두리 색상
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'common.main', // 포커스 시 테두리 색상
              borderWidth: '2px', // 테두리를 두껍게 설정
            },
            '& input::placeholder': {
              fontSize: '14px', // 🔥 placeholder 폰트 크기 조절
              color: 'common.gray', // placeholder 색상 조절
              opacity: 0.7, // placeholder 투명도 설정
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ fontSize: 24, color: 'gray' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
