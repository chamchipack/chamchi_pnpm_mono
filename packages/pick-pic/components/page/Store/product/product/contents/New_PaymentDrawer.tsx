'use client';
import { createOrder } from '@/api/client/order';
import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import { handleNavigation } from '@/config/navigation';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { s3ImageAtom } from '@/store/orderStore/s3image';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { ResponseStatus } from '@/types/enums/enums';
import PortOne from '@portone/browser-sdk/v2';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import CustomerInfoSection from './payment-drawer/CustomerInfoSection';
import OrderContentsOptionSection from './payment-drawer/OrderContentsOptionSection';
import OrderContentsSection from './payment-drawer/OrderContentsSection';
import PaymentButton from './payment-drawer/PaymentButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  userId: string;
  imageFiles: Record<string, File>;
}

const New_PaymentDrawer = ({
  open,
  onClose,
  onOpen,
  imageFiles,
  userId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const alert = useAlert();

  useLockBodyScroll(open);

  useReceiveWebviewMessage(async (data, event) => {
    if (data?.status === 'canceled') {
      setLoading(false);
      return alert({
        message: '결제가 취소되었습니다',
        type: 'error',
      });
    }

    if (data?.status === 'success') {
      try {
        const { status } = await createOrder(form);
        if (status === ResponseStatus.error)
          handleNavigation({ status: 'replace', path: 'payments/failed' });
        else handleNavigation({ status: 'replace', path: 'payments/success' });
      } catch (e) {}
    }
  });

  const [products, setProducts] = useRecoilState(selectedProductAtom); // 선택한 상품정보
  const setS3Images = useSetRecoilState(s3ImageAtom);
  const date = useRecoilValue(dateSelectionAtom); // 선택한 날짜정보

  const [form, setForm] = useState<any | null>(null); // App용 Form 저장용

  const [loading, setLoading] = useState(false); // 결제버튼 loading

  const optionList =
    products?.options && Object.entries(products?.options).length
      ? Object.entries(products?.options)
      : [];

  const makeForm = (form: any) => {
    setForm(form);
    form.orderName = products?.productName;

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'PAYMENT_ACCESS',
          data: form,
        } as any),
      );
      return true;
    }

    return false;
  };

  const handlePayment = async () => {
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

    const imageOptions = optionForm
      ? optionForm.filter((opt) => opt.type === 'image')
      : [];

    const sorted = imageOptions.sort((a, b) => a.index - b.index);

    const fileList = sorted.map(({ _id = '' }) => {
      return imageFiles[_id];
    });

    const paymentUUID = uuidv4();

    setProducts((prev) => ({
      ...prev!,
      paymentId: paymentUUID,
    }));

    const form: any = {
      userId,
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
      paymentId: paymentUUID,
      additionalProducts: JSON.stringify(additionalProducts),
      location: products?.parcelLocation || null,
      locationDetail: products?.parcelLocationDetail || null,
      parcelFee: products?.parcelFee || 0,
    };
    // const result = OrderFormSchema.safeParse(form);

    const validateForm = () => {
      if (!form.name || !form.phoneNumber || !form.sellerId || !form.productId)
        return '주문자 정보 또는 상품 정보가 누락되었습니다.';
      if (!form.bookingDate || !dayjs(form.bookingDate).isValid())
        return '유효한 방문 날짜가 아닙니다.';
      if (!form.totalPrice || form.totalPrice <= 0)
        return '총 결제 금액이 올바르지 않습니다.';
      // 결제 심사 테스트용
      if (!userId) return '로그인 후 이용할 수 있어요!';
      return null;
    };

    const errorMessage = validateForm();

    if (errorMessage) {
      alert({
        message: errorMessage,
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    if (fileList.length) {
      const s3formData = new FormData();
      fileList.forEach((file: File) => {
        s3formData.append('files', file);
      });

      try {
        const response = await fetch('/api/presign', {
          method: 'POST',
          body: s3formData,
        });

        const uploadedUrls: string[] = await response.json();

        setS3Images(uploadedUrls);

        if (Array.isArray(uploadedUrls) && uploadedUrls.length)
          form.productImage = uploadedUrls;
      } catch (e) {
        setLoading(false);
        return alert({
          message: '이미지 처리에 실패했습니다.',
          type: 'error',
        });
      }
    } else form.productImage = undefined;

    const isWebView = makeForm(form);

    if (isWebView) return;

    try {
      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STOREID || '',
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNELKEY || '',
        paymentId: paymentUUID,
        orderName: `${products?.productName} 상품 주문`,
        totalAmount: form?.totalPrice as number,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        redirectUrl: `${window.location.origin}/payments/redirection?redirectUrl=${pathname}`,
        customer: {
          fullName: products?.username,
          phoneNumber: form?.phoneNumber || '',
        },
      });

      if (!response) {
        alert({
          message: '결제중 오류가 발생했습니다',
          type: 'error',
        });
        setLoading(false);
        return;
      }

      console.log(response);

      if (response.code === 'FAILURE_TYPE_PG') {
        alert({
          message:
            response?.message ||
            response?.pgMessage ||
            '결제중 오류가 발생했습니다',
          type: 'error',
        });

        setLoading(false);
        return;
      }

      if (!response.code) {
        const result = await createOrder(form);
        if (result?.message === 'error')
          return alert({
            message: '결제중 오류가 발생했습니다',
            type: 'error',
          });

        // console.log(result);
        router.replace('/payments/success?access=TRUE');
        return;
      }
    } catch (error) {
      console.error('❌ 결제 요청 실패:', error);
      router.push('/payments/failed');
      alert({
        message: '결제 도중 문제가 발생했습니다.',
        type: 'error',
      });
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <CommonSwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        minHeight="60vh"
        maxHeight="90vh"
      >
        <div>
          <div className="mt-2 mb-4 px-4">
            <CustomerInfoSection userId={userId} />
          </div>

          <div className="mt-6 mb-4 px-4">
            <OrderContentsSection
              storeName={products?.storeName || ''}
              location={products?.location || ''}
              date={date || ''}
              isParcel={products?.isParcelAvailable || false}
              parcelLocation={products?.parcelLocation || null}
              parcelLocationDetail={products?.parcelLocationDetail || null}
            />

            <OrderContentsOptionSection
              productName={products?.productName || ''}
              productPrice={products?.productPrice || 0}
              optionList={optionList || []}
              imageFiles={imageFiles}
              additionalProduct={products?.additionalProduct || {}}
              couponId={products?.couponId || ''}
              discount={products?.discount || 0}
              storeRequest={products?.storeRequest || ''}
              totalPrice={products?.totalPrice || 0}
              parcelFee={products?.parcelFee || 0}
            />
          </div>
        </div>
        <PaymentButton loading={loading} onClick={handlePayment} />
      </CommonSwipeableDrawer>
    </>
  );
};

export default React.memo(New_PaymentDrawer);
