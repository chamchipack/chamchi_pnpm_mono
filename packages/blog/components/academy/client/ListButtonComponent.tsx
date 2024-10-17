'use client';

import { Box, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import isEditPageon from '../state';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ListButtonComponent() {
  const { data } = useSession();
  const path = usePathname();
  const [, setIsEditPageon] = useRecoilState(isEditPageon);

  if (!data) return <></>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        mt: 3,
      }}
    >
      {/* <Button
        variant="outlined"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          mr: 2,
          borderRadius: 1,
          background: (theme) => `${theme.palette.primary.main}`,
          borderColor: 'primary.main',
          color: 'background.paper',
          '&:hover': {
            borderColor: 'primary.dark',
            background: (theme) => `${theme.palette.primary.dark}`,
          },
        }}
      >
        글 수정하기
      </Button> */}

      <Button
        variant="outlined"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          mr: 2,
          borderRadius: 1,
          background: (theme) => `${theme.palette.info.main}`,
          borderColor: 'info.main',
          color: 'background.paper',
          '&:hover': {
            borderColor: 'info.dark',
            background: (theme) => `${theme.palette.info.dark}`,
          },
        }}
        onClick={() => {
          setIsEditPageon(true);
        }}
      >
        새로운 글 등록
      </Button>
    </Box>
  );
}
