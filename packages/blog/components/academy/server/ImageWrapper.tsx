import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const ImageWrapper = () => {
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
        이미지 위 텍스트
      </Typography>
    </Box>
  );
};

export default ImageWrapper;
