'use client';

import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';

export default function RouterBack() {
  const router = useRouter();
  return (
    <>
      <IconButton
        sx={{ p: '4px', minWidth: 40 }}
        aria-label="search"
        onClick={() => router.back()}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
      >
        <ArrowBackIosNewIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    </>
  );
}
