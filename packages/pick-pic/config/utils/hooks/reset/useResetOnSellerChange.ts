import {
  selectedProductAtom,
  useProductInfoKeys,
} from '@/store/orderStore/order-info';
import { useEffect, useRef } from 'react';
import { useResetRecoilState } from 'recoil';

export function useResetOnSellerChange(resetOnce = true) {
  const { sellerId } = useProductInfoKeys(['sellerId']);
  const resetOrder = useResetRecoilState(selectedProductAtom);
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!sellerId) return;
    if (resetOnce && didResetRef.current) return;

    resetOrder();
    didResetRef.current = true;
  }, [sellerId]);
}
