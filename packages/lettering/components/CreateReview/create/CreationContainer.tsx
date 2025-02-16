'use client';
import ModalWrapper from '@/components/common/modal/ModalWrapper';
import { handleNavigation } from '@/config/navigation';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreationContainer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/home`;
    const isWebView = handleNavigation({ path: 'home', status: 'forward' });

    if (!isWebView) return router.push(path);
  };

  const handleClose = () => setOpen(false);

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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
        {/* Image Selection & Product Info */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              // backgroundColor: selectedImage ? 'transparent' : 'grey.200',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
            onClick={() =>
              !selectedImage && document.getElementById('image-input')?.click()
            }
          >
            {selectedImage ? (
              <Box
                component="img"
                src={selectedImage}
                alt="Selected"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Typography fontSize={12} color="text.secondary">
                사진을 선택해주세요
              </Typography>
            )}
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                //   backgroundColor: 'white',
              }}
              onClick={(e) => {
                e.stopPropagation();
                selectedImage
                  ? handleImageReset()
                  : document.getElementById('image-input')?.click();
              }}
            >
              {selectedImage ? (
                <CloseIcon fontSize="small" color="error" />
              ) : (
                <AddPhotoAlternateIcon fontSize="small" />
              )}
            </IconButton>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Box>
          <Box
            sx={{
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Typography fontSize={16} fontWeight="bold">
              제품명
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              가게이름
            </Typography>
          </Box>
        </Box>

        {/* Rating Selection */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography fontSize={14} fontWeight="bold">
            평가
          </Typography>
          <Rating
            name="review-rating"
            value={rating}
            precision={1} // 소수점 단위 조절 가능 (ex: 0.5 단위 평가 가능하게 하려면 0.5로 설정)
            onChange={(_, newValue) => setRating(newValue || 0)}
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'gold',
              },
              '& .MuiRating-iconEmpty': {
                color: 'gray',
              },
            }}
          />
        </Box>

        {/* Review Content */}
        <Box>
          <Typography fontSize={14} fontWeight="bold">
            내용
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="리뷰를 작성해주세요."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{
              mt: 1,
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1, // ✅ 내부도 둥글게
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.2)', // 기본 테두리 색상 (연한 회색)
                },
                '&:hover fieldset': {
                  borderColor: 'gray', // ✅ 호버 시 테두리 색상 변경
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'common.gray', // ✅ 포커스 시 검은색 테두리
                  borderWidth: 2, // ✅ 테두리를 두껍게 설정
                },
              },
            }}
          />
          <Typography
            fontSize={12}
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'right' }}
          >
            {reviewText.length}/100
          </Typography>
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          sx={{ borderRadius: 2, backgroundColor: 'common.main', height: 30 }}
          onClick={() => setOpen(true)}
        >
          <Typography color="common.white" fontSize={14} fontWeight="bold">
            리뷰 작성하기
          </Typography>
        </Button>
      </Box>

      <ModalWrapper
        open={open}
        handleClose={handleClose}
        title="스타벅스 강남점"
        content="리뷰를 등록하시겠어요?"
        processing={false}
        onClickCheck={handleRouter}
      ></ModalWrapper>
    </>
  );
}
