'use client';
import { useResetOnDateChange } from '@/config/utils/hooks/reset/useResetOnDateChange';
import { useResetOnSellerChange } from '@/config/utils/hooks/reset/useResetOnSellerChange';
import { useResetS3Images } from '@/config/utils/hooks/reset/useResetS3Images';

export const useResetLocationContext = () => {
  useResetOnDateChange();
  useResetOnSellerChange();
  useResetS3Images();
};
