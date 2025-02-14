import { Box, Typography, Rating, Divider } from '@mui/material';
import MyInterestBox from './MyInterestBox';
import EmptyBox from '@/components/common/overlay/EmptyBox';

interface MyReviewListContainerProps {}

export default function MyReviewListContainer({}: MyReviewListContainerProps) {
  return (
    <>
      <Box>
        {dummyNotifications.length ? (
          <>
            <Box sx={{ my: 2 }}>
              <Typography fontSize={16} fontWeight={'bold'}>
                나의 찜 {dummyNotifications.length}개
              </Typography>
            </Box>
            {dummyNotifications.map((item, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <MyInterestBox {...item} />
              </Box>
            ))}
          </>
        ) : (
          <EmptyBox title="내가 작성한 리뷰가 없어요!" />
        )}
      </Box>
    </>
  );
}

const dummyNotifications = [
  {
    _id: '1',
    storeName: '스타벅스 강남점',
    image: '/cake1.png',
    timeAgo: '2시간 전',
    reviewMessage: '좋은 품질이에요! 배송도 빠르고 만족합니다.',
    productName: '레터링 케이크',
  },
  {
    _id: '2',
    storeName: '스타벅스 강남점',
    image: '',
    timeAgo: '5시간 전',
    reviewMessage:
      '디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요. 디자인이 너무 예뻐요! 다음에도 주문할게요.',
    productName: '초코 생크림 케이크',
  },
  {
    _id: '3',
    storeName: '스타벅스 강남점',
    image: '',
    timeAgo: '1일 전',
    reviewMessage: '맛도 좋고 포장도 깔끔했어요!',
    productName: '딸기 요거트 케이크',
  },
  {
    _id: '4',
    storeName: '스타벅스 강남점',
    image: '/cake1.png',
    timeAgo: '3일 전',
    reviewMessage: '조금 달긴 했지만 전체적으로 만족해요!',
    productName: '바닐라 크림 케이크',
  },
  {
    _id: '5',
    storeName: '스타벅스 강남점',
    image: '',
    timeAgo: '1주 전',
    reviewMessage: '친절한 상담 덕분에 원하는 디자인으로 잘 받았어요.',
    productName: '블루베리 치즈 케이크',
  },
];
