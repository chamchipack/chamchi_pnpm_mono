'use client';
import React, { useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

export default function ExampleSearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const options = [
    { jp: '家', kana: 'いえ', ko: '집', ro: 'ie', id: '1' },
    { jp: '本', kana: 'ほん', ko: '책', ro: 'hon', id: '2' },
    { jp: '学校', kana: 'がっこう', ko: '학교', ro: 'gakkou', id: '3' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Autocomplete
        sx={{ width: '100%' }}
        freeSolo
        options={options}
        getOptionLabel={(option) => option.jp || ''}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            sx={{
              backgroundColor: 'grey.200',
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            <strong>{option.jp}</strong> - {option.kana} / {option.ko} /{' '}
            {option.ro}
          </Box>
        )}
        noOptionsText="No results found"
      />
    </Box>
  );
}
