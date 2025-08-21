'use client';

import { globalMaxWidth } from '@/config/utils/global';
import { UserInfoAtom } from '@/store/userStore/state';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

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
  const { bottomInsets } = useRecoilValue(UserInfoAtom);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
          width: '100%',
          maxWidth: globalMaxWidth,
          margin: '0 auto',
          height: '100%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          minHeight,
          maxHeight,
          zIndex: 9999,
          paddingBottom: `${bottomInsets || 30}px`,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default React.memo(CommonSwipeableDrawer);
