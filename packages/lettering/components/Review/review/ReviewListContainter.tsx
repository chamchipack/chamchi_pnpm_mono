import { Box, Typography, Rating, Divider } from '@mui/material';
import ReviewBox from './ReviewBox';

interface ReviewListContainerProps {
  score: number; // ✅ 리뷰 점수 (5점 만점, 소수점 1자리)
}

export default function ReviewListContainer({
  score = 4.7,
}: ReviewListContainerProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 3, // ✅ 상하 여백 추가
        }}
      >
        {/* 리뷰 점수 표시 */}
        <Typography fontSize={36} fontWeight="bold">
          {score.toFixed(1)} {/* ✅ 소수점 1자리까지 표시 */}
        </Typography>

        {/* 별점 표시 */}
        <Rating
          value={score}
          precision={0.1} // ✅ 소수점 1자리까지 반영
          readOnly
          sx={{
            color: 'common.star', // ✅ 별 색상 노란색
            mt: 1, // ✅ 간격 추가
          }}
        />
      </Box>

      <Box>
        {dummyNotifications.map((item, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <ReviewBox {...item} />
          </Box>
        ))}
      </Box>
    </>
  );
}

const dummyNotifications = [
  {
    _id: '1',
    userName: '김철수',
    image: '/cake1.png',
    timeAgo: '2시간 전',
    reviewMessage: '좋은 품질이에요! 배송도 빠르고 만족합니다.',
    productName: '레터링 케이크',
  },
  {
    _id: '2',
    userName: '이영희',
    image: '',
    timeAgo: '5시간 전',
    reviewMessage:
      '디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요.',
    productName: '초코 생크림 케이크',
  },
  {
    _id: '3',
    userName: '박지훈',
    image: '',
    timeAgo: '1일 전',
    reviewMessage: '맛도 좋고 포장도 깔끔했어요!',
    productName: '딸기 요거트 케이크',
  },
  {
    _id: '4',
    userName: '최민정',
    image: '/cake1.png',
    timeAgo: '3일 전',
    reviewMessage: '조금 달긴 했지만 전체적으로 만족해요!',
    productName: '바닐라 크림 케이크',
  },
  {
    _id: '5',
    userName: '정우성',
    image: '',
    timeAgo: '1주 전',
    reviewMessage: '친절한 상담 덕분에 원하는 디자인으로 잘 받았어요.',
    productName: '블루베리 치즈 케이크',
  },
];
