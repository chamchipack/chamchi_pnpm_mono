import { Box, Card, CardContent, Typography } from '@mui/material';

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
              position: 'relative', // 카드 내부 절대 위치 지정
            }}
          >
            {/* 카드 */}
            <Card
              sx={{
                minWidth: 130,
                height: 130,
                flexShrink: 0,
                backgroundColor: 'grey.300',
                position: 'relative', // ✅ 하단 배경 고정을 위한 상대 위치 설정
                overflow: 'hidden', // ✅ 배경이 넘치지 않도록 처리
              }}
            >
              {/* 카드 하단부 검은색 배경 + 텍스트 */}
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', // ✅ 검은색 반투명 배경
                  color: 'white', // ✅ 텍스트 흰색
                  padding: '8px 12px', // ✅ 내부 여백 추가
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
