'use client';

import { Box, Typography, Backdrop, Button } from '@mui/material';
import TopFrame from './top/TopFrame';
import SearchInput from './top/SearchInput';
import IncomingReservation from './contents/IncomingReservation';
import HomeBanner from './contents/HomeBanner';
import HomePopularList from './contents/HomePopularList';
import HomePopularElements from './contents/HomePopularElements';
import { useEffect, useState } from 'react';
import WebViewMessageHandler from './WebViewMessageHandler';
import WebviewWrapper from '@/config/utils/webview/WebviewWrapper';
import CompanyInformation from './CompanyInformation';

export default function HomeContainer() {
  const [isMobile, setIsMobile] = useState(false);

  const [isWebView, setIsWebView] = useState(false); // ✅ 웹뷰 여부 추가

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobile(/iphone|ipad|ipod|android/i.test(userAgent));
    }
  }, []);

  return (
    <>
      <WebViewMessageHandler />
      <WebviewWrapper>
        <Box sx={{ py: 1.5, pb: 0 }}>
          <Box sx={{ px: 2 }}>
            <TopFrame />
          </Box>
          <Box sx={{ px: 2, my: 2 }}>
            <SearchInput
              isAllowed={false}
              placeholder="예약가능한 곳을 찾아보세요!"
            />
          </Box>
          <Box sx={{ px: 2, my: 3 }}>
            <IncomingReservation />
          </Box>
          <Box sx={{ my: 3 }}>
            <HomeBanner />
          </Box>
          <Box sx={{ pr: isMobile ? 0 : 2, pl: 2, my: 3 }}>
            <HomePopularElements />
          </Box>
          <Box sx={{ pr: isMobile ? 0 : 2, pl: 2, my: 3 }}>
            <HomePopularList />
          </Box>

          <Box sx={{ mt: 3 }}>
            <CompanyInformation />
          </Box>
        </Box>
      </WebviewWrapper>
    </>
  );
}
