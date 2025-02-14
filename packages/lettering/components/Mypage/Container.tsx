import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import MyPageContainer from './mypage/MyPageContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={false} title="마이 페이지" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <MyPageContainer />
        </Box>
      </Box>
    </>
  );
}
