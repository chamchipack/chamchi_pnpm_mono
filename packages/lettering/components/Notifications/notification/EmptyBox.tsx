import { Box, Typography } from '@mui/material';

export default function EmptyBox() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // ✅ 가로 가운데 정렬
        alignItems: 'center', // ✅ 세로 가운데 정렬
        mt: 7, // ✅ 상단 마진
        width: '100%',
      }}
    >
      {/* 알림 없음 메시지 */}
      <Typography fontSize={16} fontWeight="bold" color="text.secondary">
        알려드릴 소식이 없어요!
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
