'use client';
import { formatTimeAgo } from '@/config/utils/time/formatTimeAgo';
import { Box, Button, Rating, Typography } from '@mui/material';
import { useState } from 'react';

export default function ReviewBox({
  userId = '조찬익',
  createdAt,
  content = '주문에 대한 리뷰를 남겨주세요!',
  orderId = '상품명',
  images,
  star,
}: ReviewSchema) {
  const [imgError, setImgError] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        padding: 1,
      }}
    >
      {/* 왼쪽 상단 고정된 이미지 */}
      <Box
        component="img"
        src={'/user.png'}
        alt="Notification Image"
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: 1,
          alignSelf: 'flex-start',
        }}
      />

      {/* 가운데 텍스트 영역 (여러 줄 가능) */}
      <Box
        sx={{
          ml: 1,
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={14} fontWeight="bold">
            {userId}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {formatTimeAgo(createdAt)}
          </Typography>
        </Box>

        <Box>
          <Rating
            value={star}
            precision={0.1} // ✅ 소수점 1자리까지 반영
            readOnly
            sx={{
              color: 'common.star', // ✅ 별 색상 노란색
            }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography fontSize={14} color="text.primary">
            {content}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography fontSize={12} color="text.secondary">
            {orderId}
          </Typography>
        </Box>

        {images && (
          <Box sx={{ mt: 1 }}>
            <Box
              component="img"
              src={!imgError && images[0] ? images[0] : undefined} // ✅ 에러 발생 시 src 제거
              alt="Notification Image"
              onError={() => setImgError(true)} // ✅ 이미지 로드 실패 시 에러 상태 변경
              sx={{
                backgroundColor: 'common.gray', // ✅ 기본 회색 배경
                width: 140,
                height: 140,
                borderRadius: 2,
                objectFit: 'cover',
                marginRight: 1,
                alignSelf: 'flex-start',
                display: 'block',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
