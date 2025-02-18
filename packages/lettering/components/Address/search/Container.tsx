'use client';
import { Box } from '@mui/material';
import HeadComponent from '../../common/HeadComponent';
import SearchInput from '../SearchInput';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="주소 찾기" />
        </Box>

        <Box sx={{ px: 2 }}>
          <SearchInput isUsable={true} handleRouter={() => {}} />
        </Box>
      </Box>
    </>
  );
}
