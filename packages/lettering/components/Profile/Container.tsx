// 'use client';
import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import ProfileContainer from './ProfileContainer';
// import { useEffect, useState } from 'react';

export default function Container() {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ px: 2 }}>
        <HeadComponent isButtonVisable={true} title="프로필" />
      </Box>

      <Box sx={{ px: 2.5 }}>
        <ProfileContainer />
      </Box>
    </Box>
  );
}
