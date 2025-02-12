import { Box, Typography } from '@mui/material';

export default function OrderEmptyComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // ✅ 가로 가운데 정렬
        alignItems: 'center', // ✅ 세로 가운데 정렬
        my: 7, // ✅ 상단 마진
        width: '100%',
      }}
    >
      {/* 알림 없음 메시지 */}
      <Typography fontSize={16} color="text.secondary">
        조건에 맞는 주문내역이 없어요!
      </Typography>

      {/* 경고 아이콘 이미지 */}
      <Box
        component="img"
        src="/exclamation.png" // ✅ 실제 이미지 경로로 변경
        alt="No Notification"
        sx={{
          width: 70,
          height: 70,
          mt: 1, // ✅ 텍스트와 간격 조정
        }}
      />
    </Box>
  );
}
