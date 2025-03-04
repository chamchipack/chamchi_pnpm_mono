'use client';
import { handleNavigation } from '@/config/navigation';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePopularElements() {
  const router = useRouter(); // Next.js 라우터

  const handleRouter = (sellerId: string) => {
    let path = 'seller-detail';
    const param = {
      orderId: 'adwiuvubdasvdwbi',
    };

    const isWebView = handleNavigation({
      path,
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontSize={20}>
          최근 본 상품 리스트
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          gap: 2,
          paddingBottom: 3,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              position: 'relative',
            }}
          >
            {/* 카드 */}
            <Card
              sx={{
                minWidth: 160,
                height: 160,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => handleRouter('_id')}
            >
              {/* 🔹 카드 이미지 */}
              <CardMedia
                component="img"
                height="160"
                image={index % 2 === 0 ? '/cake2.png' : '/cake1.png'}
                alt={`상품 ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />

              {/* 🔹 페이드 효과를 위한 배경 */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '40%', // ✅ 페이드 적용 높이 조정
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
                }}
              />

              {/* 🔹 카드 하단 텍스트 */}
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: 0,
                  width: '100%',
                  color: 'white',
                  padding: '8px 12px',
                  zIndex: 1, // ✅ 배경보다 위에 표시
                }}
              >
                <Typography variant="body2" fontSize={12}>
                  상품 {index + 1}
                </Typography>
              </CardContent>
            </Card>
            <Typography
              variant="body1"
              sx={{ marginTop: 1, textAlign: 'left', fontSize: 12 }}
            >
              매장 {index + 1}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
