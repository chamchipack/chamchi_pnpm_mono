'use client';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

interface ListFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  value: string;
  setValue: (value: string) => void;
  items: string[];
}

export default function ListFilterDrawer({
  open,
  onClose,
  value,
  setValue,
  items,
}: ListFilterDrawerProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Drawer
      anchor="bottom" // ✅ 아래에서 위로 올라오는 Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          maxHeight: '50vh', // ✅ 최대 높이 설정
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            // onClick={onClick}
            sx={{
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'common.black',
            }}
          >
            리스트 정렬
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: 1,
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelected(index);
                setValue(item);
              }}
            >
              <Typography
                fontSize={14}
                fontWeight={selected !== index ? 'none' : 'bold'}
                sx={{
                  color: selected !== index ? 'common.black' : 'common.main',
                }}
              >
                {item}
              </Typography>
              {selected === index && (
                <CheckIcon sx={{ color: 'common.main' }} />
              )}
            </Box>
          ))}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              onClick={onClose}
              sx={{
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'common.gray',
                '&:hover': {
                  color: 'common.black', // ✅ 호버 시 색 변경
                },
              }}
            >
              닫기
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
