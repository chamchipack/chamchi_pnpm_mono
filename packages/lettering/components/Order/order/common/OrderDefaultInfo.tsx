import { Box, Typography } from '@mui/material';

export default function OrderDefaultInfo() {
  return (
    <>
      <Box sx={{}}>
        <Typography fontSize={16} fontWeight="bold">
          스타벅스 강남점
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          경기도 성남시 수정구 성남대로 1237번길 8-21
        </Typography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography fontSize={12} color="text.secondary">
          2025년 3월 1일 오후 12:40
        </Typography>
      </Box>
    </>
  );
}
