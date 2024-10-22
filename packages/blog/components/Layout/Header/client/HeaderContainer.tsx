'use client';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ToggleButton from './ToggleButton';
import { useRecoilValue } from 'recoil';
import ToggleStateAtom from '../state';
import MenuList from './MenuList';
import AuthComponent from './AuthComponent';
import { kboFont } from 'package/styles/fonts/module';
import { useRouter } from 'next/navigation';

const HeaderContainer = () => {
  const router = useRouter();
  const toggle = useRecoilValue(ToggleStateAtom);

  return (
    <>
      <Box
        component={motion.div}
        initial={{ height: 60 }}
        animate={{ height: toggle ? 220 : 60 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          background: 'white',
          borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
          overflow: 'hidden',
        }}
      >
        {/* 상단 고정 영역 */}
        <Box
          sx={{
            width: '100%',
            height: 60, // 항상 고정된 높이
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
          }}
        >
          <div style={{ ...kboFont, marginLeft: 10 }}>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/pinetree')}
            >
              블로그 참치
            </p>
          </div>

          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <AuthComponent />
            <ToggleButton />
          </Box>
        </Box>

        {/* 메뉴 리스트 영역 */}
        <Box
          component={motion.div}
          initial={{ height: 0 }}
          animate={{ height: toggle ? '100%' : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          sx={{
            overflow: 'hidden',
          }}
        >
          {toggle && <MenuList />}
        </Box>
      </Box>
    </>
  );
};

export default HeaderContainer;
