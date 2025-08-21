'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { s3ImageAtom } from '@/store/orderStore/s3image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { createOrder } from '@/api/client/order';
import BackDrop from '@/components/common/backdrop/BackDrop';
import { handleNavigation } from '@/config/navigation';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { UserInfoAtom } from '@/store/userStore/state';
import { ResponseStatus } from '@/types/enums/enums';
import dayjs from 'dayjs';

export default function Page() {
  const router = useRouter();
  const hasFetched = useRef(false);
  const searchParams = useSearchParams();

  const products = useRecoilValue(selectedProductAtom);
  const { _id } = useRecoilValue(UserInfoAtom);
  const s3images = useRecoilValue(s3ImageAtom);
  const date = useRecoilValue(dateSelectionAtom); // 선택한 날짜정보

  const code = searchParams.get('code');
  const paymentId = searchParams.get('paymentId');

  const makeOrderForm = async () => {
    const additional = products?.additionalProduct
      ? products?.additionalProduct
      : [];

    const additionalProducts = Object.entries(additional).map(
      ([_id, value]) => ({ ...value, _id }),
    );

    const optionForm = products?.options
      ? Object.entries(products?.options).map(([title, value]) => ({
          title,
          ...value,
        }))
      : undefined;

    const form: any = {
      // 결제 심사 테스트용
      userId: _id,
      name: products?.username,
      sellerId: products?.sellerId,
      phoneNumber: products?.phoneNumber || products?.phoneNumber || '',
      productId: products?.productId,
      options: JSON.stringify(optionForm),
      price: products?.price,
      discount: products?.discount,
      totalPrice: products?.totalPrice,
      paymentMethod: 'CARD',
      couponId: products?.couponId || undefined,
      bookingDate: dayjs(date).toDate(),
      storeRequest: products?.storeRequest,
      paymentId: products?.paymentId,
      additionalProducts: JSON.stringify(additionalProducts),
      productImage: s3images ? s3images : undefined,
      location: products?.parcelLocation || null,
      locationDetail: products?.parcelLocationDetail || null,
      parcelFee: products?.parcelFee || 0,
    };

    const { message, status } = await createOrder(form);

    if (status === ResponseStatus.error) return false;
    else return true;
  };

  const handleRouter = () => {
    const result = makeOrderForm();

    let path = 'order-complete';
    if (!result) path = 'order-failed';

    const isWebView = handleNavigation({
      path,
      status: 'replace',
    });

    if (!isWebView) {
      router.replace(`/${path}`);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return; // ✅ 이미 fetch 요청이 실행되었으면 종료
    hasFetched.current = true; // ✅ 첫 실행 이후 true로 변경

    sessionStorage.setItem('access_to_success', 'granted');

    if (code) {
      return router.replace('/order-failed');
    } else if (paymentId) {
      return handleRouter();
    }
  }, []);

  return <BackDrop />;
}
