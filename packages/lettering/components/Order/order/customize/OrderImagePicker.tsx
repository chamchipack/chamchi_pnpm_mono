'use client';
import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OrderImagePicker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: selectedImage ? 'transparent' : 'grey.100',
      }}
      onClick={() => document.getElementById('image-input')?.click()}
    >
      {/* 이미지 미리보기 */}
      {selectedImage ? (
        <>
          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* 이미지 삭제 버튼 (우측 상단) */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 이벤트 방지
              handleImageReset();
            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <Typography fontSize={16} color="text.secondary">
          이미지를 선택해주세요
        </Typography>
      )}

      {/* 파일 입력 */}
      <input
        type="file"
        id="image-input"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </Box>
  );
}
