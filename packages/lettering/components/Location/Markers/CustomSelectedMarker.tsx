'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Box, Typography } from '@mui/material';

interface CustomSelectedMarkerProps {
  _id: string; // 마커의 고유 ID
  lat: number;
  lng: number;
  imageSrc?: string;
  onClick?: (_id: string) => void; // 클릭 시 `_id`를 전달하는 함수
}

export default function CustomSelectedMarker({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
}: CustomSelectedMarkerProps) {
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
          border: '2px solid #000', // 테두리 검은색
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer', // 클릭 가능하도록 설정
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px', // 위치 조정
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '12px solid white', // 안쪽 삼각형 색
            zIndex: 2, // 위쪽에 배치
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-14px', // 위치 조정
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '14px solid #000', // 테두리 검은색
            zIndex: 1, // 아래쪽 배치
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
