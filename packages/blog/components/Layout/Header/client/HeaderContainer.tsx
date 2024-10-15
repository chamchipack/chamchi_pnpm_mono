'use client';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import ToggleButton from './ToggleButton';
import { useRecoilValue } from 'recoil';
import ToggleStateAtom from '../state';
import MenuList from './MenuList';

const HeaderContainer = () => {
  const toggle = useRecoilValue(ToggleStateAtom);

  return (
    <Box
      component={motion.div}
      initial={{ height: 60 }}
      animate={{ height: toggle ? 140 : 60 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      sx={{
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        px: 1,
        position: 'fixed',
        overflow: 'hidden',
        borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
        zIndex: 1000,
        background: 'white',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div />

        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <ToggleButton />
        </Box>
      </Box>
      {toggle && <MenuList />}
    </Box>
  );
};

export default HeaderContainer;
