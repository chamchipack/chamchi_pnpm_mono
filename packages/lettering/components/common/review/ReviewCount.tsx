'use client';

import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

interface Props {
  count: number;
}

export default function ReviewCount({ count = 0 }: Props) {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/review?id=${'query'}`;
    const isWebView = handleNavigation({ path: 'review', status: 'forward' });

    if (!isWebView) return router.push(path);
  };

  return (
    <Typography
      fontSize={14}
      sx={{ '&:hover': { cursor: 'pointer' } }}
      onClick={handleRouter}
    >
      리뷰{' '}
      <Typography component={'span'} fontSize={14} fontWeight={'bold'}>
        {count}{' '}
      </Typography>
      개
    </Typography>
  );
}
