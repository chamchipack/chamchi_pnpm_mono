'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InputClickableBox from '../common/InputClickableBox';

type Input = {
  keyname: string;
  label: string;
  value: string;
  placeholder: string;
  isMaxLengthOn?: boolean;
  type?: 'mobile' | 'text';
}[];

const StoreRequestForm = () => {
  const [orderInfo] = useRecoilState(selectedProductAtom);
  const [request, setRequest] = useState<Input>([]);

  useEffect(() => {
    setRequest([
      {
        keyname: 'storeRequest',
        label: '요청사항',
        value: orderInfo?.storeRequest || '',
        placeholder: '요청사항을 입력해주세요. (최대 50자)',
        isMaxLengthOn: true,
        type: 'text',
      },
    ]);
  }, [orderInfo?.storeRequest]);

  return (
    <div className="my-4">
      <p className="text-sm font-bold mb-2">가게 요청사항</p>
      {request.length > 0 && (
        <InputClickableBox
          data={request}
          isLabelVisable={false}
          type="text"
          inputRequestTitle="가게 요청사항"
        />
      )}
    </div>
  );
};

export default React.memo(StoreRequestForm);
