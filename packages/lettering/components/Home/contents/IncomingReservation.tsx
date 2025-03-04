'use client';
import { Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export default function IncomingReservation() {
  const router = useRouter(); // Next.js 라우터

  const handleRouter = () => {
    let path = 'order-detail';
    const param = {
      orderId: 'adwiuvubdasvdwbi',
    };

    const isWebView = handleNavigation({
      path,
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) {
      const queryParams = new URLSearchParams(param).toString();
      router.push(`/application/${path}?${queryParams}`);
    }
  };

  return (
    <>
      <Box sx={{ ...flex }}>
        <Typography variant="subtitle2">다가오는 예약</Typography>
        <ArrowForwardIosIcon
          sx={{
            fontSize: 16,
            color: 'common.black',
            '&:hover': { cursor: 'pointer' },
          }}
          onClick={handleRouter}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 100,
          padding: 2,
          backgroundImage:
            'linear-gradient(90deg, #FFD3C6, #FFD3C6, #F39E9E, #F39E9E)',
          borderRadius: 1,
          '&:hover': { cursor: 'pointer' },
        }}
        onClick={handleRouter}
      >
        <Box
          component="img"
          src="/cake1.png"
          alt="케이크 이미지"
          sx={{
            width: 60,
            height: 60,
            backgroundColor: 'white',
            borderRadius: '10%', // 동그랗게 만들기
            flexShrink: 0, // 크기 유지
            marginRight: 2,
            objectFit: 'cover', // 이미지가 꽉 차도록
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            flex: 1,
            height: '100%',
          }}
        >
          <Typography variant="subtitle2">스타벅스 강남점</Typography>
          <Typography variant="caption">2025년 3월 1일 14:00</Typography>
        </Box>
      </Box>
    </>
  );
}

const flex = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
};
