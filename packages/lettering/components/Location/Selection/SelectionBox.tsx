'use client';

import { Box, Typography } from '@mui/material';

interface SelectionBoxProps {
  selectedMarker: string | null;
  onClose: () => void; // 선택 해제 (맵 클릭 시 초기화)
  imageSrc?: string;
  markerName?: string;
}

export default function SelectionBox({
  selectedMarker,
  onClose,
  imageSrc = '/cake1.png',
  markerName = '알 수 없음',
}: SelectionBoxProps) {
  if (!selectedMarker) return null; // 선택된 마커가 없으면 렌더링하지 않음

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '500px',
        height: 140,
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 2,
      }}
    >
      {/* 좌측: 이미지 */}
      <Box
        component="img"
        src={imageSrc}
        alt="선택된 마커 이미지"
        sx={{
          width: 100,
          height: '100%',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />

      {/* 우측: 마커 정보 */}
      <Box sx={{ flex: 1 }}>
        <Typography fontSize={16} fontWeight="bold">
          {markerName}
        </Typography>
      </Box>
    </Box>
  );
}
