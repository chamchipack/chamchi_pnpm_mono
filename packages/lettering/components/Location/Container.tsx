import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
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
        <Box sx={{ flex: 1 }}>
          <KakaoMap />
        </Box>
      </Box>
    </>
  );
}
