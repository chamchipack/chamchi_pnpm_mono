import { Box, Typography } from '@mui/material';

export default function EventBox() {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          border: '1px solid lightgray',
          borderRadius: 2,
          p: 2,
          alignItems: 'center',
        }}
      >
        {/* 쿠폰 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src="/coupon.png"
            alt="쿠폰"
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
          />
          <Typography fontSize={14} fontWeight="bold">
            쿠폰
          </Typography>
        </Box>
  
        {/* 포인트 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src="/coin.png"
            alt="포인트"
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
          />
          <Typography fontSize={14} fontWeight="bold">
            포인트
          </Typography>
        </Box>
      </Box>
    );
  }