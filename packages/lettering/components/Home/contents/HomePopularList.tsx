import { Box, Card, CardContent, Typography } from '@mui/material';

export default function HomePopularList() {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={600} fontSize={14}>
          인기 매장
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // ✅ 가로 스크롤 가능
          whiteSpace: 'nowrap', // ✅ 줄 바꿈 방지
          gap: 2, // 카드 간격 조정
          paddingBottom: 3, // ✅ 카드 아래 텍스트를 위한 공간 확보
          scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
          msOverflowStyle: 'none', // IE, Edge에서 스크롤바 숨김
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari에서 스크롤바 숨김
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
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
                backgroundColor: 'grey.300',
              }}
            >
              <CardContent></CardContent>
            </Card>
            {/* 하단 텍스트 */}
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
