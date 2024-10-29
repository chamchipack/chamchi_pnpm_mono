'use client';

import { Box, Divider, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import CommonTitle from '../word/CommonTitle';

export default function Search({ ...props }) {
  return (
    <>
      <SearchInput />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          검색결과
        </Typography>
      </Box>

      {/* <Box
        sx={{
          width: '100%',
          height: 50,
          background: '#e2e2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2,
          borderRadius: 3,
        }}
      >
        <Typography color="text.secondary">조회된 데이터가 없어요!</Typography>
      </Box> */}

      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
            p: 2,
            mb: 2,
          }}
        >
          <Box sx={{ minWidth: 100 }}>
            <CommonTitle
              title={'会う'}
              color="text.primary"
              variant="h3"
              language={props?.language}
              id="wfuias"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography variant="caption" color="info.main">
                あう
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                만나다
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />
      </Box>
    </>
  );
}
