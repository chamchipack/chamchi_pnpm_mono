'use client';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { useRecentSearches } from '@/store/searchData/useRecentSearches';

interface Props {
  isAllowed: boolean;
  selectedDate?: string;
  placeholder?: string;
  queryInput?: string;
}

export default function SearchInput({
  isAllowed = false,
  selectedDate = '',
  placeholder = '',
  queryInput = '',
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState(queryInput);

  const { addSearch } = useRecentSearches();

  const handleSearch = () => {
    if (!isAllowed) return;

    // if (query.trim()) {
    //   console.log(query);

    //   let path = 'store-list';

    //   const param = {
    //     query,
    //     date: selectedDate,
    //   };

    //   const isWebView = handleNavigation({
    //     path: 'store-list',
    //     status: 'forward',
    //     params: JSON.stringify(param),
    //   });

    //   if (!isWebView) {
    //     const queryParams = new URLSearchParams(param).toString();
    //     router.push(`/application/${path}?${queryParams}`);
    //   }
    // }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAllowed) return;

    if (event.key === 'Enter') {
      handleSearch();

      if (query.trim()) {
        addSearch(query);

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
        onKeyDown={handleKeyDown}
        onClick={handleRouter}
        inputProps={{ maxLength: 50 }}
        sx={{
          fontSize: '16px',
          backgroundColor: 'grey.100',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // ✅ 완전히 보더 제거
            },
            '&:hover fieldset': {
              border: 'none', // ✅ 호버 시에도 보더 없음
            },
            '&.Mui-focused fieldset': {
              border: 'none', // ✅ 포커스 시에도 보더 없음
            },
          },
        }}
        InputProps={{
          readOnly: !isAllowed,
          sx: {
            borderRadius: 3,
            height: 45,
            paddingRight: 1,
            '& input::placeholder': {
              fontSize: '14px',
              opacity: 0.7,
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                {query ? (
                  <CloseIcon
                    sx={{
                      fontSize: 24,
                      color: 'gray',
                      background: 'white',
                      borderRadius: 50,
                      p: '2px',
                    }}
                    onClick={() => setQuery('')}
                  />
                ) : (
                  <SearchIcon
                    sx={{
                      fontSize: 24,
                      color: 'gray',
                    }}
                    onClick={handleSearch}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
