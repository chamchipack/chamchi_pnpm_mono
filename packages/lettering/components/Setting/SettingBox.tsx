'use client';

import { useState } from 'react';
import { Box, Typography, Switch, styled } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ✅ Styled Switch (트랙 색상 조정 가능)
const AntSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'trackColor',
})<{ trackColor?: string }>(({ theme, trackColor }) => {
  let color = theme.palette.text.disabled; // 기본 색상

  if (trackColor) {
    const colorParts = trackColor.split('.');
    color =
      colorParts.length === 2
        ? (theme.palette[colorParts[0] as keyof Theme['palette']] as any)[
            colorParts[1]
          ]
        : theme.palette[trackColor as keyof Theme['palette']];
  }

  return {
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#FFD3C6', // ✅ 활성화 시 Primary 색상
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      borderRadius: 14,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor: color,
      boxSizing: 'border-box',
    },
  };
});

// ✅ 설정 항목
const settings = {
  notifications: {
    label: '안심번호 사용',
    text: '가상 안심번호를 이용하여 개인정보를 보호하세요.',
  },
  darkMode: {
    label: '동시 로그인 사용',
    text: '다른 기기에서도 로그인을 유지할 수 있습니다.',
  },
  autoUpdate: {
    label: '주문현황 알림',
    text: '주문 진행 상황을 실시간으로 알려드립니다.',
  },
};

export default function SettingBox() {
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
    notifications: false,
    darkMode: false,
    autoUpdate: true,
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(settings).map(([key, { label, text }]) => (
        <Box key={key} sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 2,
            }}
          >
            <Typography fontSize={14}>{label}</Typography>
            <AntSwitch
              checked={toggles[key]}
              onChange={() => handleToggle(key)}
              trackColor="text.disabled" // ✅ 트랙 색상 조정 가능
            />
          </Box>
          <Box>
            <Typography fontSize={12} color="gray">
              {' '}
              {text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
