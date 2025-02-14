'use client';

import { Box } from '@mui/material';
import TopFrame from './top/TopFrame';
import SearchInput from './top/SearchInput';
import IncomingReservation from './contents/IncomingReservation';
import HomeBanner from './contents/HomeBanner';
import HomePopularList from './contents/HomePopularList';
import HomePopularElements from './contents/HomePopularElements';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

export default function HomeContainer() {
  const size = useClientSize('sm');
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2.5 }}>
          <TopFrame />
        </Box>
        <Box sx={{ px: 2.5, my: 2 }}>
          <SearchInput isAllowed={false} />
        </Box>
        <Box sx={{ px: 2.5, my: 3 }}>
          <IncomingReservation />
        </Box>
        <Box sx={{ my: 3, px: size ? 0 : 2.5 }}>
          <HomeBanner />
        </Box>
        <Box sx={{ pr: size ? 0 : 2.5, pl: 2.5, my: 3 }}>
          <HomePopularElements />
        </Box>

        <Box sx={{ pr: size ? 0 : 2.5, pl: 2.5, my: 3 }}>
          <HomePopularList />
        </Box>
      </Box>
    </>
  );
}
