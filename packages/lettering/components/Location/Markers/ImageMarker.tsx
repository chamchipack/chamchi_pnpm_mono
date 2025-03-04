'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Box } from '@mui/material';

interface ImageMarkerProps {
  _id: string; // 마커의 고유 ID
  lat: number;
  lng: number;
  imageSrc?: string;
  onClick?: (_id: string) => void; // 클릭 시 `_id`를 전달하는 함수
}

export default function ImageMarker({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
}: ImageMarkerProps) {
  return (
    <CustomOverlayMap position={{ lat, lng }}>
      <Box
        onClick={() => onClick && onClick(_id)}
        sx={{
          backgroundColor: 'white',
          border: '2px solid #ff4081',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden', // 이미지가 둥근 테두리 안에 들어가도록 처리
          cursor: 'pointer', // 클릭 가능하도록 설정
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt="커스텀 마커"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // 이미지를 박스 크기에 맞게 조정
          }}
        />
      </Box>
    </CustomOverlayMap>
  );
}
