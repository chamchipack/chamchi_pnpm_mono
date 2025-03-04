import KakaoMapForInformation from '@/components/Location/Map/KakaoMapForInformation';
import { Box, Divider, Typography } from '@mui/material';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerInfo({ sellerData }: Props) {
  return (
    <Box sx={{ px: 2 }}>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        가게 정보
      </Typography>
      <Typography fontSize={14} color="common.black">
        {sellerData?.marketName}
      </Typography>
      <Typography fontSize={14} color="common.black">
        {sellerData.introduction}
      </Typography>
      <Typography fontSize={12} color="text.secondary">
        {sellerData.location}
      </Typography>
      <Typography fontSize={12} color="text.secondary">
        영업 시간: {sellerData.startTime} ~ {sellerData.endTime} (
        {sellerData.startDay} ~ {sellerData.endDay})
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          가게 위치
        </Typography>
        <Box sx={{ height: 200, mb: 3, boxShadow: 5, borderRadius: 5 }}>
          <KakaoMapForInformation
            _id={sellerData._id}
            lat={sellerData.lat}
            lng={sellerData.lng}
            zoomLevel={3}
          />
        </Box>
      </Box>
    </Box>
  );
}
