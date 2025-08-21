'use client';

import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { useUserInfoKeys } from '@/store/userStore/state';
import { ProductSchema } from '@/types/schema/ProductSchema';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AdditionalProductContainer from '../../additional/AdditionalProductContainer';
import PaymentPolicy from '../common/PaymentPolicy';
import TotalAccountBox from '../common/TotalAccountBox';
import EtcOptionSelector from '../options/EtcOptionSelector';
import NewDayTimeContainer from '../options/NewDayTimeContainer';
import ParcelSelector from '../options/ParcelSelector';
import StoreRequestForm from '../options/StoreRequestForm';
import TextInputOption from '../options/TextInputOption';
import NewImageInputOptions from './NewImageInputOptions';

const New_PaymentDrawer = dynamic(() => import('./New_PaymentDrawer'), {
  ssr: false,
  loading: () => null,
});

interface Props {
  product: ProductSchema;
  userId: string;
  vacationDates?: string[];
  isDeleted: boolean;
}

const isValidSelectedDate = (
  selectedDate: string | null,
  isParcel: boolean,
): boolean => {
  if (!selectedDate) return false;

  const expectedLength = isParcel ? 8 : 12;
  const format = isParcel ? 'YYYYMMDD' : 'YYYYMMDDHHmm';

  const isExactLength = selectedDate.length === expectedLength;
  const isValidFormat = dayjs(selectedDate, format, true).isValid();

  return isExactLength && isValidFormat;
};

const Section = React.memo(({ children }: { children: React.ReactNode }) => (
  <Box sx={{ px: 2, mt: 2 }}>{children}</Box>
));

export default function CSR_NewContainer({
  product,
  userId,
  vacationDates,
  isDeleted,
}: Props) {
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const [recoilList, setRecoilList] = useRecoilState(selectedProductAtom);
  const { _id } = useUserInfoKeys(['_id']);
  const selectedDate = useRecoilValue<string | null>(dateSelectionAtom);

  const seller = product?.sellerId;
  const { options, price, isActive = false } = product;

  const handleOrder = (total: number) => {
    // 결제 심사 테스트용
    if (!userId && !_id)
      return alert({
        message: '로그인 후 모든 기능을 이용해보세요!',
        type: 'auth',
      });

    setOpen(true);
    setRecoilList((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        price: total, // ✅ 덮어쓰기
        totalPrice: total,
      };
    });
  };

  // const handleValidCheck = (): boolean => {
  //   if (!options || !Array.isArray(options)) return false;
  //   if (!isValidSelectedDate(selectedDate)) return false;

  //   const imageCount =
  //     options.filter(({ type = '' }) => type === 'image')?.length || 0;
  //   const realImageCount = Object.keys(imageFiles).length;

  //   if (imageCount > 0 && imageCount !== realImageCount) return false;

  //   const recoilOptions = Object.entries(recoilList?.options || {});

  //   const hasAllNames = recoilOptions.every(([, value]: any) => {
  //     return value?.name !== undefined && value?.name !== '';
  //   });

  //   return options.length === recoilOptions.length && hasAllNames;
  // };

  useEffect(() => {
    if (price !== undefined) {
      setRecoilList((prev: any) => {
        if (!prev) return prev;

        return {
          ...prev,
          price, // ✅ 덮어쓰기
          productPrice: price,
          totalPrice: price,
          productName: product?.name,
          location: product?.sellerId?.location,
          storeName: product?.sellerId?.marketName,
          productId: product?._id,
          sellerId: product?.sellerId?._id,
        };
      });
    }
  }, [
    price,
    product?.name,
    product?._id,
    product?.sellerId?._id,
    product?.sellerId?.location,
    product?.sellerId?.marketName,
  ]);

  // const textOptions = options.filter((opt) => opt.type === 'text');
  // const imageOptions = options.filter((opt) => opt.type === 'image');
  // const etcOptions = options.filter((opt) => opt.type === 'etc');

  const [textOptions, imageOptions, etcOptions] = useMemo(() => {
    const text: ProductSchema['options'] = [];
    const image: ProductSchema['options'] = [];
    const etc: ProductSchema['options'] = [];

    options.forEach((opt) => {
      if (opt.type === 'text') text.push(opt);
      else if (opt.type === 'image') image.push(opt);
      else if (opt.type === 'etc') etc.push(opt);
    });

    return [text, image, etc];
  }, [options]);

  const [imageFiles, setImageFiles] = useState<Record<string, File>>({});

  const isVailable = useMemo(() => {
    if (!isActive || isDeleted) return false;

    if (!options || !Array.isArray(options)) return false;

    if (
      !isValidSelectedDate(selectedDate, recoilList?.isParcelAvailable || false)
    )
      return false;

    if (recoilList?.isParcelAvailable) {
      if (!recoilList?.parcelLocation) return false;
    }

    const imageCount =
      options.filter(({ type }) => type === 'image')?.length || 0;
    const realImageCount = Object.keys(imageFiles).length;

    if (imageCount > 0 && imageCount !== realImageCount) return false;

    const recoilOptions = Object.entries(recoilList?.options || {});
    const hasAllNames = recoilOptions.every(([, value]: any) =>
      value?.name?.trim(),
    );

    return options.length === recoilOptions.length && hasAllNames;
  }, [
    isActive,
    isDeleted,
    options,
    selectedDate,
    imageFiles,
    recoilList?.isParcelAvailable,
    recoilList?.options,
    recoilList?.parcelLocation,
  ]);

  return (
    <>
      {seller?.isParcelAvailable && <ParcelSelector seller={seller} />}

      <NewDayTimeContainer seller={seller} vacationDates={vacationDates} />

      <Section>
        <TextInputOption options={textOptions} />
        <NewImageInputOptions
          options={imageOptions}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
        <EtcOptionSelector options={etcOptions} />
      </Section>

      <Section>
        <StoreRequestForm />
      </Section>

      <AdditionalProductContainer />

      <Box sx={{ px: 2, my: 5 }}>
        <PaymentPolicy />
      </Box>

      {isDeleted ? null : (
        <TotalAccountBox
          label={'주문하기'}
          onClick={handleOrder}
          isVailable={isVailable}
          userId={userId || _id}
          isActive={isActive}
        />
      )}

      <New_PaymentDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        imageFiles={imageFiles}
        userId={userId || _id}
      />
    </>
  );
}
