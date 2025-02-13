'use client';

import { handleNavigation } from '@/config/navigation';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProfileSection() {
    const router = useRouter();

    const handleRouter = () => {
      let path = `/application/profile?id=${'query'}`;
      const isWebView = handleNavigation({ path: '', status: 'forward' });
  
      if (!isWebView) return router.push(path);
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="img"
          src="/user.png"
          alt="User Profile"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Box>
          <Typography fontSize={16} fontWeight="bold">
            닉네임
          </Typography>
          <Typography fontSize={14} sx={{ color: 'common.gray' }} onClick={handleRouter}>
            자세히 보기
          </Typography>
        </Box>
      </Box>
    );
  }