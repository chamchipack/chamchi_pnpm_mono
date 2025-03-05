import KakaoMapForInformation from '@/components/Location/Map/KakaoMapForInformation';
import { Box, Divider, Typography } from '@mui/material';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerInfo({ sellerData }: Props) {
  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          가게 정보
        </Typography>
        <Typography variant="subtitle2" color="common.black">
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
      </Box>

      <Box sx={{ my: 2, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          가게 위치
        </Typography>
        <Box sx={{ height: 200, mb: 3 }}>
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
