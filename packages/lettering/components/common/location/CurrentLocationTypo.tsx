'use client';
import { UserInfoAtom } from '@/store/userStore/state';
import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  isClickAvailable: boolean;
};

export default function CurrentLocationTypo({
  isClickAvailable = false,
}: Props) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const location = useRecoilValue(UserInfoAtom);
  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(location.address);
  }, [location.address]);

  if (!address) return null;

  const handleRouter = (path: string) => {
    if (!isClickAvailable) return;
    const isWebView = handleNavigation({
      path,
      status: 'forward',
    });

    if (!isWebView) return router.push(`/application/${path}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&:hover': { cursor: isClickAvailable ? 'pointer' : 'text' },
      }}
      onClick={() => handleRouter('address')}
    >
      <Typography variant="body2">
        <Typography component={'span'} variant="body2" color="text.secondary">
          현재 위치{' '}
        </Typography>

        {address}
      </Typography>
      <ArrowDropDownIcon sx={{ fontSize: 24, color: 'common.black' }} />
    </Box>
  );
}
