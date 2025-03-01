'use client';
import StarRatingscore from '@/components/common/rating/StarRatingscore';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export default function SellerComponent({
  _id,
  marketName,
  location,
  images,
}: Seller) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    let path = 'seller-detail';

    const param = { sellerId: _id };

    const isWebView = handleNavigation({
      path: 'seller-detail',
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) {
      const queryParams = new URLSearchParams(param).toString();
      router.push(`/application/${path}?${queryParams}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          gap: 2,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={handleRouter}
      >
        {(images && images.length > 0 ? images : Array.from({ length: 5 })).map(
          (image, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              {/* 카드 */}
              <Card
                sx={{
                  minWidth: 130,
                  height: 130,
                  flexShrink: 0,
                  backgroundColor: 'grey.200',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                {typeof image === 'string' ? (
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`seller-image-${index}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <CardContent></CardContent>
                )}
              </Card>
            </Box>
          ),
        )}
      </Box>
      <Box sx={{ mt: 1 }} onClick={handleRouter}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            {marketName}
          </Typography>
          <StarRatingscore rating={4.3} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            whiteSpace: 'nowrap', // 줄바꿈 방지
            overflow: 'hidden', // 넘친 텍스트 숨김
            textOverflow: 'ellipsis', // '...'으로 표시
            width: '100%', // 부모 요소의 크기 안에서 동작
          }}
        >
          {location}
        </Typography>
      </Box>
    </>
  );
}
