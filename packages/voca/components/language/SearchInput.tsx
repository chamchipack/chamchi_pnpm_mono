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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import db from '@/api/module';

type Address = 'japanese';

interface Props {
  language: Address;
}

export default function SearchInput({ ...props }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

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
      <IconButton
        sx={{ p: '4px', minWidth: 40 }}
        aria-label="search"
        onClick={() => router.back()}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
      >
        <ArrowBackIosNewIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <Autocomplete
        sx={{ width: '100%' }}
        freeSolo
        onChange={(event, value: any) => {
          if (value && value.id) {
            router.push(`/chamchivoca/japanese/${value.id}`);
          }
        }}
        options={filteredResults}
        getOptionLabel={(option) => option.jp || ''}
        filterOptions={(options) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault(); // 기본 Enter 동작 방지
                onClickSearch(); // Enter로 검색 실행
              }
            }}
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
