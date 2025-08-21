'use client';

import { useResetOnSellerChange } from '@/config/utils/hooks/reset/useResetOnSellerChange';
import { useResetS3Images } from '@/config/utils/hooks/reset/useResetS3Images';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const CSR_Hooks = ({ location }: { location: string }) => {
  const [, setProductState] = useRecoilState(selectedProductAtom);

  useResetOnSellerChange();
  useResetS3Images();

  useEffect(() => {
    setProductState((prev) => ({
      ...prev!,
      location,
    }));
  }, [location]);

  return null;
};

export default React.memo(CSR_Hooks);
