import BottomDrawer from '@/components/common/modal/DrawerForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function StoreInformation() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'; // ✅ html에도 적용
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // ✅ 모바일 스크롤 방지
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

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
}
