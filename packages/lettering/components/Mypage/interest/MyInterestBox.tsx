import StarRatingscore from '@/components/common/rating/StarRatingscore';
import { Box, Typography } from '@mui/material';

export default function MyInterestList() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 90,
            minHeight: 90,
            backgroundColor: 'grey.300',
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            flex: 4,
            minHeight: 90,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography fontSize={16} fontWeight="bold">
            스타벅스 강남점
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            경기도 성남시 수정구 성남대로 1237번길 8-21
          </Typography>

          <StarRatingscore rating={4.6} />
        </Box>
      </Box>
    </>
  );
}
