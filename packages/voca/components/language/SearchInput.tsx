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

// 예시 검색 데이터
const searchResults: { title: string; id: string }[] = [
  { title: '会う', id: 'wfiugbasdbkl' },
];

export default function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchTerm(inputValue);
    setFilteredResults(
      searchResults.filter((result) =>
        result.title.toLowerCase().includes(inputValue),
      ),
    );
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
          // value가 객체 형태이므로 id를 추출
          if (value && value.id) {
            console.info(value.id);
            router.push(`/chamchivoca/japanese/${value.id}`);
          }
        }}
        options={filteredResults} // 객체 배열을 options으로 전달
        getOptionLabel={(option) => option.title} // 표시할 레이블을 title로 설정
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
            <Typography color="common.black">{option.title}</Typography>
          </Box>
        )}
        noOptionsText="No results found" // 결과 없을 때 표시
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
