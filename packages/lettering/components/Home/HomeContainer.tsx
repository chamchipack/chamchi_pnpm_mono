import { Box, Typography, Backdrop, Button } from '@mui/material';
import TopFrame from './top/TopFrame';
import IncomingReservation from './contents/IncomingReservation';
import HomeBanner from './contents/HomeBanner';
import HomePopularList from './contents/HomePopularList';
import HomePopularElements from './contents/HomePopularElements';
import WebViewMessageHandler from './WebViewMessageHandler';
import WebviewWrapper from '@/config/utils/webview/WebviewWrapper';
import CompanyInformation from './CompanyInformation';
import InputContainer from './top/InputContainer';

export default function HomeContainer() {
  return (
    <>
      <WebViewMessageHandler />
      <WebviewWrapper>
        <Box sx={{ pb: 1.5 }}>
          <Box
            sx={{
              py: 2,
              backgroundColor: 'common.light',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              // boxShadow: 5,
            }}
          >
            <Box sx={{ px: 2 }}>
              <TopFrame />
            </Box>
            <Box sx={{ px: 2, my: 2 }}>
              <InputContainer />
            </Box>
          </Box>

          {/* <Box sx={{ px: 2, my: 3 }}>
            <Box
              sx={{
                backgroundColor: '#EFEFEF',
                height: 90,
                borderRadius: 2,
              }}
            />
          </Box> */}

          <Box sx={{ my: 3 }}>
            <HomeBanner />
          </Box>

          <Box sx={{ px: 2, my: 4 }}>
            <IncomingReservation />
          </Box>

          <Box sx={{ pr: 0, pl: 2, my: 4 }}>
            <HomePopularList />
          </Box>
          <Box sx={{ pr: 0, pl: 2, my: 4 }}>
            <HomePopularElements />
          </Box>

          <Box sx={{ mt: 3 }}>
            <CompanyInformation />
          </Box>
        </Box>
      </WebviewWrapper>
    </>
  );
}
