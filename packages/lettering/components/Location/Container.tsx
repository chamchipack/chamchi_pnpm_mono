'use client';
import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import KakaoMap from './Map/KakaoMap';
import CurrentLocationTypo from '../common/location/CurrentLocationTypo';
import useDetectiveWebview from '@/config/utils/webview/useDetectiveWebview';

export default function Container() {
  const isWebView = useDetectiveWebview();
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          height: isWebView ? '100vh' : '90vh',
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
