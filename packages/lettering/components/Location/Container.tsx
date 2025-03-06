import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import NaverMap from './Map/NaverMap';
import KakaoMap from './Map/KakaoMap';
import CurrentLocationTypo from '../common/location/CurrentLocationTypo';

export default function Container() {
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <Box sx={{ px: 2, flexShrink: 0 }}>
          <HeadComponent isLeftButtonVisable={false} title="내 주변" />
        </Box> */}

        {/* <Box sx={{ px: 2, mb: 2, flexShrink: 0 }}>
          <CurrentLocationTypo isClickAvailable={false} />
        </Box> */}

        <Box sx={{ flex: 1 }}>
          {/* <NaverMap /> */}
          <KakaoMap />
          {/* <Box sx={{ height: '100%', background: 'gray' }} /> */}
        </Box>
      </Box>
    </>
  );
}
