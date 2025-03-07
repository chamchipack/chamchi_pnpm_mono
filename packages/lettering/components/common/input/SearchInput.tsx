'use client';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import { useRecentSearches } from '@/store/searchData/useRecentSearches';

interface Props {
  isClickAllowed: boolean;
  isRecentSearchAllowed: boolean;
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
  fieldColor?: string;
  handleSearch?: (query: string) => void;
  handleClickRouter?: () => void;
}

export default function SearchInput({
  isClickAllowed = false,
  isRecentSearchAllowed = false,
  placeholder = '',
  query = '',
  setQuery,
  fieldColor = 'grey.100',
  handleSearch = () => {},
  handleClickRouter = () => {},
}: Props) {
  const router = useRouter();

  const { addSearch } = useRecentSearches();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isClickAllowed) return;

    if (event.key === 'Enter') {
      if (query.trim()) {
        if (isRecentSearchAllowed) addSearch(query);
        handleSearch(query);
      }
    }
  };

  const handleRouter = () => {
    if (isClickAllowed) return;
    handleClickRouter();
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || '검색어를 입력하세요'}
        value={query}
        onChange={(e) => {
          if (!isClickAllowed) return;
          setQuery(e.target.value);
        }}
        onBlur={(e) => e.target.blur()}
        onKeyDown={handleKeyDown}
        onClick={handleRouter}
        inputProps={{ maxLength: 50 }}
        sx={{
          fontSize: '16px',
          backgroundColor: fieldColor || 'grey.100',
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
          readOnly: !isClickAllowed,
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
                    // onClick={handleSearch}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* sdf */}
    </Box>
  );
}
