'use client';
import { Box, Typography } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';

export default function WordList() {
  // 단어 종류와 색상 배열
  const categories = [
    { label: '동사', color: (theme: any) => theme.palette.primary.main },
    { label: '명사', color: (theme: any) => theme.palette.secondary.main },
    { label: '형용사', color: (theme: any) => theme.palette.info.main },
    { label: '부사', color: (theme: any) => theme.palette.success.main },
    { label: '기타', color: (theme: any) => theme.palette.warning.main },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around', // 시작 부분부터 정렬
        gap: 2,
        p: 2,
        overflowX: 'auto', // 가로 스크롤 허용
        width: '100%',
        paddingLeft: '16px', // 컨테이너의 좌측 여백 추가
      }}
    >
      {categories.map((category, index) => (
        <Box
          key={category.label}
          sx={{
            cursor: 'pointer',
            backgroundColor: category.color,
            color: 'white',
            borderRadius: 2,
            minWidth: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            ml: 1,
            height: 50,
          }}
        >
          <Typography sx={{ ...kboFont }}>{category.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
