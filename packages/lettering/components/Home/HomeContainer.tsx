'use client';

import { Box } from '@mui/material';
import TopFrame from './top/TopFrame';
import SearchInput from './top/SearchInput';
import IncomingReservation from './contents/IncomingReservation';
import HomeBanner from './contents/HomeBanner';
import HomePopularList from './contents/HomePopularList';
import HomePopularElements from './contents/HomePopularElements';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import { useEffect, useState } from 'react';

export default function HomeContainer() {
  const size = useClientSize('sm');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log(userAgent);
    setIsMobile(/iphone|ipad|ipod|android/i.test(userAgent));
  }, []);

  return (
    <>
      <Box sx={{ py: 1.5, pb: 0 }}>
        <Box sx={{ px: 2.5 }}>
          <TopFrame />
        </Box>
        <Box sx={{ px: 2.5, my: 2 }}>
          <SearchInput
            isAllowed={false}
            placeholder="예약가능한 곳을 찾아보세요!"
          />
        </Box>
        <Box sx={{ px: 2.5, my: 3 }}>
          <IncomingReservation />
        </Box>
        <Box sx={{ my: 3 }}>
          <HomeBanner />
        </Box>
        <Box sx={{ pr: isMobile ? 0 : 2.5, pl: 2.5, my: 3 }}>
          <HomePopularElements />
        </Box>

        <Box sx={{ pr: isMobile ? 0 : 2.5, pl: 2.5, my: 3 }}>
          <HomePopularList />
        </Box>
      </Box>
    </>
  );
}
