'use client';
import { Box } from '@mui/material';
import InputContainer from '../Search/search/InputContainer';
import ListContainer from './list/ListContainer';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

export default function Container() {
  const size = useClientSize('sm');
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <InputContainer isFilterVisable={true} />
        </Box>
        <Box sx={{ pr: size ? 0 : 2.5, pl: 2.5, my: 4 }}>
          <ListContainer />
        </Box>
      </Box>
    </>
  );
}
