import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import OrderInformation from './OrderInformation';

interface Props {
  orderId: string;
}

const order: OrderSchema = {
  _id: 'order1',
  orderNumber: 100001,
  userId: 'user1',
  name: 'nickname1',
  phoneNumber: 1012345678,
  sellerId: 'seller1',
  productId: 'product1',
  productDetail: 'Product Detail 1',
  productImage: 'https://placehold.co/600x400',
  status: 'pending', // 대기중
  price: 30000,
  discount: 2000,
  totalPrice: 28000,
  paymentMethod: 'card',
  couponId: 'coupon1',
  bookingDate: new Date(),
  storeRequest: 'Request 1',
  createdAt: (() => {
    const date = new Date();
    date.setDate(date.getDate() - 10); // 10일 전
    return date;
  })(),
  updatedAt: new Date(),
};

export default function Container({ orderId = '' }: Props) {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={true} title="주문 상세내역" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <OrderInformation {...order} />
        </Box>
      </Box>
    </>
  );
}
