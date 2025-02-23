'use client';
import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import MyPageContainer from './mypage/MyPageContainer';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export default function Container() {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/setting`;
    const isWebView = handleNavigation({ path: 'setting', status: 'forward' });

    if (!isWebView) return router.push(path);
  };
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent
            isLeftButtonVisable={false}
            title="마이 페이지"
            isRightButtonVisable
            onRightButtonClick={handleRouter}
          />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <MyPageContainer />
        </Box>
      </Box>
    </>
  );
}
