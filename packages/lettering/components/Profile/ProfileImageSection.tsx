'use client';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const DEFAULT_IMAGE = '/user.png'; // 기본 이미지

export default function ProfileImageSection() {
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_IMAGE);

  // 이미지 선택 처리
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // 이미지 삭제 처리 (기본 이미지로 초기화)
  const handleDelete = () => {
    setSelectedImage(DEFAULT_IMAGE);
  };

  return (
    <>
      {/* 프로필 이미지 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={selectedImage}
          alt="User Profile"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={() =>
            document.getElementById('profile-image-input')?.click()
          }
        />

        {/* 파일 입력 */}
        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </Box>

      {/* 삭제 버튼 (기본 이미지가 아닐 때만 표시) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
        }}
      >
        {selectedImage !== DEFAULT_IMAGE && (
          <Typography onClick={handleDelete} sx={{ cursor: 'pointer' }}>
            삭제하기
          </Typography>
        )}
      </Box>
    </>
  );
}
