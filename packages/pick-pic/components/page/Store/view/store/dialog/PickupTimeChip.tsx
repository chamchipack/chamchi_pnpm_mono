'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Pencil } from 'lucide-react';

interface PickupTimeChipProps {
  onClick?: () => void; // 클릭 이벤트 (선택 사항)
  value: string | null;
  isTimeSelectable: boolean;
}

export default function PickupTimeChip({
  onClick,
  value,
  isTimeSelectable,
}: PickupTimeChipProps) {
  const hasValue = Boolean(value);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          color: 'info.main',
          svg: {
            color: 'info.main',
          },
        },
      }}
      onClick={onClick}
    >
      <Pencil size={16} style={{ color: hasValue ? '#666' : '#666' }} />
      <Typography
        variant="body2"
        fontWeight={hasValue ? '600' : '400'}
        color={hasValue ? 'inherit' : 'inherit'}
      >
        {hasValue
          ? dayjs(value).format('YYYY년 MM월 DD일 HH시 mm분')
          : '다른 예약시간선택'}
      </Typography>
    </Box>
  );
}
