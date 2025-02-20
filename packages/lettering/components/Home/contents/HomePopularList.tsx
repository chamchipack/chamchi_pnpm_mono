import { Box, Typography } from '@mui/material';

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
            {/* 🔹 이미지 박스 (기존 Card 대체) */}
            <Box
              sx={{
                minWidth: 130,
                height: 130,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2, // ✅ 모서리 둥글게
                backgroundColor: '#f0f0f0', // ✅ 기본 배경 (이미지가 없을 경우)
              }}
            >
              {/* 이미지 추가 */}
              <img
                src="/cake2.png"
                alt={`매장 ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // ✅ 이미지가 박스를 꽉 채우도록
                }}
              />
            </Box>

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
