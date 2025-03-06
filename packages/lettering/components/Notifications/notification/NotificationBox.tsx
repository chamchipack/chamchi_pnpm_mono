'use client';

import { handleNavigation } from '@/config/navigation';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NotificationBoxProps {
  _id: string;
  title?: string;
  timeAgo?: string;
  reviewMessage?: string;
  storeName?: string;
  storeAddress?: string;
  productName?: string;
  type?: 'review' | 'packaging' | string;
}

export default function NotificationBox({
  title = '알림 제목',
  timeAgo = '방금 전',
  reviewMessage = '주문에 대한 리뷰를 남겨주세요!',
  storeName = '가게 이름',
  storeAddress = '가게 주소',
  productName = '상품명',
  type = 'review',
}: NotificationBoxProps) {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/create-review?id=${'query'}`;
    const isWebView = handleNavigation({
      path: 'create-review',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

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
        src={type === 'review' ? '/pencil.png' : '/note.png'}
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
            {title}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {timeAgo}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography fontSize={14} color="common.black">
            {storeName}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography fontSize={12} color="text.secondary">
            {reviewMessage}
          </Typography>
          {/* <Typography fontSize={12} color="text.secondary">
            {storeAddress}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {productName}
          </Typography> */}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            sx={{
              width: '100%',
              height: 30,
              backgroundColor: 'common.main',
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'common.main',
                opacity: 0.8,
              },
            }}
            onClick={() => {
              if (type === 'review') return handleRouter();
              else return;
            }}
          >
            {type === 'review' ? '리뷰 작성하기' : '주문내역 보기'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
