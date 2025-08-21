'use client';

import { useOrders } from '@/api/client/order';
import { handleNavigation } from '@/config/navigation';
import { DataStructureKey } from '@/types/schema/default';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type OrderPick = '_id' | 'status' | 'bookingDate' | 'sellerId' | 'productId';

export function useIncomingOrders(userId: string) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const { data } = useOrders<DataStructureKey.order, 'Pick', OrderPick>({
    userId,
    status: ['pending', 'in_progress', 'packed'],
    field: 'status,bookingDate',
  });

  const items = data?.data?.items || [];

  const handleRouter = (orderId: string) => {
    const path = 'purchases/view';
    const param = { orderId };
    const isWebView = handleNavigation({
      path,
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) {
      const queryParams = new URLSearchParams(param).toString();
      router.push(`/${path}?${queryParams}`);
    }
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  return {
    items,
    index,
    handleNext,
    handleRouter,
  };
}
