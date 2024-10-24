'use client';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { kboFont } from 'package/styles/fonts/module';

export default function HeaderContainer() {
  return (
    <Box sx={{ py: 2, px: 2 }}>
      <Typography
        sx={{
          cursor: 'pointer',
          color: (theme) => theme.palette.common.black, // 다크 모드에 맞는 텍스트 색상
          ...kboFont,
        }}
      >
        나만의 단어장 참치
      </Typography>
    </Box>
  );
}
