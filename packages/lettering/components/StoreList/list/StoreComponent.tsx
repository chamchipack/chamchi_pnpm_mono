import StarRatingscore from '@/components/common/rating/StarRatingscore';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function StoreComponent() {
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
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
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
              }}
            >
              <CardContent></CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={16} fontWeight={'bold'} sx={{ mr: 1 }}>
            스타벅스 강남점
          </Typography>
          <StarRatingscore />
        </Box>
        <Typography
          color="common.gray"
          fontSize={12}
          sx={{
            whiteSpace: 'nowrap', // 줄바꿈 방지
            overflow: 'hidden', // 넘친 텍스트 숨김
            textOverflow: 'ellipsis', // '...'으로 표시
            width: '100%', // 부모 요소의 크기 안에서 동작
          }}
        >
          경기도 성남시 수정구 성남대로 1237번길 8-21
        </Typography>
      </Box>
    </>
  );
}
