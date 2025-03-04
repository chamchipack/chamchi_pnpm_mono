'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Box, Typography } from '@mui/material';

interface CustomNoneSelectedMarkerProps {
  _id: string; // 마커의 고유 ID
  lat: number;
  lng: number;
  imageSrc?: string;
  onClick?: (_id: string) => void; // 클릭 시 `_id`를 전달하는 함수
}

export default function CustomNoneSelectedMarker({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
}: CustomNoneSelectedMarkerProps) {
  return (
    <CustomOverlayMap position={{ lat, lng }} xAnchor={0.5} yAnchor={1}>
      <Box
        onClick={() => onClick && onClick(_id)}
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          padding: '10px 16px',
          borderRadius: 10,
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer', // 클릭 가능하도록 설정
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid white',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-11px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            borderTop: '11px solid #ddd',
          },
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt="커스텀 마커"
          sx={{ width: 30, height: 30, borderRadius: '50%' }}
        />
        <Typography fontSize={14} fontWeight="bold" color="black">
          케이크 가게
        </Typography>
      </Box>
    </CustomOverlayMap>
  );
}
