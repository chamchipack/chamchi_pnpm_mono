'use client';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Divider,
  Button,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarRatingscore from '@/components/common/rating/StarRatingscore';
import ReviewCount from '@/components/common/review/ReviewCount';

import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function StoreContainer() {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/order?id=${'query'}`;
    const isWebView = handleNavigation({ path: 'order', status: 'forward' });

    if (!isWebView) return router.push(path);
  };
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography fontSize={18} fontWeight="bold">
          스타벅스 강남점
        </Typography>
        <IconButton>
          <FavoriteBorderIcon fontSize="medium" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
          }}
        >
          <StarRatingscore rating={4.5} />
          <Box sx={{ ml: 1 }}>
            <ReviewCount count={180} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ my: 1 }}>
        <Typography fontSize={12} color="text.secondary">
          경기도 성남시 수정구 성남대로 1237번길 8-21
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 1,
        }}
      >
        {/* 왼쪽 버튼: 날짜 선택 */}
        <Button
          sx={{
            width: '40%',
            backgroundColor: 'common.main',
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            '&:hover': {
              backgroundColor: 'common.main',
              opacity: 0.8,
            },
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
          눌러서 날짜 선택
        </Button>

        {/* 오른쪽 버튼: 주문예약 */}
        <Button
          sx={{
            width: '40%',
            backgroundColor: 'common.main',
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            p: 1,
            '&:hover': {
              backgroundColor: 'common.main',
              opacity: 0.8,
            },
          }}
          onClick={handleRouter}
        >
          주문제작
        </Button>
      </Box>
    </Box>
  );
}
