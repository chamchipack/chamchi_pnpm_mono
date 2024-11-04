'use client';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { kboFont } from 'package/styles/fonts/module';

export default function VocaList({ ...props }) {
  const router = useRouter();
  // 단어 종류와 색상 배열
  const categories = [
    { label: '1', color: (theme: any) => theme.palette.primary.main },
    { label: '2', color: (theme: any) => theme.palette.secondary.main },
    { label: '3', color: (theme: any) => theme.palette.info.main },
    { label: '4', color: (theme: any) => theme.palette.success.main },
    { label: '5', color: (theme: any) => theme.palette.warning.main },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: 2,
        borderRadius: 4,
        p: 2,
        background: (theme) => theme.palette.background.default,
      }}
      onClick={() => router.push(`/chamchivoca/${props?.language}/vocabulary`)}
    >
      <Box
        sx={{
          p: 1,
          position: 'absolute',
          top: 8,
          left: 8,
          height: 100,
        }}
      >
        <Typography sx={{ ...kboFont }} color="text.primary">
          단어장
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
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
              height: 100,
            }}
          >
            <Typography sx={{ ...kboFont }}>{category.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
