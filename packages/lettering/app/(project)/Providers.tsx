'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Script from 'next/script';
import ThemeProviders from './ThemeProvider';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      {/* <Script
        strategy="afterInteractive"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services,clusterer`}
        onLoad={() => {
          if (window.kakao && window.kakao.maps) {
            console.log('Kakao Maps API loaded');
          }
        }}
      /> */}
      <ThemeProviders>
        <CssBaseline />
        {children}
      </ThemeProviders>
    </RecoilRoot>
  );
}
