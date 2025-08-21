'use client';
import { shoppingCartAtom } from '@/store/cartStore/shopping-cart';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { ProductSchema } from '@/types/schema/ProductSchema';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

interface Props {
  product: ProductSchema;
}

const ActionConfirmationModal = dynamic(
  () => import('@/components/common/backdrop/ActionConfirmationModal'),
  { ssr: false, loading: () => null },
);

const ShoppingCartAlert = ({ product }: Props) => {
  const [open, setOpen] = useState(false);

  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);
  const [cart, setCart] = useRecoilState(shoppingCartAtom);
  const resetCart = useResetRecoilState(shoppingCartAtom);
  const hasFetched = useRef(false);

  const isOrderInfoMatchCart = (): boolean => {
    if (!cart?.options || !product?.options) return false;

    const orderArray = product.options; // 배열
    const cartObj = cart.options; // 객체

    if (orderArray.length !== Object.keys(cartObj).length) return false;

    for (const item of orderArray) {
      const title = item.title;
      const expectedType = item.type;

      const cartItem = cartObj[title];
      if (!cartItem) return false;
      if (cartItem.type !== expectedType) return false;
    }

    return true;
  };

  const validateCheck = () => {
    if (orderInfo?.sellerId !== cart?.sellerId)
      return '장바구니에 저장된 가게와 다릅니다.';
    else if (orderInfo?.productId !== cart?.productId)
      return '장바구니에 저장된 상품이 아닙니다!';
    else if (isOrderInfoMatchCart() === false)
      return '장바구니와 가게의 옵션이 다릅니다';
    else return '';
  };

  const handlePutData = () => {
    const result = validateCheck();
    console.log(orderInfo);
    console.log(cart);

    if (result) return alert({ message: result, type: 'warning' });

    resetCart();

    // setOrderInfo(cart);
  };

  useEffect(() => {
    if (!product || !cart) return;
    if (hasFetched.current) return; // ✅ 이미 fetch 요청이 실행되었으면 종료
    hasFetched.current = true; // ✅ 첫 실행 이후 true로 변경

    const { _id = '', sellerId: { _id: sellerId = '' } = {} } = product || {};
    const { sellerId: _sellerId = '', productId = '' } = cart || {};

    if (_id === productId && sellerId === _sellerId) setOpen(true);
  }, []);

  return (
    <>
      <ActionConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        onClickCheck={handlePutData}
        title={'장바구니 불러오기'}
        content={'장바구니에 저장된 상품을 불러올까요?'}
        processing={false}
      />
    </>
  );
};

export default React.memo(ShoppingCartAlert);
