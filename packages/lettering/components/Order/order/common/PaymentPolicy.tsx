import { Box, Typography } from '@mui/material';

export default function PaymentPolicy() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography fontSize={14} sx={{ color: 'common.gray' }}>
        구매조건 확인 및 결제대행 서비스 동의
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: 'common.gray', '&: hover': { cursor: 'pointer' } }}
      >
        보기
      </Typography>
    </Box>
  );
}
