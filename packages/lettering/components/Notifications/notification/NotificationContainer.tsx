import Box from '@mui/system/Box';
import NotificationBox from './NotificationBox';
import EmptyBox from './EmptyBox';

const dummy = [
  {
    _id: '1',
    title: '맛있는 시간 보내셨나요?',
    timeAgo: '2시간 전',
    reviewMessage: '주문에 대한 리뷰를 남겨주세요!',
    storeName: '스타벅스 강남점',
    storeAddress: '경기도 성남시 수정구 성남대로1237번길 8-21',
    productName: '레터링 케이크',
    type: 'review',
  },
  {
    _id: '2',
    title: '주문이 완료되었습니다!',
    timeAgo: '1시간 전',
    reviewMessage: '곧 도착 예정입니다. 잠시만 기다려 주세요!',
    storeName: '배스킨라빈스 강남점',
    storeAddress: '서울특별시 강남구 테헤란로 152',
    productName: '아이스크림 케이크',
    type: 'review',
  },
  {
    _id: '3',
    title: '이용해 주셔서 감사합니다!',
    timeAgo: '30분 전',
    reviewMessage: '서비스가 만족스러우셨나요? 피드백을 남겨 주세요!',
    storeName: '커피빈 신촌점',
    storeAddress: '서울특별시 서대문구 신촌로 100',
    productName: '바닐라 라떼',
    type: 'packaging',
  },
  {
    _id: '4',
    title: '새로운 이벤트가 있습니다!',
    timeAgo: '10분 전',
    reviewMessage: '스타벅스에서 새로운 프로모션을 확인해 보세요!',
    storeName: '스타벅스 홍대점',
    storeAddress: '서울특별시 마포구 홍익로 123',
    productName: '아메리카노',
    type: 'review',
  },
  {
    _id: '5',
    title: '할인이 적용되었습니다!',
    timeAgo: '5분 전',
    reviewMessage: '쿠폰이 자동으로 적용되었습니다!',
    storeName: '던킨도너츠 종로점',
    storeAddress: '서울특별시 종로구 종로 50',
    productName: '도넛 세트',
    type: 'packaging',
  },
];

export default function NotificationContainer() {
  if (!dummy.length) return <EmptyBox />;
  return (
    <>
      {dummy.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <NotificationBox {...item} />
        </Box>
      ))}
    </>
  );
}
