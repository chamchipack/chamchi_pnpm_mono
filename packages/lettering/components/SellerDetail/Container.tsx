import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import SellerMainImage from './store/SellerMainImage';
import SellerContainer from './store/SellerContainer';
import SellerItemPictures from './store/SellerItemPictures';

interface Props {
  sellerId: string;
}

const data: Seller = {
  _id: 'fawdhjLKwdrwe1',
  marketName: '가게이름1',
  images: [
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
  ],
  lat: 37.439811,
  lng: 127.12798,
  location: '경기도 성남시 수정구 성남대로1237번길 8-21',
  sellerName: '셀러1',
  id: 'seller1',
  pw: 'password1',
  businessNumber: 12345678901,
  mutualName: '상호명1',
  startDay: 'mon',
  endDay: 'fri',
  startTime: '10:00',
  endTime: '20:00',
  originalInfo: '정보1',
  introduction: '소개글1',
  openedAt: new Date(),
  closedAt: new Date(),
  mininumReservationDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Container({ sellerId = '' }: Props) {
  // sellerId를 이용한 서버요청
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={true} title={data?.marketName} />
        </Box>

        <Box sx={{}}>
          <SellerMainImage images={data?.images} />
        </Box>
        <Box sx={{ px: 2, mt: 1 }}>
          <SellerContainer {...data} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <SellerItemPictures />
        </Box>
      </Box>
    </>
  );
}
