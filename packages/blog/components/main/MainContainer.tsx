'use client';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function MainContainer() {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          minWidth: '100%',
          height: '250px',
          backgroundImage: 'url(/main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.6,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 4,
        }}
      >
        <motion.div>
          <Typography
            variant="body1"
            sx={{ color: 'black', fontSize: '18px', fontStyle: 'italic' }}
          >
            '기록하기를 좋아하라, 쉬지말고 기록해라, 생각이 떠오르면 수시로
            기록하라, 기억은 흐려지고 생각은 사라진다. 머리를 믿지 말고 손을
            믿어라.'
          </Typography>
        </motion.div>

        <Typography
          variant="caption"
          sx={{
            color: 'black',
            fontSize: '16px',
            fontWeight: 'light',
            mt: 3,
          }}
        >
          - 다산 기념관 비문 -
        </Typography>
      </Box>
    </Box>
  );
}
