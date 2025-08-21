'use client';

import React from 'react';
import InputClickableBox from '../order/InputClickableBox';

const OrderInputContainer = () => {
  return (
    <>
      <div className="my-2">
        <h2 className="text-md font-semibold">주문자 정보</h2>
      </div>
      <div className="my-2">
        <InputClickableBox />
      </div>
    </>
  );
};

export default React.memo(OrderInputContainer);
