'use client';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  minHeight?: string;
  maxHeight?: string;
  children: ReactNode;
}

const CommonSwipeableDrawer = ({
  open,
  onClose,
  onOpen,
  minHeight = '50vh',
  maxHeight = '50vh',
  children,
}: Props) => {
  const theme = useTheme();

  // 600px 이하인지 체크
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <SwipeableDrawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',

          ...(isMobile
            ? {
                // 📱 모바일 스타일
                width: '100%',
                maxWidth: 480,
                margin: '0 auto',
                height: '100%',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                minHeight,
                maxHeight,
              }
            : {
                // 💻 웹 스타일
                width: 480,
                height: '100vh',
                borderRadius: 0,
              }),

          zIndex: 9999,
          paddingBottom: isMobile ? 30 : 0,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default React.memo(CommonSwipeableDrawer);
