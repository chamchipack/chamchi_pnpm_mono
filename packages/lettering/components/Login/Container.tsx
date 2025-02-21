import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import LoginContainer from './LoginContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="로그인" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <LoginContainer />
        </Box>
      </Box>
    </>
  );
}
