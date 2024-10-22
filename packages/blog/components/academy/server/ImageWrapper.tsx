'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { menuItems } from '@/config/menu/menu';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import MenuAtom from '@/components/Layout/Header/client/auth/state';

const ImageWrapper = () => {
  const path = usePathname();
  const [title, setTitle] = useState('');
  const menu = useRecoilValue(MenuAtom);

  useEffect(() => {
    const item = menu.find(({ path: _path }) => path === _path);
    setTitle(item?.label as string);
  }, [menu]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 100,
        background: 'black',
        borderRadius: 4,
        mt: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.7,
        }}
      >
        <Image src="/wave5.jpg" alt="wave" fill objectFit="cover" />
      </Box>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ImageWrapper;
