'use client';

import CouponClickableBox from '@/components/page/Payments/CouponClickableBox';
import React from 'react';
import OrderInputContainer from '../../common/OrderInputContainer';

const CustomerInfoSection = ({ userId = '' }) => {
  return (
    <>
      <div
        style={{
          width: '50px',
          height: '5px',
          backgroundColor: '#ccc',
          borderRadius: '10px',
          margin: '8px auto 16px',
        }}
      />
      <OrderInputContainer />
      <CouponClickableBox userId={userId} />
    </>
  );
};

export default React.memo(CustomerInfoSection);
