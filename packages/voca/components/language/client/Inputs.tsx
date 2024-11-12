import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

export default function Inputs() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* 왼쪽에 위치한 라벨 */}
      <Typography variant="body1" color="text.primary">
        라벨
      </Typography>

      {/* 텍스트 필드 */}
      <TextField
        variant="outlined"
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
    </Box>
  );
}
