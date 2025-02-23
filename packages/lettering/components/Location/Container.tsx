import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import NaverMap from './Map/NaverMap';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, height: '100vh' }}>
        <Box sx={{ px: 2.5 }}>
          <HeadComponent isLeftButtonVisable={false} title="내 주변" />
        </Box>

        <Box sx={{ my: 2, height: '100%' }}>
          <NaverMap />
        </Box>
      </Box>
    </>
  );
}
