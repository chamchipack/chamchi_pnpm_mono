'use client';

import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchFilterAtom } from './state';

export default function SearchFilter() {
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const [filterState, setFilterState] = useRecoilState(SearchFilterAtom);

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' === e.key) {
      e.preventDefault();
      setFilterState({
        'markdown_title.like': searchKeywordRef.current?.value,
      });
    }
  };

  useEffect(() => {
    if (filterState['markdown_title.like'])
      setFilterState((prev) => ({
        ...prev,
        'markdown_title.like': '',
      }));
  }, []);
  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        width: '100%',
        padding: '1px 2px',
        height: 40,
      }}
    >
      <InputBase
        inputRef={searchKeywordRef}
        sx={{ ml: 1, flex: 1 }}
        placeholder="제목을 입력해주세요."
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleKeyDownSearch}
      />
      <IconButton
        sx={{ p: '4px' }}
        aria-label="search"
        onClick={() =>
          setFilterState({
            ...filterState,
            'markdown_title.like': searchKeywordRef.current?.value,
          })
        }
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
      >
        <SearchIcon sx={{ color: 'text.primary' }} />{' '}
      </IconButton>
    </Box>
  );
}
