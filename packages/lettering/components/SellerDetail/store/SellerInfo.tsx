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
        <Typography fontSize={16} sx={{ mb: 2 }}>
          가게 정보
        </Typography>
        <Typography variant="subtitle2" fontSize={16} color="common.black">
          {sellerData?.marketName}
        </Typography>
        <Typography fontSize={14} color="common.black" sx={{ mt: 1 }}>
          {sellerData.introduction}
        </Typography>

        <Typography fontSize={12} color="text.secondary">
          영업 시간: {sellerData.startTime} ~ {sellerData.endTime} (
          {sellerData.startDay} ~ {sellerData.endDay})
        </Typography>
      </Box>

      <Box sx={{ my: 3, px: 2 }}>
        <Typography fontSize={16} fontWeight="bold" sx={{}}>
          가게 위치
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          {sellerData.location}
        </Typography>
        <Box
          sx={{
            height: 200,
            mb: 3,
            mt: 1,
            // border: '0.5px solid',
            // borderColor: 'text.secondary',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
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
