import CouponForm from '@/components/common/coupon/CouponForm';
import HeadComponent from '@/components/common/HeadComponent';
import { Box } from '@mui/material';

const coupon = [
  {
    name: '생일 할인',
    discount: '10,000원',
    description: '생일 축하 기념 할인 쿠폰',
  },
  {
    name: '첫 구매 할인',
    discount: '5,000원',
    description: '첫 구매 시 사용 가능한 쿠폰',
  },
  {
    name: 'VIP 회원 할인',
    discount: '5,000원',
    description: 'VIP 회원 전용 할인 쿠폰',
  },
];

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={true} title="쿠폰 보관함" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <CouponForm coupons={coupon} isCheckable={false} />
        </Box>
      </Box>
    </>
  );
}
