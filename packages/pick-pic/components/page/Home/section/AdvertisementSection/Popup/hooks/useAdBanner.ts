'use client';

import { EventSchema } from '@/types/schema/EventSchema';
import { useEffect, useState } from 'react';

export function useAdBanner(items: EventSchema[]) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  useEffect(() => {
    const hide = getCookie('hideAdBanner');
    if (!hide) setOpen(true);
  }, []);

  const closeToday = () => {
    setCookie('hideAdBanner', 'true', 1);
    setOpen(false);
  };

  const closeBanner = () => setOpen(false);

  const nextSlide = () => setIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

  return {
    open,
    index,
    current: items[index],
    closeBanner,
    closeToday,
    nextSlide,
    prevSlide,
  };
}
