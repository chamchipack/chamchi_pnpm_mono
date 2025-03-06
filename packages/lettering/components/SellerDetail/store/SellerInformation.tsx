import BottomDrawer from '@/components/common/modal/DrawerForm';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useEffect, useState } from 'react';

const SellerInformation = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useLockBodyScroll(open);

  return (
    <>
      <Box
        sx={{
          borderRadius: 12,
          border: '0.5px solid',
          borderColor: 'common.gray',
          px: 1,
        }}
        onClick={() => setOpen(true)}
      >
        <Typography fontSize={12} color="common.black">
          가게 정보
        </Typography>
      </Box>

      <BottomDrawer open={open} onClose={handleClose}>
        <Box></Box>
      </BottomDrawer>
    </>
  );
};

export default React.memo(SellerInformation);
