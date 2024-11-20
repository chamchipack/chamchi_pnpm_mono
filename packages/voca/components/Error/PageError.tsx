import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageError() {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.300',
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" color="text.primary">
        ERROR! 잘못된 접근입니다
      </Typography>
    </Box>
  );
}
