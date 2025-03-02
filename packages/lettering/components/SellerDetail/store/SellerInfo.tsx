import { Box, Typography } from '@mui/material';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerInfo({ sellerData }: Props) {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        가게 정보
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {sellerData.introduction}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
        위치: {sellerData.location}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
        영업 시간: {sellerData.startTime} ~ {sellerData.endTime} (
        {sellerData.startDay} ~ {sellerData.endDay})
      </Typography>
    </Box>
  );
}
