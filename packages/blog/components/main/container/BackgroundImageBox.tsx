import { Box } from '@mui/material';

export default function BackgroundImageBox() {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '50%' }, // 모바일에서는 0%, 웹에서는 50%
        height: { xs: '0%', md: '90%' },
        display: { xs: 'none', md: 'flex' }, // 모바일: 숨김, 웹: 표시
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Box
        component="img"
        src="/imac+.png"
        alt="iMac"
        sx={{
          maxWidth: '90%', // 웹에서는 90% 크기
          maxHeight: '80%', // 화면 비율 유지
          objectFit: 'contain', // 이미지 비율 유지
        }}
      />
    </Box>
  );
}
