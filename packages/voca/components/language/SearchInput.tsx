'use client';
import React, { useState } from 'react';
import { TextField, Autocomplete, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// 예시 검색 데이터
const searchResults = [
  { title: 'Apple' },
  { title: 'Banana' },
  { title: 'Cherry' },
  { title: 'Date' },
  { title: 'Elderberry' },
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

  return (
    <Autocomplete
      freeSolo
      onChange={(event, value) => {
        router.push(`/chamchivoca/japanese/${value}`);
      }}
      sx={{ background: (theme) => theme.palette.background.default }}
      options={filteredResults.map((result) => result.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
          sx={{
            backgroundColor: 'grey.200',
            color: 'common.black',
            borderRadius: 4,
            '& .MuiOutlinedInput-root': {
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
          key={option}
          sx={{ background: (theme) => theme.palette.background.default }}
        >
          <Typography color="common.black">{option}</Typography>
        </Box>
      )}
      getOptionLabel={(option) => option}
      noOptionsText="No results found" // 결과 없을 때 표시
    />
  );
}
