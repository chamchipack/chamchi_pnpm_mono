'use client';
import SearchInput from '@/components/common/input/SearchInput';
import CurrentLocationTypo from '@/components/common/location/CurrentLocationTypo';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function Container() {
  const [query, setQuery] = useState('');
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
        p: 1,
      }}
    >
      <SearchInput
        isClickAllowed
        isRecentSearchAllowed={false}
        query={query}
        setQuery={setQuery}
        handleSearch={() => {}}
      />
      <Box sx={{ mt: 1 }}>
        <CurrentLocationTypo isClickAvailable={true} />
      </Box>
    </Box>
  );
}
