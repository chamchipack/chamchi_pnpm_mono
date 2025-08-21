'use client';

import { fetchWithZod } from '@/config/utils/fetch/zod';
import useSWR from 'swr';
import z from 'zod';

const schema = z.boolean();

export const useCheckAlarm = (userId: string) => {
  const url = userId
    ? `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/isRead/${userId}`
    : null;

  return useSWR(url, (url) => fetchWithZod(url, schema));
};
