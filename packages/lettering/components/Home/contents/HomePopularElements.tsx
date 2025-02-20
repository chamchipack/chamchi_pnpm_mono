import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function HomePopularElements() {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={600} fontSize={14}>
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
                minWidth: 130,
                height: 130,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 🔹 카드 이미지 */}
              <CardMedia
                component="img"
                height="130"
                image="/cake2.png"
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
              variant="body2"
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
