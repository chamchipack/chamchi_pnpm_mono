'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  index: number;
}

export default function Chip({ name = '', index }: Props) {
  if (!name) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // 초기 상태: 투명 & 살짝 아래 위치
      whileInView={{ opacity: 1, y: 0 }} // 화면에 들어오면: 점점 나타남
      viewport={{ once: true }} // 한 번만 실행
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.3 }} // index마다 지연
    >
      <Box
        sx={{
          paddingBlock: 0.5,
          paddingX: 2,
          borderRadius: 30,
          background: 'white',
          marginRight: 1,
          marginBottom: 1,
        }}
      >
        <Typography fontSize={14} fontWeight="bold" color="gray">
          {name}
        </Typography>
      </Box>
    </motion.div>
  );
}
