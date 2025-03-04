import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import NaverMap from './Map/NaverMap';
import KakaoMap from './Map/KakaoMap';
import CurrentLocationTypo from '../common/location/CurrentLocationTypo';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, height: '100vh' }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={false} title="내 주변" />
        </Box>

        <Box sx={{ px: 2 }}>
          <CurrentLocationTypo isClickAvailable={false} />
        </Box>

        <Box sx={{ my: 2, height: '100%' }}>
          {/* <NaverMap /> */}
          <KakaoMap />
        </Box>
      </Box>
    </>
  );
}
