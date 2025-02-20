'use client';
import { Box, Typography } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import OrderDefaultInfo from './order/common/OrderDefaultInfo';
import OrderInputContainer from './order/common/OrderInputContainer';
import OrderImagePicker from './order/customize/OrderImagePicker';
import CustomizeInputContainer from './order/customize/CustomizeInputContainer';
import PaymentPolicy from './order/common/PaymentPolicy';
import TotalAccountBox from './order/common/TotalAccountBox';
import CouponForm from '../common/coupon/CouponForm';
import { useState } from 'react';

export default function Container() {
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const handleOrder = () => {
    console.log('주문하기 버튼 클릭됨');
  };

  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="주문하기" />
        </Box>
        <Box sx={{ px: 2, mt: 2 }}>
          <OrderDefaultInfo />
        </Box>
        <Box sx={{ px: 2, mt: 2 }}>
          <OrderInputContainer />
        </Box>
        <Box sx={{ px: 2, mt: 2 }}>
          <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
            원하는 케이크 이미지 선택
          </Typography>
          <OrderImagePicker />
        </Box>
        <Box sx={{ px: 2, mt: 2 }}>
          <CustomizeInputContainer />
        </Box>
        <Box sx={{ px: 2, my: 5 }}>
          <PaymentPolicy />
        </Box>
      </Box>

      <TotalAccountBox label="주문하기" onClick={() => {}} />
    </>
  );
}
