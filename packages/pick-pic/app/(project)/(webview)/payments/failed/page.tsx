'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'order-failed',
      status: 'forward',
    });

    if (!isWebView) {
      router.replace(`/order-failed`);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('access_to_failed', 'granted');
    handleRouter();
  }, []);

  return null;
}
