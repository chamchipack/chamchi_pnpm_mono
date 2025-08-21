'use client';

import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { shoppingCartAtom } from '@/store/cartStore/shopping-cart';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { ShoppingCart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const ActionConfirmationModal = dynamic(
  () => import('@/components/common/backdrop/ActionConfirmationModal'),
  { ssr: false, loading: () => null },
);

interface Props {
  product: ProductSchema;
}

export default function ShoppingCartButton({ product }: Props) {
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [cart, setCart] = useRecoilState(shoppingCartAtom);
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  const handleSaveCart = async () => {
    const inputed = orderInfo?.options;

    if (!inputed) return;
    setOpen(false);
    setCart(orderInfo);

    alert({ message: '장바구니에 담았어요!', type: 'success' });
  };

  useEffect(() => {
    const inputed = orderInfo?.options;

    if (!inputed || Object.keys(inputed).length === 0) {
      setButtonDisabled(true);
      return;
    }

    // if (Object.keys(inputed).length !== product?.options.length) {
    //   setButtonDisabled(true);
    //   return;
    // }

    const hasAllValidInputs = Object.values(inputed).every((item) => {
      if (item.type === 'text' || item.type === 'etc') {
        return item.name && item.name.trim() !== '';
      }
      // image는 검사 제외
      return true;
    });

    setButtonDisabled(!hasAllValidInputs);
  }, [orderInfo?.options]);

  return (
    <>
      <button
        className={`w-full px-4 py-3 text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2
    ${
      buttonDisabled
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:opacity-90'
    }
  `}
        onClick={() => setOpen(true)}
        disabled={buttonDisabled}
      >
        <ShoppingCart className="w-5 h-5" />
        장바구니 담기
      </button>

      <ActionConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        onClickCheck={handleSaveCart}
        title={'장바구니 담기'}
        content={
          '선택한 옵션들을 장바구니에 담을까요? 장바구니에는 1개의 상품만 담기고, 이미지나 날짜는 저장되지 않아요.'
        }
        processing={false}
      />
    </>
  );
}
