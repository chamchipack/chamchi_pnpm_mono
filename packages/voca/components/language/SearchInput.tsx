'use client';
import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import db from '@/api/module';

const searchResults: { title: string; id: string }[] = [
  { title: '会う', id: 'wfiugbasdbkl' },
];

export default function SearchInput({ ...props }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchTerm(inputValue);

    if (!inputValue) return setFilteredResults([]);

    // API 호출하여 검색 결과 가져오기
    const { data = [] } = await db.search(props?.language, {
      options: {
        query: `(jp~"${inputValue}") || (kana~"${inputValue}") || (ko~"${inputValue}") || (ro~"${inputValue}")`,
      },
    });
    setFilteredResults(data); // 검색 결과를 filteredResults 상태로 설정
  };

  const onClickSearch = () => {
    router.push(`/chamchivoca/japanese/search/?value=${searchTerm}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Autocomplete
        sx={{ width: '100%' }}
        freeSolo
        onChange={(event, value: any) => {
          if (value && value.id) {
            router.push(`/chamchivoca/japanese/${value.id}`);
          }
        }}
        options={filteredResults}
        getOptionLabel={(option) => option.title || option.ko} // 표시할 레이블을 title 또는 ko로 설정
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={handleSearchChange}
            fullWidth
            sx={{
              height: 40,
              backgroundColor: 'grey.200',
              color: 'common.black',
              borderRadius: 4,
              '& .MuiOutlinedInput-root': {
                height: '100%',
                borderRadius: 1,
                border: 'none',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            key={option.id}
            sx={{ background: (theme) => theme.palette.background.default }}
          >
            <Typography color="common.black" sx={{ mr: 1 }}>
              {option.jp}
            </Typography>{' '}
            <Typography color="info.main" variant="caption" sx={{ mr: 2 }}>
              {option.kana}
            </Typography>{' '}
            <Typography color="common.black" sx={{ mr: 2 }}>
              {option.ko}
            </Typography>{' '}
            <Typography variant="caption" color="text.secondary">
              {option.ro}
            </Typography>{' '}
          </Box>
        )}
        noOptionsText={
          filteredResults.length === 0 ? (
            <Typography>'검색 결과가 없습니다.'</Typography>
          ) : (
            <Typography>'검색 결과가 없습니다.'</Typography>
          )
        }
      />

      <IconButton
        sx={{ p: '4px', minWidth: 40 }}
        aria-label="search"
        onClick={onClickSearch}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
      >
        <SearchIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    </Box>
  );
}
