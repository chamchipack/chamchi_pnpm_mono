import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import NotificationBox from './notification/NotificationBox';
import NotificationContainer from './notification/NotificationContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2.5 }}>
          <HeadComponent isButtonVisable={true} title="알림" />
        </Box>

        <Box sx={{ px: 1.5, my: 2 }}>
          <NotificationContainer />
        </Box>
      </Box>
    </>
  );
}
