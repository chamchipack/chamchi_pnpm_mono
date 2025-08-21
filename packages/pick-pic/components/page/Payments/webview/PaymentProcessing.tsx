'use client';

import { createOrder } from '@/api/client/order';
import { handleNavigation } from '@/config/navigation';
import {
  base64ToFile,
  formDataTools,
} from '@/config/utils/hooks/formDataTools';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { imageObjectsAtom } from '@/store/orderStore/imagesAtom';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { useUserInfoKeys } from '@/store/userStore/state';
import { ResponseStatus } from '@/types/enums/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function PaymentProcessing({ userId = '' }) {
  const value = useRecoilValue(selectedProductAtom);
  const selectedDate = useRecoilValue(dateSelectionAtom);
  const image64s = useRecoilValue(imageObjectsAtom);

  const additional = value?.additionalProduct ? value?.additionalProduct : [];
  const additionalProducts = Object.entries(additional).map(([_id, value]) => ({
    ...value,
    _id,
  }));

  const { phoneNumber } = useUserInfoKeys(['phoneNumber']);

  // const options = Object.values(products?.options || {}).length
  //   ? Object.values(products?.options || {})
  //   : undefined;
  const options = value?.options
    ? Object.entries(value.options).map(([title, value]) => ({
        title,
        ...value,
      }))
    : undefined;

  const form = {
    userId,
    name: value?.username,
    sellerId: value?.sellerId,
    phoneNumber: value?.phoneNumber || phoneNumber || '',
    productId: value?.productId,
    options,
    price: value?.price,
    discount: value?.discount,
    totalPrice: value?.totalPrice,
    paymentMethod: 'CARD',
    couponId: value?.couponId ? value?.couponId : undefined,
    bookingDate: dayjs(selectedDate).toDate(),
    storeRequest: value?.storeRequest,
    productName: value?.productName,
    additionalProducts: additionalProducts,
    location: value?.parcelLocation || null,
    locationDetail: value?.parcelLocationDetail || null,
    parcelFee: value?.parcelFee || 0,
  };

  const makeForm = () => {
    (window as any).ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'SEND',
        data: form,
      }),
    );
  };

  useEffect(() => {
    if (value?.productName) makeForm();
  }, [value]);

  useReceiveWebviewMessage(async (data, event) => {
    if (data === 'canceled')
      return handleNavigation({ status: 'replace', path: 'payments/failed' });

    if (!data?.result || !data?.paymentId)
      return handleNavigation({ status: 'replace', path: 'payments/failed' });

    const result = Object.entries(image64s || {})
      .map(([key, value]) => ({ _id: key, ...value }))
      .sort((a, b) => a.index - b.index);

    const productImage = result.map((value) => {
      return base64ToFile(value.base64);
    });

    // const file = imageBase64 ? { productImage: base64ToFile(imageBase64) } : {}; // → image.png 또는 image.jpg 등 자동 추출
    const format = {
      ...form,
      productImage,
      paymentId: data?.paymentId,
    };

    const formData = formDataTools(format, {
      imageKeys: ['productImage'],
      jsonKeys: ['options', 'additionalProducts'],
      ignoreKeys: [],
    });

    try {
      const { status } = await createOrder(formData);
      if (status === ResponseStatus.error)
        handleNavigation({ status: 'replace', path: 'payments/failed' });
      else handleNavigation({ status: 'replace', path: 'payments/success' });
    } catch (e) {}
  });
  return null;
}
